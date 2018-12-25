

const hidePage = `body > :not(.beastify-image) {
                    display: none;
                  }`;

function listenForClicks() {
    document.addEventListener("click", (e) => {

        function beastify(tabs) {
            //发送一个消息，两个js文件之间通过Msg通信。
            browser.tabs.sendMessage(tabs[0].id, {
                command: "beastify"
            });
        }

        // function reset(tabs) {
        //     browser.tabs.removeCSS({ code: hidePage }).then(() => {
        //         browser.tabs.sendMessage(tabs[0].id, {
        //             command: "reset",
        //         });
        //     });
        // }

        function reportError(error) {
            console.error(`Could not beastify: ${error}`);
        }

        if (e.target.classList.contains("beast")) {
            browser.tabs.query({ active: true, currentWindow: true })
                .then(beastify)
                .catch(reportError);
        }
    });
}

function reportExecuteScriptError(error) {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error(`Failed to execute beastify content script: ${error.message}`);
}

//代码注入
browser.tabs.executeScript({ file: "/content_scripts/jquery-1.10.2.min.js" });
browser.tabs.executeScript({ file: "/content_scripts/beastify.js" })
    .then(listenForClicks)
    .catch(reportExecuteScriptError);