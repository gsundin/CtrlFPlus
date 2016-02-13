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
    highlightText(document.body);
    sendResponse({messageStatus: "received"});
  }
});

function highlightText(element) {
  // we reached here
  var nodes = element.childNodes;
  console.log("my node!");
  console.log(nodes);
  console.log("");
  for (var i = 0, l = nodes.length; i < l; i++) {
    if (nodes[i].nodeType === 3) {  // Node Type 3 is a text node
//      var text = nodes[i].innerHTML;
      var text = nodes[i].data;
      // Upon click, this sentence is reached.
      // For some reason, it does not highlight anything though.
//      throw 1234321;

      /*
       *  Hide:
       *  This is where we need to highlight the text 
       *  but not working for some reason
       */
      console.log("Here is what's in node[i].innerHTML");
      console.log(nodes[i]);
      console.log(nodes[i].innerHTML);
      console.log("");
      nodes[i].data = "<span style='background-color:#FFFF01'>" + text + "</span>";
//      nodes[i].innerHTML = "<span style='background-color:#FFFF01'>" + text + "</span>";
    }
    else if (nodes[i].childNodes.length > 0) {
      highlightText(nodes[i]);  // Not a text node or leaf, so check it's children
    }
  }
}
