import MarkdownIt from 'markdown-it'
import Renderer from 'markdown-it/lib/renderer'
import Token from 'markdown-it/lib/token'
import { transformPreview, isCheckPreviewCom } from './componentPreview'

export const componentPreview = (md: any) => {
  const defaultHtmlBlockRender = md.renderer.rules.html_inline
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
    return defaultHtmlBlockRender(tokens, idx, options, env, self)
  }
}
