window.onload = function() {
  var x = document.getElementById('submit_button')

  x.addEventListener('click', sendHighlightMessage);

  function sendHighlightMessage() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {highlight: true}, function(response) {
        console.log(response);
      });
    });
  }
}
