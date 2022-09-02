import MarkdownIt from 'markdown-it'
import Renderer from 'markdown-it/lib/renderer'
import Token from 'markdown-it/lib/token'
import { isCheckPreviewCom } from './utils'
import { transformPreview } from './componentPreview'
import { customContainerMount, parseContainer } from './containerPreview'

export const componentPreview = (md: any) => {
  const defaultHtmlInlineRender = md.renderer.rules.html_inline
  // eslint-disable-next-line no-param-reassign
  md.renderer.rules.html_inline = (
    tokens: Token[],
    idx: number,
    options: MarkdownIt.Options,
    env: any,
    self: Renderer
  ) => {
    const token = tokens[idx]
    if (isCheckPreviewCom.test(token.content)) {
      // eslint-disable-next-line no-underscore-dangle
      return transformPreview(md, token, env)
    }
    return defaultHtmlInlineRender(tokens, idx, options, env, self)
  }
}

export const containerPreview = (md: any) => {
  customContainerMount(md)
  parseContainer(md)
}
