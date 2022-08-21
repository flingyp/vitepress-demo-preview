export const transformPreviewComponent = (md: any) => {
  const defaultHtmlBlockRender = md.renderer.rules.html_inline;
  console.log("md", md.renderer.rules);
  md.renderer.rules.html_inline = (
    tokens: any,
    idx: any,
    options: any,
    env: any,
    renderer: any
  ) => {
    const token = tokens[idx];
    console.log("token->", token);
    return defaultHtmlBlockRender(tokens, idx, options, env, renderer);
  };
};
