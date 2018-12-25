(function () {
    /**
     * Check and set a global guard variable.
     * If this content script is injected into the same page again,
     * it will do nothing next time.
     */
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    /**
     * Given a URL to a beast image, remove all existing beasts, then
     * create and style an IMG node pointing to
     * that image, then insert the node into the document.
     */
    function insertBeast() {

        var testjq = $('#J_Reviews').find('.tm-rate').find('.rate-grid').find('table').find('.tm-rate-fulltxt');

        var arrp = new Array();

        for (let index = 0; index < testjq.length; index++) {
            arrp[index] = testjq[index].innerText;
        }

        console.log(arrp);

        // var test = document.getElementsByTagName('body')[0];
        // var last = test.children.namedItem('wrapper')
        //     .children.namedItem('head')
        //     .children.namedItem('head_wrapper')
        //     .children.namedItem('s_fm')
        //     .firstElementChild.children.namedItem('form')
        //     .children.namedItem('s_kw_wrap')
        //     .children.namedItem('kw').value;

        // console.log(last);
        // document.body.appendChild(beastImage);
    }

    /**
     * Remove every beast from the page.
     */
    function removeExistingBeasts() {
        let existingBeasts = document.querySelectorAll(".beastify-image");
        for (let beast of existingBeasts) {
            beast.remove();
        }
    }

    /**
     * Listen for messages from the background script.
     * Call "beastify()" or "reset()".
    */
    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "beastify") {
            insertBeast();
        } else if (message.command === "reset") {
            removeExistingBeasts();
        }
    });

})();