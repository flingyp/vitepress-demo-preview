/* eslint-disable no-param-reassign */
import Token from 'markdown-it/lib/token'
import { resolve, dirname } from 'path'
import { readFileSync } from 'fs'
import { MarkdownRenderer } from 'vitepress'
import { injectComponentImportScript, transformHighlightCode } from './utils'

const getPropsReg =
  /^<preview (path|title|description)=(.*) (path|title|description)=(.*) (path|title|description)=(.*)><\/preview>$/
const defaultComponentName = 'component-preview'

export interface DefaultProps {
  path: string
  title: string
  description: string
}

/**
 * 编译预览组件
 * @param md
 * @param token
 * @param env
 * @returns
 */
export const transformPreview = (md: MarkdownRenderer, token: Token, env: any) => {
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
  const componentPath = resolve(dirname(env.path), componentProps.path || '.')

  const _dirArr = componentProps.path.split('/')

  // 组件名
  const componentName = _dirArr[_dirArr.length - 1].split('.')[0] || defaultComponentName
  // 后缀名
  const suffixName = componentPath.substring(componentPath.lastIndexOf('.') + 1)

  // 注入组件导入语句
  injectComponentImportScript(env, componentProps.path, componentName)

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
