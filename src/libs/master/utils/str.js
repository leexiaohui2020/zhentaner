/** @param {String} str */
export function humpify(str) {
  return str.split(/-|_/).map((v, k) => {
    return k === 0 ? v.toLowerCase() : v[0].toUpperCase() + v.slice(1).toLowerCase()
  }).join('')
}
