window.onload = function() {
  var x = document.getElementById('myhighlight')
  console.log(x);
  if (x === null) {
    throw 812;
  }
  x.addEventListener('click', sendHighlightMessage);
  document.addEventListener('DOMContentLoaded', function() {
    throw 3903;
    var link = document.getElementById('highlight');
    // onClick's logic below:
    link.addEventListener('click', function() {
      sendHighlightMessage();
    });
  });

  function sendHighlightMessage() {
    // This sentence has been reached
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {highlight: true}, function(response) {
        console.log(response);
      });
    });
  }
}
