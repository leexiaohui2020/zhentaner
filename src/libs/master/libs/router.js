import Vue from 'vue'
import VueRouter from 'vue-router'

const pageFiles = require.context('base/pages', true, /\.vue$/)
const modules = pageFiles.keys().filter(item => {
  return /^(?!_).*\.vue$/.test(item.split('/').reverse()[0])
}).map(key => pageFiles(key).default)

Vue.use(VueRouter)

const beforMaps = []
const afterMaps = []

class Router {
  constructor() {
    this.$routes = []
    this.$attrs = {}
    this.$extra = {}
    this.$meta = {}
  }

  addChild(page) {
    const { installRouter } = page
    if (typeof installRouter === 'function') {
      const router = new Router()
      installRouter.call(page, router)
      this.$routes.push(router.exec())
    }
  }

  set(name, path, component, meta, extra) {
    this.$attrs.name = name
    this.$attrs.path = path
    this.$attrs.component = component
    Object.assign(this.$meta, meta)
    Object.assign(this.$extra, extra)
  }

  exec() {
    const router = Object.assign({}, this.$attrs, this.$extra, {
      meta: Object.assign({}, this.$meta)
    })
    if (this.$routes.length) {
      router.children = this.$routes
    }
    return router
  }

  before(opts = {}) {
    if (typeof opts === 'function') {
      beforMaps.push({ listen: opts })
    } else {
      beforMaps.push(opts)
    }
  }

  after(opts = {}) {
    if (typeof opts === 'function') {
      afterMaps.push({ listen: opts })
    } else {
      afterMaps.push(opts)
    }
  }
}

const r = new Router()
modules.forEach(item => r.addChild(item))

const router = new VueRouter({
  routes: r.$routes
})

router.beforeEach((to, from, next) => {
  let nextFlag = false
  const _next = (...args) => {
    nextFlag = true
    next(...args)
  }

  const list = filterMaps(beforMaps, to, from)
  for (const item of list) {
    if (nextFlag) return
    item.listen(to, from, _next)
  }

  if (!nextFlag) {
    _next()
  }
})

router.afterEach((to, from) => {
  const list = filterMaps(afterMaps, to, from)
  for (const item of list) {
    item.listen(to, from)
  }
})

function filterMaps(maps, to, from) {
  return maps.filter(item => {
    // 中间件未开启
    if (item.enable === false) return false

    // 路由名称不匹配
    if (item.match) {
      let matchFlag = false
      const matches = Array.isArray(item.match) ? item.match : [ item.match ]
      for (const rule of matches) {
        if (
          ((rule instanceof RegExp) && rule.test(to.name)) ||
          (typeof rule === 'string' && rule === to.name)
        ) {
          matchFlag = true
          break
        }
      }
      if (!matchFlag) return false
    }

    // 路由被忽略
    if (item.ignore) {
      const ignores = Array.isArray(item.ignore) ? item.ignore : [ item.ignore ]
      for (const rule of ignores) {
        if (
          ((rule instanceof RegExp) && rule.test(to.name)) ||
          (typeof rule === 'string' && rule === to.name)
        ) return false
      }
    }

    // 不符合自定义匹配规则
    if (typeof item.filter === 'function' && item.filter(to, from) === false) {
      return false
    }

    return typeof item.listen === 'function'
  })
}

export default router
