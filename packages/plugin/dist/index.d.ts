import { MarkdownRenderer } from 'vitepress'

declare const componentPreview: (md: MarkdownRenderer) => void
declare const containerPreview: (md: MarkdownRenderer) => void

export { componentPreview, containerPreview }
