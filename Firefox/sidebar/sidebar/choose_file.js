
const inputElement = document.getElementById("beast");
inputElement.addEventListener("click", displayFile);

/* 
Insert the content script and send the image file ObjectURL to the content script using a 
message.
*/
function displayFile() {

  //代码注入
  browser.tabs.executeScript({ file: "/content_scripts/jquery-1.10.2.min.js" });
  browser.tabs.executeScript({
    file: "/content_scripts/content.js"
  }).then(messageContent)
    .catch(reportError);

  function messageContent() {
    var search = document.querySelector("#search").value;
    var path = document.querySelector("#path").value;

    const gettingActiveTab = browser.tabs.query({ active: true, currentWindow: true });
    gettingActiveTab.then((tabs) => {
      browser.tabs.sendMessage(tabs[0].id, {
        contents: search,
        path: path
      });
    });
  }

  function reportError(error) {
    console.error(`Could not inject content script: ${error}`);
  }
}