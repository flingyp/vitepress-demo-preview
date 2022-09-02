/* eslint-disable prefer-destructuring */
import MarkdownIt from 'markdown-it'
import Token from 'markdown-it/lib/token'
import Renderer from 'markdown-it/lib/renderer'

import markdownItContainer from 'markdown-it-container'
import { injectComponentImportScript, isCheckContainerPreview } from './utils'

const validateContainerRE = /^preview\s+(.*)$/
const parseContainerParamRE = /^preview\s(.+)\s\|\|\s(.*)$/

/**
 * 自定义容器挂载
 * @param md
 */
export const customContainerMount = (md: any) => {
  md.use(markdownItContainer, 'preview', {
    marker: ':',
    validate: (params: any) => {
      const validateContainer = params.trim().match(validateContainerRE)
      if (validateContainer && validateContainer.length !== 0) {
        return true
      }
      return false
    },
    render: (tokens: any, idx: any) => {
      const getParamArr = tokens[idx].info.trim().match(parseContainerParamRE)
      let title = '默认标题'
      let description = '默认描述'
      if (getParamArr) {
        title = getParamArr[1]
        description = getParamArr[2]
      }
      if (tokens[idx].nesting === 1) {
        return `<demo-preview title='${title}' description='${description}'>\n`
      }
      return `</demo-preview>\n`
    }
  })
}

/**
 * 解析自定义容器
 * @param md
 */
export const parseContainer = (md: any) => {
  console.log(md.renderer.rules)

  const defaultHtmlBlockRender = md.renderer.rules.text
  // eslint-disable-next-line no-param-reassign
  md.renderer.rules.text = (tokens: Token[], idx: number, options: MarkdownIt.Options, env: any, self: Renderer) => {
    const token = tokens[idx]

    // console.log(tokens, idx)
    console.log('env->', env)

    if (token.type === 'text' && token.content.match(isCheckContainerPreview)) {
      const componentPath = token.content.match(isCheckContainerPreview)![1]
      const componentName = token.content.match(/\/(.+).vue$/)![1]
      injectComponentImportScript(env, componentPath, componentName)
      return `<${componentName}></${componentName}>`
    }
    return defaultHtmlBlockRender(tokens, idx, options, env, self)
  }
}
