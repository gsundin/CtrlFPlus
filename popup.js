window.onload = function() {

  var textInput = document.getElementById('input_text');

  textInput.focus();

  textInput.addEventListener("keypress", function(e) {
    if (e.keyCode === 13) {
      // enter key
      if (e.shiftKey) {
        // with shift
        return nextMessage();
      } else {
        // without shift
        return sendHighlightMessage();
      }
    }
    return false;
  });


  var currentSearchIndex = 0;
  var maxSearchFound = 0;

  var prevEl = document.getElementById('prev');
  prevEl.addEventListener('click', prevMessage);

  var nextEl = document.getElementById('next');
  nextEl.addEventListener('click', nextMessage);


  function prevMessage() {
    sendIncrementMessage(-1);
  }

  function nextMessage() {
    sendIncrementMessage(1);
  }

  function sendIncrementMessage(ii) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {highlight: false, incrm: ii}, function(response) {
        console.log(response);
        currentSearchIndex = response.currIndex;
        maxSearchFound = response.maxIndex;
        // todo set these values in the html somewhere.
        // x.innerText = currentSearchIndex + 1 + " of " + maxSearchFound;
      });
    });
  }

  function sendHighlightMessage() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {highlight: true, searchTerm: textInput.value}, function(response) {
        console.log(response);
      });
    });
  }
}
