import { getParameters } from 'codesandbox/lib/api/define'
import { computed } from 'vue'

const indexHtmlTemplate = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <title>CodeSandBox Demo</title>
      <style>
        * {
          padding: 0;
          margin: 0;
        }
        #app {
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      </style>
    </head>
    <body>
      <div id="app"></div>
    </body>
  </html>
`

const appVueTemplate = `
  <script setup>
    import Demo from "./Demo.vue";
  </script>

  <template>
    <Demo />
  </template>
`

const mainJsTemplate = `  
  import { createApp } from "vue";
  import App from "./App.vue";
  const app = createApp(App);
  app.mount("#app");
`

export const useCodeSandBox = (sourceCode: string) => {
  const parameters = computed(() => {
    return getParameters({
      files: {
        'package.json': {
          // @ts-ignore
          content: {
            dependencies: {
              vue: 'next'
            },
            devDependencies: {
              typescript: '~4.6.3'
            }
          }
        },
        'index.html': { content: indexHtmlTemplate, isBinary: false },
        'src/Demo.vue': { content: sourceCode, isBinary: false },
        'src/App.vue': { content: appVueTemplate, isBinary: false },
        'src/main.js': { content: mainJsTemplate, isBinary: false }
      }
    })
  })

  return {
    parameters
  }
}
