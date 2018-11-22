
function openPage() {
    browser.tabs.create({
        url: "https://www.baidu.com"
    });
}

browser.browserAction.onClicked.addListener(openPage);