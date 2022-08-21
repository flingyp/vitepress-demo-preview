import Token from "markdown-it/lib/token";
import { resolve, dirname } from "path";
import { readFileSync } from "fs";
import MarkdownIt from "markdown-it";

export const isCheckPreviewCom = /^<preview (.*)><\/preview>$/;

/**
 * 源码 => 代码块
 * @param mdInstance
 * @param sourceCode
 * @param suffix
 * @returns
 */
export const transformHighlightCode = (
  mdInstance: MarkdownIt,
  sourceCode: string,
  suffix: string
) => {
  return mdInstance.options.highlight!(sourceCode, suffix, "");
};

export interface DefaultProps {
  path?: string;
  title?: string;
  description?: string;
}

export const transformPreview = (
  md: MarkdownIt,
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
  const suffixName = componentPath.substring(
    componentPath.lastIndexOf(".") + 1
  );
  console.log(componentPath);

  // 组件源码
  const componentSourceCode = readFileSync(componentPath, {
    encoding: "utf-8",
  });

  const compileHighlightCode = transformHighlightCode(
    md,
    componentSourceCode,
    suffixName
  );
  console.log("compileHighlightCode->", compileHighlightCode);

  const sourceCode = `<preview code=${encodeURIComponent(
    componentSourceCode
  )} showCode=${encodeURIComponent(compileHighlightCode)} title=${
    componentProps.title
  } description=${componentProps.description}></preview>`;

  return sourceCode;
};
