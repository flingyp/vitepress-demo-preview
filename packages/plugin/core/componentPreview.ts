 
import MarkdownIt, { Token } from 'markdown-it';
import { resolve, dirname } from 'path';
import { readFileSync } from 'fs';
import {
  composeComponentName,
  injectComponentImportScript,
  findAliasPathToAbsolutePath,
  isRelativePath,
  transformHighlightCode,
  Options,
} from './utils';

const titleRegex = /title=['"](.*?)['"]/;
const pathRegex = /path=['"](.*?)['"]/;
const descriptionRegex = /description=['"](.*?)['"]/;

export interface DefaultProps {
  path: string;
  title: string;
  description: string;
}

/**
 * 编译预览组件
 * @param md
 * @param token
 * @param env
 * @returns
 */
export const transformPreview = (
  md: MarkdownIt,
  token: Token,
  env: any,
  options: Options,
) => {
  const { alias } = options;

  const componentProps: DefaultProps = {
    path: '',
    title: '默认标题',
    description: '描述内容',
  };

  // 获取Props相关参数
  const titleValue = token.content.match(titleRegex);
  const pathRegexValue = token.content.match(pathRegex);
  const descriptionRegexValue = token.content.match(descriptionRegex);

  if (!pathRegexValue)
    throw new Error(
      '@vitepress-demo-preview/plugin: path is a required parameter',
    );
   

  // 组件路径（相对路径｜别名路径）
  componentProps.path = pathRegexValue[1];
  componentProps.title = titleValue ? titleValue[1] : '';
  componentProps.description = descriptionRegexValue
    ? descriptionRegexValue[1]
    : '';

  // 组件绝对路径
  let componentPath = '';

  if (isRelativePath(pathRegexValue[1])) {
    // 相对路径
    componentPath = resolve(dirname(env.path), componentProps.path || '.');
  } else if (alias) {
    // 配置了别名配置
    componentPath = findAliasPathToAbsolutePath(alias, pathRegexValue[1]);
  } else {
    throw new Error('@vitepress-demo-preview/plugin: path cannot be resolved');
  }

  // 组件名
  const componentName = composeComponentName(componentProps.path);
  // 后缀名
  const suffixName = componentPath.substring(
    componentPath.lastIndexOf('.') + 1,
  );

  // 注入组件导入语句
  injectComponentImportScript(env, componentProps.path, componentName, options);

  // 组件源码
  const componentSourceCode = readFileSync(componentPath, {
    encoding: 'utf-8',
  });
  // 源码代码块（经过处理）
  const compileHighlightCode = transformHighlightCode(
    md,
    componentSourceCode,
    suffixName,
  );

  const code = encodeURI(componentSourceCode);
  const showCode = encodeURIComponent(compileHighlightCode);

  const sourceCode = `<demo-preview title="${componentProps.title}" description="${componentProps.description}" code="${code}" showCode="${showCode}" suffixName="${suffixName}" absolutePath="${componentPath}" relativePath="${componentProps.path}">
    <${componentName}></${componentName}>
  </demo-preview>`;

  return sourceCode;
};
