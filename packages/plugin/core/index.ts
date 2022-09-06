import MarkdownIt from 'markdown-it'
import Renderer from 'markdown-it/lib/renderer'
import Token from 'markdown-it/lib/token'
import { isCheckPreviewCom } from './utils'
import { transformPreview } from './componentPreview'
import { containerDirectiveMount, parseContainer, parseContainerTag } from './containerPreview'

export const componentPreview = (md: MarkdownIt) => {
  const defaultHtmlInlineRender = md.renderer.rules.html_inline!
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
      return transformPreview(md, token, env)
    }
    return defaultHtmlInlineRender(tokens, idx, options, env, self)
  }
}

export const containerPreview = (md: MarkdownIt) => {
  containerDirectiveMount(md)
  parseContainerTag(md)
  parseContainer(md)
}
