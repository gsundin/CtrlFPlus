window.onload = function() {
  document.getElementById('submit_button').addEventListener('click', sendHighlightMessage);
  document.getElementById('input_text').focus();
  textInput = document.getElementById('input_text');

  function sendHighlightMessage() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {highlight: true, searchTerm: textInput.value}, function(response) {
        console.log(response);
      });
    });
  }
}
