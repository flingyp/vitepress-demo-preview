import Token from "markdown-it/lib/token";
import { resolve, dirname } from "path";
import { readFileSync } from "fs";
import { MarkdownRenderer } from "vitepress";

export const isCheckPreviewCom = /^<preview (.*)><\/preview>$/;
const defaultComponentName = "component-preview";
const scriptRE = /<\/script>/;
const scriptLangTsRE = /<\s*script[^>]*\blang=['"]ts['"][^>]*/;
const scriptSetupRE = /<\s*script[^>]*\bsetup\b[^>]*/;
const scriptClientRE = /<\s*script[^>]*\bclient\b[^>]*/;

/**
 * 源码 => 代码块
 * @param mdInstance
 * @param sourceCode
 * @param suffix
 * @returns
 */
export const transformHighlightCode = (
  mdInstance: MarkdownRenderer,
  sourceCode: string,
  suffix: string
) => {
  return mdInstance.options.highlight!(sourceCode, suffix, "");
};

export const injectComponentImportScript = (
  mdInstance: MarkdownRenderer,
  absolutePath: string,
  componentName: string
) => {
  const importCode = `import ${componentName} from '${absolutePath}'`;
  const hoistedTags: string[] = mdInstance.__data.hoistedTags || [];
  const isUsingTs =
    hoistedTags.findIndex((tag) => scriptLangTsRE.test(tag)) > -1;
  const existingSetupScriptIndex = hoistedTags.findIndex((tag) => {
    return (
      scriptRE.test(tag) && scriptSetupRE.test(tag) && !scriptClientRE.test(tag)
    );
  });

  console.log("isUsingTs->", isUsingTs);
  console.log("existingSetupScriptIndex->", existingSetupScriptIndex);

  if (existingSetupScriptIndex > -1) {
    const tagSrc = hoistedTags[existingSetupScriptIndex];
    hoistedTags[existingSetupScriptIndex] = tagSrc.replace(
      scriptRE,
      `<script> ${importCode} </script>`
    );
  } else {
    hoistedTags.unshift(`
      <script ${isUsingTs ? 'lang="ts"' : ""} setup>
        ${importCode}
      </script>
    `);
  }

  console.log("hoistedTags", hoistedTags);
};

export interface DefaultProps {
  path: string;
  title: string;
  description: string;
}

export const transformPreview = (
  md: MarkdownRenderer,
  token: Token,
  mdPath: string
) => {
  console.log(token);
  const props = token.content.match(isCheckPreviewCom)![1];
  const componentProps: DefaultProps = {
    path: "",
    title: "默认标题",
    description: "描述内容",
  };
  props.split(" ").forEach((item) => {
    item = item.replaceAll(/"|"/gi, "");
    const _item = item.split("=");
    // @ts-ignore
    componentProps[_item[0]] = _item[1];
  });
  const componentPath = resolve(dirname(mdPath), componentProps.path || ".");
  const _dirArr = componentProps.path.split("/");
  const componentName =
    _dirArr[_dirArr.length - 1].split(".")[0] || defaultComponentName;
  const suffixName = componentPath.substring(
    componentPath.lastIndexOf(".") + 1
  );
  console.log(componentName);
  console.log(componentPath);
  console.log(componentProps);

  // 组件源码
  const componentSourceCode = readFileSync(componentPath, {
    encoding: "utf-8",
  });
  // 源码代码块（经过处理）
  const compileHighlightCode = transformHighlightCode(
    md,
    componentSourceCode,
    suffixName
  );
  // console.log("compileHighlightCode->", compileHighlightCode);

  // TODO: 往Markdown 文件注入下面这段脚本文件
  // <script setup lang="ts">
  //     import demoShow from './demoShow.vue'
  // </script>
  // TODO: 添加组件到插槽中
  // <preview path="./demoShow.vue" title="演示Demo">
  //     <demoShow></demoShow>
  // </preview>

  injectComponentImportScript(md, componentProps.path, componentName);

  const sourceCode = `<preview code=${encodeURIComponent(
    componentSourceCode
  )} showCode=${encodeURIComponent(compileHighlightCode)} title=${
    componentProps.title
  } description=${componentProps.description}>

    <${componentName}></${componentName}>
  </preview>`;

  // console.log("md", md);

  return sourceCode;
};
