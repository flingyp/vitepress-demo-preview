import MarkdownIt from "markdown-it";
import Renderer from "markdown-it/lib/renderer";
import Token from "markdown-it/lib/token";
import { transformPreview, isCheckPreviewCom } from "./transformPreview";

// 注意： md类型声明不可声明MarkdownRenderer类型，unbuild打包工具报错
export const transformPreviewComponent = (md: any) => {
  const defaultHtmlBlockRender = md.renderer.rules.html_inline;
  md.renderer.rules.html_inline = (
    tokens: Token[],
    idx: number,
    options: MarkdownIt.Options,
    env: any,
    self: Renderer
  ) => {
    const token = tokens[idx];
    if (isCheckPreviewCom.test(token.content)) {
      return transformPreview(md, token, md.__path);
    }
    return defaultHtmlBlockRender(tokens, idx, options, env, self);
  };
};
