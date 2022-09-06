import MarkdownIt from 'markdown-it'

declare const componentPreview: (md: MarkdownIt) => void
declare const containerPreview: (md: MarkdownIt) => void

export { componentPreview, containerPreview }
