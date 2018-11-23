// JavaScript source code
//document.body.style.backgroundColor = "blue";

browser.menus.create({
    id: "test1",
    title: "Test1",
    contexts: ["all"]
});

browser.menus.create({
    id: "test2",
    title: "Test2",
    contexts: ["all"]
});

browser.menus.create({
    id: "test3",
    title: "Test3",
    contexts: ["all"]
});

browser.menus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case "test1":
            browser.tabs.executeScript({
                code: 'document.body.style.border = "10px solid blue"'
            });
            break;
        case "test2":
            browser.tabs.executeScript({
                code: 'document.body.style.border = "10px solid green"'
            });
            break;
        case "test3":
            browser.tabs.executeScript({
                code: 'document.body.style.border = "10px solid yellow"'
            });
            break;
    }
});