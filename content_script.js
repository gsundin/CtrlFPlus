
window.onload = function() {

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // todo : convert to lowercase
    if (request.searchTerm == "shia labeouf") {
      document.body.style.background = "url('https://www.birchbox.com/images/uploads/shia_labeouf_clapping.gif') repeat";
      document.body.style.backgroundSize = "160px 90px";
    } else if (request.searchTerm == "twerk it") {
      twerkIt();
    } else {
      searchTermAry = request.searchTerm.split(' ');
      matchText(document, searchTermAry, function(node, match, offset) {
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

  var generateRegex = function(searchTermAry, articleText) {
    var expr = ""
    var articleAry = articleText.split(" ");
    // trying to figure out the better regex
//    var articleAry = Regex.Matches(input, "((\b[^\s]+\b)((?<=\.\w).)?)");
    var i, j;
    for (i = 0; i < articleAry.length; i++) {
      var word = articleAry[i];
      var shouldAdd = false;
      for (j = 0; j < searchTermAry.length; j++) {
        if (doesMatchWith(searchTermAry[j], word)) {
          shouldAdd = true;
          break;
        }
      }
      if (shouldAdd) {
        if (expr !== "") {
          expr = expr + "|";
        }
        expr = expr + word;
      }
    }
    if (expr == "") {
      return false;
    } else {
      return new RegExp(expr, "g");
    }
  }

  var doesMatchWith = function(a, b){
    if(a.length == 0) return false;
    if(b.length == 0) return false;
    a = a.toLowerCase();
    b = b.toLowerCase();

    var matrix = [];

    // increment along the first column of each row
    var i;
    for(i = 0; i <= b.length; i++){
      matrix[i] = [i];
    }

    // increment each column in the first row
    var j;
    for(j = 0; j <= a.length; j++){
      matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for(i = 1; i <= b.length; i++){
      for(j = 1; j <= a.length; j++){
        if(b.charAt(i-1) == a.charAt(j-1)){
          matrix[i][j] = matrix[i-1][j-1];
        } else {
          matrix[i][j] 
            = Math.min(matrix[i-1][j-1] + 1,
                Math.min(matrix[i][j-1] + 1, 
                  matrix[i-1][j] + 1)); 
        }
      }
    }
    var threshold = 0.4;
    var dist = matrix[b.length][a.length];
    return dist <= threshold * Math.max(a.length, b.length);
  };
  var matchText = function(node, searchTermAry, callback, excludeElements) { 

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
          matchText(child, searchTermAry, callback, excludeElements);
          break;
        case 3:
          var bk = 0;
          var regex = generateRegex(searchTermAry, child.data);
          if (regex) {
            child.data.replace(regex, function(all) {
              var args = [].slice.call(arguments),
              offset = args[args.length - 2],
              newTextNode = child.splitText(offset+bk), tag;
              bk -= child.data.length + all.length;

              newTextNode.data = newTextNode.data.substr(all.length);
              var x = [child].concat(args);
              tag = callback.apply(window, x);
              child.parentNode.insertBefore(tag, newTextNode);
              child = newTextNode;
            });
          }
          break;
      }
      child = child.nextSibling;
    }

    return node;
  };
}
