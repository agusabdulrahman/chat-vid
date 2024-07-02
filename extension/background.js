chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === 'youtubeOrNot') {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentTab = tabs[0];
      function isYoutubeVideo(url) {
        return url.includes('youtube.com') && url.includes('/watch');
      }

      const isYoutube = isYoutubeVideo(currentTab.url);
      sendResponse({ isYoutube }); // Send the result back to the content script
    });

    // Return true to indicate that sendResponse will be used asynchronously
    return true;
  }
});
