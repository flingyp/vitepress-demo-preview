import {
  openBlock as l,
  createElementBlock as _,
  createElementVNode as c,
  createStaticVNode as V,
  ref as p,
  defineComponent as b,
  watch as S,
  createBlock as w,
  Transition as F,
  withCtx as L,
  normalizeClass as r,
  unref as i,
  normalizeStyle as z,
  createVNode as y,
  toDisplayString as $,
  createCommentVNode as M,
  createApp as T,
  resolveComponent as D,
  renderSlot as j
} from 'vue'
const f = (e, o) => {
    const t = e.__vccOpts || e
    for (const [s, n] of o) t[s] = n
    return t
  },
  I = {},
  A = {
    t: '1661231422733',
    class: 'icon',
    viewBox: '0 0 1024 1024',
    version: '1.1',
    xmlns: 'http://www.w3.org/2000/svg',
    'p-id': '3259',
    width: '20',
    height: '20'
  },
  E = /* @__PURE__ */ c(
    'path',
    {
      d: 'M682.666667 810.666667c-12.8 0-21.333333-4.266667-29.866667-12.8-17.066667-17.066667-17.066667-42.666667 0-59.733334l226.133333-226.133333-226.133333-226.133333c-17.066667-17.066667-17.066667-42.666667 0-59.733334s42.666667-17.066667 59.733333 0l256 256c17.066667 17.066667 17.066667 42.666667 0 59.733334l-256 256c-8.533333 8.533333-17.066667 12.8-29.866666 12.8zM341.333333 810.666667c-12.8 0-21.333333-4.266667-29.866666-12.8l-256-256c-17.066667-17.066667-17.066667-42.666667 0-59.733334l256-256c17.066667-17.066667 42.666667-17.066667 59.733333 0s17.066667 42.666667 0 59.733334L145.066667 512l226.133333 226.133333c17.066667 17.066667 17.066667 42.666667 0 59.733334-8.533333 8.533333-17.066667 12.8-29.866667 12.8z',
      'p-id': '3260'
    },
    null,
    -1
  ),
  O = [E]
function P(e, o) {
  return l(), _('svg', A, O)
}
const R = /* @__PURE__ */ f(I, [['render', P]]),
  U = {},
  Z = {
    t: '1661231449868',
    class: 'icon',
    viewBox: '0 0 1024 1024',
    version: '1.1',
    xmlns: 'http://www.w3.org/2000/svg',
    'p-id': '3541',
    width: '20',
    height: '20'
  },
  q = /* @__PURE__ */ c(
    'path',
    {
      d: 'M305.6 225.6c-17.6-17.6-43.2-17.6-59.2 0L19.2 460.8c-25.6 30.4-25.6 72 0 97.6l225.6 235.2c8 8 20.8 12.8 30.4 12.8s20.8-4.8 30.4-12.8c17.6-17.6 17.6-43.2 0-59.2L88 512l217.6-225.6c17.6-17.6 17.6-43.2 0-60.8zM1001.6 460.8L774.4 225.6c-17.6-17.6-43.2-17.6-59.2 0s-17.6 43.2 0 59.2L932.8 512 715.2 737.6c-17.6 17.6-17.6 43.2 0 59.2 8 8 17.6 12.8 30.4 12.8 12.8 0 20.8-4.8 30.4-12.8l225.6-235.2c28.8-28.8 28.8-70.4 0-100.8zM612.8 230.4c-20.8-8-46.4 4.8-56 25.6L382.4 742.4c-8 20.8 4.8 46.4 25.6 56 4.8 0 8 4.8 12.8 4.8 17.6 0 33.6-12.8 38.4-30.4l179.2-491.2c8-20.8-4.8-46.4-25.6-51.2z',
      'p-id': '3542'
    },
    null,
    -1
  ),
  G = [q]
function J(e, o) {
  return l(), _('svg', Z, G)
}
const K = /* @__PURE__ */ f(U, [['render', J]]),
  Q = {},
  W = {
    width: '24',
    height: '24',
    viewBox: '0 0 48 48',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg'
  },
  X = /* @__PURE__ */ V(
    '<path d="M13 38H41V16H30V4H13V38Z" fill="none" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"></path><path d="M30 4L41 16" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7 20V44H28" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19 20H23" stroke="#333" stroke-width="4" stroke-linecap="round"></path><path d="M19 28H31" stroke="#333" stroke-width="4" stroke-linecap="round"></path>',
    5
  ),
  Y = [X]
function ee(e, o) {
  return l(), _('svg', W, Y)
}
const te = /* @__PURE__ */ f(Q, [['render', ee]]),
  v = 'vitepress-demo-preview',
  C = (e, o, t, s) => {
    let n = o === '' ? `${e}` : `${e}-${o}`
    return t && (n += `__${t}`), s && (n += `--${s}`), n
  },
  B = (e = '') => ({
    b: () => C(v, e),
    e: (d = '') => C(v, e, d),
    m: (d = '') => C(v, e, '', d),
    bem: (d, u, h) => C(v, d, u, h)
  }),
  oe = () => {
    const e = p(!1)
    return {
      isCodeFold: e,
      setCodeFold: t => {
        e.value = t
      }
    }
  },
  ne = () => ({
    copyContent: p(''),
    clickCopy: async t => {
      await navigator.clipboard.writeText(t)
    }
  }),
  se = {},
  ce = {
    width: '20',
    height: '20',
    viewBox: '0 0 48 48',
    fill: 'currentColor',
    xmlns: 'http://www.w3.org/2000/svg'
  },
  ie = /* @__PURE__ */ c(
    'path',
    {
      d: 'M24 4L29.2533 7.83204L35.7557 7.81966L37.7533 14.0077L43.0211 17.8197L41 24L43.0211 30.1803L37.7533 33.9923L35.7557 40.1803L29.2533 40.168L24 44L18.7467 40.168L12.2443 40.1803L10.2467 33.9923L4.97887 30.1803L7 24L4.97887 17.8197L10.2467 14.0077L12.2443 7.81966L18.7467 7.83204L24 4Z',
      fill: 'currentColor',
      stroke: '#333',
      'stroke-width': '4',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    },
    null,
    -1
  ),
  le = /* @__PURE__ */ c(
    'path',
    {
      d: 'M17 24L22 29L32 19',
      fill: 'currentColor',
      stroke: '#333',
      'stroke-width': '4',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    },
    null,
    -1
  ),
  re = [ie, le]
function de(e, o) {
  return l(), _('svg', ce, re)
}
const ae = /* @__PURE__ */ f(se, [['render', de]]),
  ue = /* @__PURE__ */ b({
    __name: 'message-notice',
    props: {
      content: { default: '\u590D\u5236\u6210\u529F\uFF01' },
      close: null
    },
    setup(e, { expose: o }) {
      const t = e,
        s = B(),
        n = p(!1),
        d = a => {
          n.value = a
        },
        u = p(-999),
        h = a => {
          u.value = a
        }
      S(n, a => {
        a === !0 &&
          setTimeout(() => {
            n.value = !1
          }, 3e3)
      })
      const g = () => {
        t.close()
      }
      return (
        o({
          setVisible: d,
          setTopHeight: h
        }),
        (a, x) => (
          l(),
          w(
            F,
            {
              name: 'slide-fade',
              onAfterLeave: g
            },
            {
              default: L(() => [
                n.value
                  ? (l(),
                    _(
                      'div',
                      {
                        key: 0,
                        class: r([i(s).bem('message-notice', 'container')]),
                        style: z({ top: u.value + 'px' })
                      },
                      [y(ae), c('span', null, $(e.content), 1)],
                      6
                    ))
                  : M('', !0)
              ]),
              _: 1
            }
          )
        )
      )
    }
  })
const k = [],
  pe = {
    open: () => {
      const e = document.createElement('div'),
        o = T(ue, {
          content: '\u590D\u5236\u6210\u529F\uFF01',
          close: () => {
            document.body.removeChild(e), k.pop(), o.unmount()
          }
        }),
        t = o.mount(e)
      document.body.appendChild(e)
      const s = k.length,
        n = s === 0 ? 10 : (s + 1) * 10 + s * 42
      t.setTopHeight(n), t.setVisible(!0), k.push(t)
    }
  },
  _e = ['innerHTML'],
  he = /* @__PURE__ */ b({
    __name: 'DemoPreview',
    props: {
      code: null,
      showCode: null,
      title: { default: '\u9ED8\u8BA4\u6807\u9898' },
      description: { default: '\u63CF\u8FF0\u5185\u5BB9' }
    },
    setup(e) {
      const o = e,
        t = B(),
        { isCodeFold: s, setCodeFold: n } = oe(),
        { copyContent: d, clickCopy: u } = ne(),
        h = p(decodeURIComponent(o.code)),
        g = p(decodeURIComponent(o.showCode)),
        a = () => {
          u(h.value), pe.open()
        }
      return (x, m) => {
        const H = D('ClientOnly')
        return (
          l(),
          w(H, null, {
            default: L(() => [
              c(
                'div',
                {
                  class: r([i(t).e('container')])
                },
                [
                  c(
                    'section',
                    {
                      class: r([i(t).bem('preview')])
                    },
                    [j(x.$slots, 'default')],
                    2
                  ),
                  c(
                    'section',
                    {
                      class: r([i(t).bem('description')])
                    },
                    [
                      c(
                        'div',
                        {
                          class: r([i(t).bem('description', 'title')])
                        },
                        [c('span', null, $(e.title), 1)],
                        2
                      ),
                      c(
                        'div',
                        {
                          class: r([i(t).bem('description', 'content')])
                        },
                        $(e.description),
                        3
                      ),
                      c(
                        'div',
                        {
                          class: r([i(t).bem('description', 'split-line')])
                        },
                        null,
                        2
                      ),
                      c(
                        'div',
                        {
                          class: r([i(t).bem('description', 'handle-btn')])
                        },
                        [
                          i(s)
                            ? (l(),
                              w(R, {
                                key: 1,
                                onClick: m[1] || (m[1] = N => i(n)(!1))
                              }))
                            : (l(),
                              w(K, {
                                key: 0,
                                onClick: m[0] || (m[0] = N => i(n)(!0))
                              })),
                          y(te, { onClick: a })
                        ],
                        2
                      )
                    ],
                    2
                  ),
                  y(
                    F,
                    { name: 'slide-down' },
                    {
                      default: L(() => [
                        i(s)
                          ? (l(),
                            _(
                              'section',
                              {
                                key: 0,
                                class: r([i(t).bem('source')])
                              },
                              [
                                c(
                                  'div',
                                  {
                                    innerHTML: g.value,
                                    class: 'language-vue'
                                  },
                                  null,
                                  8,
                                  _e
                                )
                              ],
                              2
                            ))
                          : M('', !0)
                      ]),
                      _: 1
                    }
                  )
                ],
                2
              )
            ]),
            _: 3
          })
        )
      }
    }
  })
const me = 'demo-preview',
  Ce = {
    install(e) {
      e.component(me, he)
    }
  }
export { Ce as default }
