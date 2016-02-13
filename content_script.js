//document.body.style.background = 'blue'

/*
 * Hide
 * The following is commented out temporarily
 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // we reached here
//  inputText = document.getElementById("inputText")
//  var text = "ab";
//  var inputText = document.body;
//  var innerHTML = inputText.innerHTML;
//  var index = innerHTML.indexOf(text);
//  console.log("hello this is Hidenori");
//  console.log("index is");
//  console.log(index);
//  if ( index >= 0 )
//  { 
//      innerHTML = innerHTML.substring(0,index) + "<span class='highlight'>" + innerHTML.substring(index,index+text.length) + "</span>" + innerHTML.substring(index + text.length);
//      inputText.innerHTML = innerHTML 
//  }

  if (true) {
    // highlightText(document.body);
    var searchTerm = "Example";
;
  matchText(document, new RegExp("\\b" + searchTerm + "\\b", "g"), function(node, match, offset) {
      var span = document.createElement("span");
      span.style = "background-color:#FFFF01";
      span.textContent = match;
      return span;
  });


    sendResponse({messageStatus: "received"});
  }
});


var matchText = function(node, regex, callback, excludeElements) { 

    excludeElements || (excludeElements = ['script', 'style', 'iframe', 'canvas']);
    var child = node.firstChild;

    while (child) {
        switch (child.nodeType) {
        case 1:
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
