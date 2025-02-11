import MarkdownIt, { Renderer, Token } from 'markdown-it'
import { isCheckPreviewCom1, isCheckPreviewCom2, Options, normalizeOptions } from './utils'
import { transformPreview } from './componentPreview'
import { containerDirectiveMount, parseContainer, parseContainerTag } from './containerPreview'

export const componentPreview = (md: MarkdownIt, options?: Partial<Options>) => {
  const defaultHtmlInlineRender = md.renderer.rules.html_inline!
  md.renderer.rules.html_inline = (
    tokens: Token[],
    idx: number,
    mdOptions: MarkdownIt.Options,
    env: any,
    self: Renderer
  ) => {
    const token = tokens[idx]
    if (isCheckPreviewCom1.test(token.content) || isCheckPreviewCom2.test(token.content)) {
      return transformPreview(md, token, env, normalizeOptions(options))
    }
    return defaultHtmlInlineRender(tokens, idx, mdOptions, env, self)
  }
}

export const containerPreview = (md: MarkdownIt, options?: Partial<Options>) => {
  containerDirectiveMount(md)
  parseContainerTag(md)
  parseContainer(md, normalizeOptions(options))
}
