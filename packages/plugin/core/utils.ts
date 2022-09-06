import MarkdownIt from 'markdown-it'

// componentPreview Check
export const isCheckPreviewCom = /^<preview (.*)><\/preview>$/
export const isCheckContainerPreview = /^demo-preview=(.+)$/

const scriptRE = /<\/script>/
const scriptLangTsRE = /<\s*script[^>]*\blang=['"]ts['"][^>]*/
const scriptSetupRE = /<\s*script[^>]*\bsetup\b[^>]*/
const scriptClientRE = /<\s*script[^>]*\bclient\b[^>]*/

/**
 * 注入 script 脚本
 * @param mdInstance
 * @param path
 * @param componentName
 */
export const injectComponentImportScript = (env: any, path: string, componentName: string) => {
  // https://github.com/vuejs/vitepress/issues/1258  __Path、__Relativepath、__data.Hoistedtags 被删除解决方案
  // https://github.com/mdit-vue/mdit-vue/blob/main/packages/plugin-sfc/src/types.ts
  // https://github.com/mdit-vue/mdit-vue/blob/main/packages/plugin-sfc/tests/__snapshots__/sfc-plugin.spec.ts.snap
  const scriptsCode = env.sfcBlocks.scripts

  const scriptsSetupIndex = scriptsCode.findIndex((script: any) => {
    if (script.tagOpen === "<script setup lang='ts'>") return true
    return false
  })

  if (scriptsSetupIndex !== -1) {
    const oldScriptsSetup = scriptsCode[scriptsSetupIndex]
    // 已经注册了注册
    if (oldScriptsSetup.content.includes(path) && oldScriptsSetup.content.includes(componentName)) {
      scriptsCode[scriptsSetupIndex].content = oldScriptsSetup.content
    } else {
      // 添加组件 import ${componentName} from '${path}'\n
      scriptsCode[scriptsSetupIndex].content = oldScriptsSetup.content.replace(
        "<script setup lang='ts'>\n",
        `<script setup lang='ts'>\n
            import ${componentName} from '${path}'\n`
      )
    }
  } else {
    // MD文件注入了 <script setup lang='ts'> 脚本
    const scriptBlockObj = {
      type: 'script',
      tagClose: '</script>',
      tagOpen: "<script setup lang='ts'>",
      content: `<script setup lang='ts'>
        import ${componentName} from '${path}'
        </script>`
      //   contentStripped: `import ${componentName} from '${path}'`
    }
    scriptsCode.push(scriptBlockObj)
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
