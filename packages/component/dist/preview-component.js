import { openBlock as r, createElementBlock as l } from 'vue'
const s = (e, o) => {
    const t = e.__vccOpts || e
    for (const [n, c] of o) t[n] = c
    return t
  },
  _ = {}
function a(e, o) {
  return r(), l('div', null, 'Hello World')
}
const i = /* @__PURE__ */ s(_, [['render', a]]),
  d = 'demo-preview',
  m = {
    install(e) {
      e.component(d, i)
    }
  }
export { m as default }
