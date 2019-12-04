export function getParameterByName(name, url) {
  if (!url) url = window.location.href
  name = name.replace(/[\[\]]/g, '\\$&')
  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

export function tts(text) {
  if ('speechSynthesis' in window) {
    var msg = new SpeechSynthesisUtterance(text)
    window.speechSynthesis.speak(msg)
  }
}

export function changeURL(word) {
  if (history.pushState) {
    var newurl =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname +
      `?q=${word}`
    window.history.pushState({ path: newurl }, '', newurl)
  }
}
