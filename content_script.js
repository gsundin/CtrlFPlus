chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (true) {
    highlightText(document.body);
    sendResponse({messageStatus: "received"});
  }
});

function highlightText(element) {
  var nodes = element.childNodes;
  for (var i = 0, l = nodes.length; i < l; i++) {
    if (nodes[i].nodeType === 3)  // Node Type 3 is a text node
      var text = nodes[i].innerHTML;
      nodes[i].innerHTML = "<span style='background-color:#FFEA0'>" + text + "</span>";
    }
    else if (nodes[i].childNodes.length > 0) {
      highlightText(nodes[i]);  // Not a text node or leaf, so check it's children
    }
  }
}
