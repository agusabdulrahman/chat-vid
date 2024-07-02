chrome.runtime.sendMessage({ type: 'youtubeOrNot' }, function (response) {
  if (response) {
    setTimeout(function () {
      const showTransciptButton = document.querySelector('button[aria-label="Show transcript"]');
      if (showTransciptButton) {
        showTransciptButton.click();

        const contentWrapper = document.querySelector('ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-searchable-transcript"]');
        if (contentWrapper) {
          let transcript = [];
          contentWrapper.style.opacity = '0';
          const contentWrap = contentWrapper.querySelector('#content');
          const mainDiv = document.createElement('div');
          const MainParagraph = document.createElement('div');
          MainParagraph.style.paddingTop = '20px';
          const toggleTabs = document.createElement('div');
          mainDiv.appendChild(toggleTabs);
          toggleTabs.style.display = 'flex';
          toggleTabs.style.flexDirection = 'row';
          toggleTabs.style.width = '100%';
          toggleTabs.style.marginBottom = '10px';

          const SummaryTab = document.createElement('button');
          SummaryTab.innerHTML = 'summary';
          SummaryTab.style.cssText = `
            padding-top: 5px;
            padding-bottom: 5px;
            padding-right: 10px;
            padding-left: 10px;
            border: 1px solid #00000010;
            background-color: #ffffff;
            font-family: Arial, sans-serif;
            font-size: 17px;
            color: #000000;
            border-radius: 20px;
            opacity: 1;
            cursor: pointer;
          `;
          toggleTabs.appendChild(SummaryTab);

          const ChatTab = document.createElement('button');
          ChatTab.innerHTML = 'Chart';
          ChatTab.style.cssText = `
            padding-top: 5px;
            padding-bottom: 5px;
            padding-right: 10px;
            padding-left: 10px;
            border: 1px solid #00000010;
            background-color: #ffffff;
            font-family: Arial, sans-serif;
            font-size: 17px;
            color: #000000;
            border-radius: 20px;
            opacity: 0.8;
            margin-left: 10px;
            cursor: pointer;
            `;
          toggleTabs.appendChild(ChatTab);
          toggleTabs.appendChild(MainParagraph);
          setTimeout(() => {
            contentWrapper.style.display = 'none';
            contentWrapper.insertAdjacentElement('afterend', mainDiv);
            mainDiv.style.cssText = `
              padding: 20px;
              border: 1px solid #ffffff10;
              background-color: #1d1d1d;
              font-family: Arial, sans-serif;
              font-size: 17px;
              color: #ffffff;
              border-radius: 20px;
              overflow-y: auto;
              max-height: 500px;
            `;
            mainDiv.classList.add('mainDiv');

            let transcriptElement1 = contentWrap.querySelector('ytd-transcript-renderer');
            let transcriptElement2 = transcriptElement1.querySelector('#segments-container');
            let transcriptElement3 = transcriptElement2.querySelectorAll('yt-formatted-string');
            if (transcriptElement3) {
              transcriptElement3.forEach((string) => transcript.push(string.innerHTML));
            }
            console.log(transcript);
            fetch('http://localhost:3000/api/transcript', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ transcript }),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
              })
              .catch((error) => {
                console.error('Error:', error);
              });
          }, 3000);
        }
      }
    }, 3000);
  } else {
    console.log('This is not a youtube page');
  }
});
