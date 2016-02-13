//document.body.style.background = 'blue'

/*
 * Hide
 * The following is commented out temporarily
 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // we reached here
  if (true) {
    highlightText(document.body);
    sendResponse({messageStatus: "received"});
  }
});

function highlightText(element) {
  // we reached here
  var nodes = element.childNodes;
  for (var i = 0, l = nodes.length; i < l; i++) {
    if (nodes[i].nodeType === 3) {  // Node Type 3 is a text node
      var text = nodes[i].innerHTML;
      // Upon click, this sentence is reached.
      // For some reason, it does not highlight anything though.
//      throw 1234321;
      nodes[i].innerHTML = "<span style='background-color:blue'>" + text + "</span>";
    }
    else if (nodes[i].childNodes.length > 0) {
      highlightText(nodes[i]);  // Not a text node or leaf, so check it's children
    }
  }
}
