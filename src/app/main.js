import 'ionicons/dist/css/ionicons.css'

// 自适应设置
function setSize() {
  const html = document.documentElement
  const { clientWidth } = html
  html.style.fontSize = `${clientWidth * 16 / 750}px`
}

setSize()
window.addEventListener('resize', setSize)
window.addEventListener('orientationchange', setSize)
