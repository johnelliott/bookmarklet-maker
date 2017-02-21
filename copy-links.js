module.exports = function copyLinks () {
  // get page links in an array
  var links = Array.from(document.getElementsByTagName('a')).map(function (l) { return l.href })

  // make an element
  var d = document.createElement('div')

  // put links as CSV in the element
  d.innerText = links.toString()

  // put the element on the document so we can copy it
  document.body.appendChild(d)

  // get a list of all the divs
  // TODO can i just go to it with the d reference?
  var divs = document.body.getElementsByTagName('div')
  var div = Array.from(divs)[divs.length - 1]

  var r = document.createRange()
  r.selectNode(div)
  var sel = window.getSelection()
  // Unselect text if user has it selected to
  sel.removeAllRanges()
  // Select the text in our range
  sel.addRange(r)

  document.execCommand('copy')

  div.parentNode.removeChild(div)
}
