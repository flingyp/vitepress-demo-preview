/* eslint-disable no-param-reassign */
import Token from 'markdown-it/lib/token'
import { resolve, dirname } from 'path'
import { readFileSync } from 'fs'
import { MarkdownRenderer } from 'vitepress'

export const isCheckPreviewCom = /^<demo-preview (.*)><\/demo-preview>$/
const getPropsReg =
  /^<demo-preview (path|title|description)=(.*) (path|title|description)=(.*) (path|title|description)=(.*)><\/demo-preview>$/
const defaultComponentName = 'component-preview'
const scriptRE = /<\/script>/
const scriptLangTsRE = /<\s*script[^>]*\blang=['"]ts['"][^>]*/
const scriptSetupRE = /<\s*script[^>]*\bsetup\b[^>]*/
const scriptClientRE = /<\s*script[^>]*\bclient\b[^>]*/

export interface DefaultProps {
  path: string
  title: string
  description: string
}
/**
 * 源码 => 代码块
 * @param mdInstance
 * @param sourceCode
 * @param suffix
 * @returns
 */
export const transformHighlightCode = (mdInstance: MarkdownRenderer, sourceCode: string, suffix: string) =>
  mdInstance.options.highlight!(sourceCode, suffix, '')

/**
 * 注入 script 脚本
 * @param mdInstance
 * @param absolutePath
 * @param componentName
 */
export const injectComponentImportScript = (
  mdInstance: MarkdownRenderer,
  absolutePath: string,
  componentName: string
) => {
  const importCode = `import ${componentName} from '${absolutePath}'`.trim()

  if (!mdInstance.__data.hoistedTags) mdInstance.__data.hoistedTags = []

  const hoistedTags: string[] = mdInstance.__data.hoistedTags || []

  const isUsingTs = hoistedTags.findIndex(tag => scriptLangTsRE.test(tag)) > -1

  const existingSetupScriptIndex = hoistedTags.findIndex(tag => {
    return scriptRE.test(tag) && scriptSetupRE.test(tag) && !scriptClientRE.test(tag)
  })

  // 原Markdown文件中存在 <script><script> 、 <script setup><script> 或 <script setup lang="ts"><script> 标签
  if (existingSetupScriptIndex > -1) {
    const tagSrc = hoistedTags[existingSetupScriptIndex]
    hoistedTags[existingSetupScriptIndex] = tagSrc.replace(scriptRE, ` ${importCode} </script>`)
  } else {
    hoistedTags.unshift(`
      <script setup ${isUsingTs ? 'lang="ts"' : ''}>
        ${importCode}
      </script>
    `)
  }
}

/**
 * 编译预览组件
 * @param md
 * @param token
 * @param mdPath
 * @returns
 */
export const transformPreview = (md: MarkdownRenderer, token: Token, mdPath: string) => {
  const componentProps: DefaultProps = {
    path: '',
    title: '默认标题',
    description: '描述内容'
  }
  // 获取Props相关参数
  const tokenContentArr = token.content.match(getPropsReg)!
  tokenContentArr.forEach((item, index) => {
    item = item.replaceAll(/"|"/gi, '').trim()
    if (item === 'path') {
      componentProps.path = tokenContentArr[index + 1].replaceAll(/"|"/gi, '').trim()
    } else if (item === 'title') {
      componentProps.title = tokenContentArr[index + 1].replaceAll(/"|"/gi, '').trim()
    } else if (item === 'description') {
      componentProps.description = tokenContentArr[index + 1].replaceAll(/"|"/gi, '').trim()
    }
  })
  // 组件绝对路径
  const componentPath = resolve(dirname(mdPath), componentProps.path || '.')
  const _dirArr = componentProps.path.split('/')
  // 组件名
  const componentName = _dirArr[_dirArr.length - 1].split('.')[0] || defaultComponentName
  // 后缀名
  const suffixName = componentPath.substring(componentPath.lastIndexOf('.') + 1)

  injectComponentImportScript(md, componentProps.path, componentName)

  // 组件源码
  const componentSourceCode = readFileSync(componentPath, {
    encoding: 'utf-8'
  })
  // 源码代码块（经过处理）
  const compileHighlightCode = transformHighlightCode(md, componentSourceCode, suffixName)

  const code = encodeURI(componentSourceCode)
  const showCode = encodeURIComponent(compileHighlightCode)

  const sourceCode = `<demo-preview title="${componentProps.title}" description="${componentProps.description}" code="${code}" showCode="${showCode}">
    <${componentName}></${componentName}>
  </demo-preview>`

  return sourceCode
}
