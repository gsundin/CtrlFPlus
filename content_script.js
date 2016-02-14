
window.onload = function() {

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // todo : convert to lowercase
    if (request.searchTerm == "shia labeouf") {
      document.body.style.background = "url('https://www.birchbox.com/images/uploads/shia_labeouf_clapping.gif') repeat";
      document.body.style.backgroundSize = "160px 90px";
    } else if (request.searchTerm == "twerk it") {
      twerkIt()
    } else {
      // var searchTerm = document.getElementById("input_text").value;
      matchText(document, new RegExp("\\b" + request.searchTerm + "\\b", "g"), function(node, match, offset) {
      var span = document.createElement("span");
      span.style = "background-color:#ffff00;color:#0f0f0a;font-weight:bold";
      span.id = "search-highlight-text";
      span.textContent = match;
      return span;
    });
    }
    sendResponse({messageStatus: "received"});
  });

  var twerkIt = function() {
    console.log("twerking it...");
    var x_pos = 0;
    var y_pos = 0;
    var maxTwerk = 250;
    var maxCount

    // document.body.style.top  = "-1px";
    // document.body.style.left = "-1px";

} 

  var matchText = function(node, regex, callback, excludeElements) { 

    excludeElements || (excludeElements = ['script', 'style', 'iframe', 'canvas']);
    var child = node.firstChild;

    while (child) {
      switch (child.nodeType) {
      case 1:
        if (child.id == "search-highlight-text") {
          child.style = "";
        }
        if (excludeElements.indexOf(child.tagName.toLowerCase()) > -1)
          break;
        matchText(child, regex, callback, excludeElements);
        break;
      case 3:
        var bk = 0;
        child.data.replace(regex, function(all) {
          var args = [].slice.call(arguments),
            offset = args[args.length - 2],
            newTextNode = child.splitText(offset+bk), tag;
          bk -= child.data.length + all.length;

          newTextNode.data = newTextNode.data.substr(all.length);
          tag = callback.apply(window, [child].concat(args));
          child.parentNode.insertBefore(tag, newTextNode);
          child = newTextNode;
        });
        break;
      }
      child = child.nextSibling;
    }

    return node;
  };
}
