/* eslint-disable no-param-reassign */
import MarkdownIt from 'markdown-it'
import Token from 'markdown-it/lib/token'
import { resolve, dirname } from 'path'
import { readFileSync } from 'fs'
import { composeComponentName, injectComponentImportScript, transformHighlightCode } from './utils'

const getPropsReg =
  /^<preview (path|title|description)=(.*) (path|title|description)=(.*) (path|title|description)=(.*)><\/preview>$/

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
export const transformPreview = (md: MarkdownIt, token: Token, env: any) => {
  const componentProps: DefaultProps = {
    path: '',
    title: '默认标题',
    description: '描述内容'
  }
  // 获取Props相关参数
  const tokenContentArr = token.content.match(getPropsReg)!
  tokenContentArr.shift()
  for (let i = 0; i < tokenContentArr.length; i += 2) {
    const item = tokenContentArr[i]
    if (item === 'path') {
      componentProps.path = tokenContentArr[i + 1].replaceAll(/"|"/gi, '').trim()
    } else if (item === 'title') {
      componentProps.title = tokenContentArr[i + 1].replaceAll(/"|"/gi, '').trim()
    } else if (item === 'description') {
      componentProps.description = tokenContentArr[i + 1].replaceAll(/"|"/gi, '').trim()
    }
  }

  // 组件绝对路径
  const componentPath = resolve(dirname(env.path), componentProps.path || '.')

  // 组件名
  const componentName = composeComponentName(componentProps.path)
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
