/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
import MarkdownIt from 'markdown-it'
import Token from 'markdown-it/lib/token'
import Renderer from 'markdown-it/lib/renderer'
import { resolve, dirname } from 'path'
import { readFileSync } from 'fs'
import { MarkdownRenderer } from 'vitepress'
import markdownItContainer from 'markdown-it-container'
import { injectComponentImportScript, isCheckContainerPreview, transformHighlightCode } from './utils'

const validateContainerRE = /^preview\s+(.*)$/
const parseContainerParamRE = /^preview\s(.+)\s\|\|\s(.*)$/

/**
 * 自定义容器的注册
 * @param md
 */
export const containerDirectiveMount = (md: MarkdownRenderer) => {
  md.use(markdownItContainer, 'preview', {
    marker: ':',
    validate: (params: any) => {
      const validateContainer = params.trim().match(validateContainerRE)
      if (validateContainer && validateContainer.length !== 0) return true
      return false
    }
  })
}

/**
 * 解析自定义日期的Tag
 * @param md
 */
const defaultComponentName = 'component-preview'
export const parseContainerTag = (md: MarkdownRenderer) => {
  // 开始标签 :::preview
  const defaultContainerPreviewOpenRender = md.renderer.rules.container_preview_open!
  md.renderer.rules.container_preview_open = (
    tokens: Token[],
    idx: number,
    options: MarkdownIt.Options,
    env: any,
    self: Renderer
  ) => {
    const token = tokens[idx]
    // 组件的相对路径
    const componentRelativePath = tokens[idx + 2].content.split('=')[1]

    // 组件绝对路径
    const componentPath = resolve(dirname(env.path), componentRelativePath || '.')

    const _dirArr = componentRelativePath.split('/')
    // 组件名
    const componentName = _dirArr[_dirArr.length - 1].split('.')[0] || defaultComponentName
    // 后缀名
    const suffixName = componentPath.substring(componentPath.lastIndexOf('.') + 1)
    // 组件源码
    const componentSourceCode = readFileSync(componentPath, {
      encoding: 'utf-8'
    })
    // 源码代码块（经过处理）
    const compileHighlightCode = transformHighlightCode(md, componentSourceCode, suffixName)

    const code = encodeURI(componentSourceCode)
    const showCode = encodeURIComponent(compileHighlightCode)

    const getParamArr = tokens[idx].info.trim().match(parseContainerParamRE)
    let title = '默认标题'
    let description = '默认描述'
    if (getParamArr) {
      title = getParamArr[1]
      description = getParamArr[2]
    }
    if (token.nesting === 1)
      return `<demo-preview title='${title}' description='${description}' code="${code}" showCode="${showCode}">\n`

    return defaultContainerPreviewOpenRender(tokens, idx, options, env, self)
  }
  // 闭合标签 :::
  const defaultContainerPreviewCloseRender = md.renderer.rules.container_preview_close!
  md.renderer.rules.container_preview_close = (
    tokens: Token[],
    idx: number,
    options: MarkdownIt.Options,
    env: any,
    self: Renderer
  ) => {
    const token = tokens[idx]

    if (token.nesting === -1) return `</demo-preview>\n`
    return defaultContainerPreviewCloseRender(tokens, idx, options, env, self)
  }
}

/**
 * 解析自定义容器
 * @param md
 */
export const parseContainer = (md: MarkdownRenderer) => {
  const defaultHtmlTextRender = md.renderer.rules.text!
  md.renderer.rules.text = (tokens: Token[], idx: number, options: MarkdownIt.Options, env: any, self: Renderer) => {
    const token = tokens[idx]
    if (token.type === 'text' && token.content.match(isCheckContainerPreview)) {
      const componentRelativePath = token.content.match(isCheckContainerPreview)![1]
      const componentName = token.content.match(/.*\/(.*).vue$/)![1]
      injectComponentImportScript(env, componentRelativePath, componentName)
      return `<${componentName}></${componentName}>`
    }
    return defaultHtmlTextRender(tokens, idx, options, env, self)
  }
}
