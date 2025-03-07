import MarkdownIt from 'markdown-it'

// componentPreview check
export const isCheckPreviewCom1 = /^<preview (.*)><\/preview>$/
export const isCheckPreviewCom2 = /^<preview (.*) \/>$/
export const isCheckContainerPreview = /^demo-preview=(.+)$/

const scriptRE = /<\/script>/
const scriptLangTsRE = /<\s*script[^>]*\blang=['"]ts['"][^>]*/
const scriptSetupRE = /<\s*script[^>]*\bsetup\b[^>]*/
const scriptClientRE = /<\s*script[^>]*\bclient\b[^>]*/
const scriptSetupCommonRE = /<\s*script\s+(setup|lang='ts'|lang="ts")?\s*(setup|lang='ts'|lang="ts")?\s*>/

export type Options = {
  clientOnly: boolean
  alias: Record<string, string> | null
}

export function normalizeOptions(options: Partial<Options> = {}): Options {
  return {
    clientOnly: false,
    alias: null,
    ...options
  }
}
/**
 * 统一处理组件名称->驼峰命名
 * @param componentName
 */
export const handleComponentName = (componentName: string) => {
  let newName = componentName
  newName = newName.replaceAll(/[_|-]+(\w)/g, ($0, $1) => {
    return $1.toUpperCase()
  })
  return newName
}

/**
 * 注入 script 脚本
 * @param mdInstance
 * @param path
 * @param componentName
 */
export const injectComponentImportScript = (env: any, path: string, componentName: string, options: Options) => {
  const { clientOnly } = options

  // https://github.com/vuejs/vitepress/issues/1258  __Path、__Relativepath、__data.Hoistedtags 被删除解决方案
  // https://github.com/mdit-vue/mdit-vue/blob/main/packages/plugin-sfc/src/types.ts
  // https://github.com/mdit-vue/mdit-vue/blob/main/packages/plugin-sfc/tests/__snapshots__/sfc-plugin.spec.ts.snap
  const scriptsCode = env.sfcBlocks.scripts as any[]

  // 判断MD文件内部是否本身就存在 <script setup> 脚本

  const scriptsSetupIndex = scriptsCode.findIndex((script: any) => {
    if (scriptSetupRE.test(script.tagOpen) || scriptLangTsRE.test(script.tagOpen)) return true
    return false
  })

  // 统一处理组件名称为驼峰命名
  const _componentName = handleComponentName(componentName)
  const importDefineClientComponent = `import { defineClientComponent } from 'vitepress'\n`
  const importScripts = clientOnly
    ? `const ${_componentName} = defineClientComponent(() => import('${path}'))`
    : `import ${_componentName} from '${path}'`

  // MD文件中没有 <script setup> 或 <script setup lang='ts'> 脚本文件
  if (scriptsSetupIndex === -1) {
    const scriptBlockObj = {
      type: 'script',
      tagClose: '</script>',
      tagOpen: "<script setup lang='ts'>",
      content: `<script setup lang='ts'>
        ${clientOnly ? importDefineClientComponent : ``}
        ${importScripts}
        </script>`,
      contentStripped: `import ${_componentName} from '${path}'`
    }
    scriptsCode.push(scriptBlockObj)
  } else {
    // MD文件注入了 <script setup> 或 <script setup lang='ts'> 脚本
    let { content } = scriptsCode[0]
    // MD文件中存在已经引入了组件
    if (content.includes(path) || content.includes(_componentName)) return

    // MD文件中不存在组件 添加组件 import ${_componentName} from '${path}'\n

    // 如果MD文件中存在 <script setup lang="ts">、<script lang="ts" setup>  或 <script setup> 代码块, 那么统一转换为 <script setup lang="ts">
    const scriptCodeBlock = '<script lang="ts" setup>\n'
    content = content.replace(scriptSetupCommonRE, scriptCodeBlock)

    // 如果是clientOnly模式，判断是否已经引入了 defineClientComponent，并在script后面添加组件引入代码
    // 否则在script前面import组件
    if (clientOnly) {
      if (!content.includes(importDefineClientComponent)) {
        content = content.replace(scriptCodeBlock, `<script setup>\n${importDefineClientComponent}\n`)
      }
      content = content.replace('</script>', `${importScripts}\n</script>`)
    } else {
      // 将组件引入的代码放进去
      content = content.replace(
        scriptCodeBlock,
        `<script setup>\n
      import ${_componentName} from '${path}'\n`
      )
    }

    scriptsCode[0].content = content
  }
}

/**
 * 源码 => 代码块
 * @param mdInstance
 * @param sourceCode
 * @param suffix
 * @returns
 */
export const transformHighlightCode = (mdInstance: MarkdownIt, sourceCode: string, suffix: string) =>
  mdInstance.options.highlight!(sourceCode, suffix, '')

/**
 * 根据组件路径组合组件引用名称
 * @param path
 * @returns
 */
export const composeComponentName = (path: string) => {
  let isFlag = true
  let componentList: string[] = []
  while (isFlag) {
    const lastIndex = path.lastIndexOf('/')
    if (lastIndex === -1) {
      isFlag = false
    } else {
      const name = path.substring(lastIndex + 1)

      componentList.unshift(name)
      path = path.substring(0, lastIndex)
    }
  }
  componentList = componentList.filter(item => item !== '' && item !== '.' && item !== '..')
  return componentList.join('-').split('.')[0]
}

/**
 * 检查组件相对路径
 * @param path
 * @returns
 */
export const isCheckingRelativePath = (path: string) => {
  const relativePath = path
  if (relativePath.startsWith('./') || relativePath.startsWith('../') || relativePath.startsWith('/'))
    return relativePath
  return `./${relativePath}`
}

/**
 * 检查路径是否为相对路径
 * @param path
 * @returns
 */
export const isRelativePath = (path: string) => {
  if (path.startsWith('./') || path.startsWith('../') || path.startsWith('/')) return true
  return false
}

/**
 * 查找别名路径转换绝对路径
 * @param alias
 * @param path
 * @returns
 */
export const findAliasPathToAbsolutePath = (alias: Record<string, string>, path: string) => {
  const aliasKeyList = Object.keys(alias)
  const aliasKey = aliasKeyList.find(key => path.indexOf(key) !== -1)
  if (aliasKey) return path.replace(aliasKey, alias[aliasKey])
  return path
}
