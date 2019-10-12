import Vue from 'vue'
import MainConfig from 'base/main.config.js'
import MainComponent from 'base/main.vue'
import data from './libs/data'
import router from './libs/router'
import 'base/main.less'
import 'base/main.js'
import './libs/component'

class Master {
  constructor(options = {}) {
    this.initOptions(options)
    this.init()
  }

  initOptions(options) {
    const _options = Object.assign({}, MainConfig, options)
    this._options = Vue.prototype.$config = Vue.observable(_options)
    this._data = Vue.prototype.$state = Vue.observable(data)
  }

  init() {
    new Vue({
      router,
      render: h => h(MainComponent)
    }).$mount('#app')
  }
}

export default Master
