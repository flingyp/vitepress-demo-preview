import MarkdownIt, { Token, Renderer } from 'markdown-it';
import { resolve, dirname } from 'path';
import { readFileSync } from 'fs';
import markdownItContainer from 'markdown-it-container';
import {
  composeComponentName,
  injectComponentImportScript,
  isCheckContainerPreview,
  isRelativePath,
  findAliasPathToAbsolutePath,
  transformHighlightCode,
  Options,
} from './utils';

const validateContainerRE = /^preview.*$/;
const parseContainerParamRE = /^preview\s?(.*?)(?:\s\|\|\s(.*?))?$/;

/**
 * 自定义容器的注册
 * @param md
 */
export const containerDirectiveMount = (md: MarkdownIt) => {
  md.use(markdownItContainer, 'preview', {
    marker: ':',
    validate: (params: any) => {
      const validateContainer = params.trim().match(validateContainerRE);
      if (validateContainer && validateContainer.length !== 0) return true;
      return false;
    },
  });
};

/**
 * 解析自定义日期的Tag
 * @param md
 */
export const parseContainerTag = (md: MarkdownIt, options: Options) => {
  const { alias } = options;
  // 开始标签 :::preview
  const defaultContainerPreviewOpenRender =
    md.renderer.rules.container_preview_open!;
  md.renderer.rules.container_preview_open = (
    tokens: Token[],
    idx: number,
    options: MarkdownIt.Options,
    env: any,
    self: Renderer,
  ) => {
    const token = tokens[idx];
    // 组件的相对路径

    // 组件路径（相对路径｜别名路径）
    const componentRelativePath = tokens[idx + 2].content.split('=')[1];

    // 组件绝对路径
    let componentPath = '';
    if (isRelativePath(componentRelativePath)) {
      componentPath = resolve(dirname(env.path), componentRelativePath || '.');
    } else if (alias) {
      // 配置了别名配置
      componentPath = findAliasPathToAbsolutePath(alias, componentRelativePath);
    } else {
      throw new Error(
        '@vitepress-demo-preview/plugin: path cannot be resolved',
      );
    }

    // 后缀名
    const suffixName = componentPath.substring(
      componentPath.lastIndexOf('.') + 1,
    );
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

    const getParamArr = tokens[idx].info.trim().match(parseContainerParamRE);
    const title = getParamArr && getParamArr[1] ? getParamArr[1] : '';
    const description = getParamArr && getParamArr[2] ? getParamArr[2] : '';

    if (token.nesting === 1)
      return `<demo-preview title='${title}' description='${description}' code="${code}" showCode="${showCode}" suffixName="${suffixName}" absolutePath="${componentPath}" relativePath="${componentRelativePath}">\n`;
    return defaultContainerPreviewOpenRender(tokens, idx, options, env, self);
  };

  // 闭合标签 :::
  const defaultContainerPreviewCloseRender =
    md.renderer.rules.container_preview_close!;
  md.renderer.rules.container_preview_close = (
    tokens: Token[],
    idx: number,
    options: MarkdownIt.Options,
    env: any,
    self: Renderer,
  ) => {
    const token = tokens[idx];

    if (token.nesting === -1) return `</demo-preview>\n`;
    return defaultContainerPreviewCloseRender(tokens, idx, options, env, self);
  };
};

/**
 * 解析自定义容器
 * @param md
 */
export const parseContainer = (md: MarkdownIt, options: Options) => {
  const defaultHtmlTextRender = md.renderer.rules.text!;
  md.renderer.rules.text = (
    tokens: Token[],
    idx: number,
    mdOptions: MarkdownIt.Options,
    env: any,
    self: Renderer,
  ) => {
    const token = tokens[idx];
    if (token.type === 'text' && token.content.match(isCheckContainerPreview)) {
      const componentPath = token.content.match(isCheckContainerPreview)![1];
      const componentName = composeComponentName(componentPath);
      injectComponentImportScript(env, componentPath, componentName, options);
      return `<${componentName}></${componentName}>`;
    }
    return defaultHtmlTextRender(tokens, idx, mdOptions, env, self);
  };
};
