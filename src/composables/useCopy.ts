export default () => (string?: string) => {
  if (!string) return
  const el = document.createElement('textarea')
  el.value = string
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)
  const getSelectionResult = document.getSelection()
  if (!getSelectionResult) return
  const selected = getSelectionResult.rangeCount > 0 ? getSelectionResult.getRangeAt(0) : false
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  if (selected) {
    getSelectionResult.removeAllRanges()
    getSelectionResult.addRange(selected)
  }
}
