(function () {
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    function insertBeast() {

        // var testjq = $('#J_Reviews').find('.tm-rate').find('.rate-grid').find('table').find('.tm-rate-fulltxt');
        var testjq = $('.tb-rev-item');

        var arrp = new Array();

        for (let index = 0; index < testjq.length; index++) {
            arrp[index] = testjq[index].innerText;
        }
        console.log(arrp);
    }

    function removeExistingBeasts() {
        let existingBeasts = document.querySelectorAll(".beastify-image");
        for (let beast of existingBeasts) {
            beast.remove();
        }
    }

    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "beastify") {
            insertBeast();
        } else if (message.command === "reset") {
            removeExistingBeasts();
        }
    });
})();