import { humpify } from '../utils/str'

const files = require.context('base/data', true, /\.js|json$/)
const data = files.keys().reduce((map, key) => {
  const names = key.match(/\.\/(\S*)\.js$/)[1].split('/').map(humpify)
  let root = map
  for (const name of names.slice(0, names.length - 1)) {
    if (!root[name]) {
      root[name] = {}
    }
    root = root[name]
  }
  root[names[names.length - 1]] = files(key).default
  return map
}, {})

export default data
