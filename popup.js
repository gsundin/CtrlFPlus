window.onload = function() {
  var x = document.getElementById('submit_button');

  x.addEventListener('click', sendHighlightMessage);
  textInput = document.getElementById('input_text').focus();

  function sendHighlightMessage() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {highlight: true, searchTerm: textInput.value}, function(response) {
        console.log(response);
      });
    });
  }
}
