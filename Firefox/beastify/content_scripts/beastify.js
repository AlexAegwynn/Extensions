(function () {
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    function insertBeast(search, path) {

        // console.log(search);
        // console.log(path);

        // let arr = search.split('，');
        // console.log(arr);
        // arr.forEach(element => {
        //     $('#q').val(element);
        //     $('.icon-btn-search').click();
        // });

        let ifr = document.createElement('iframe');
        ifr.id = 'ifr';
        ifr.src = document.location.href;
        ifr.style.display = "none";

        if (!ifr.attachEvent) {
            ifr.onload = function () {
                let ifrcontent = ifr.contentDocument.body.getElementsByClassName('rank').item(0).href;

                console.log(ifrcontent);
                ifr.remove();

            };
        }

        document.body.appendChild(ifr);
        
        let credit = document.createElement('iframe');
        credit.id = 'credit';
        credit.src = "https://rate.taobao.com/user-rate-UMmNuMFc0vCvYvWTT.htm"; //ifrcontent;
        // credit.style.display = "none";

        if (!credit.attachEvent) {
            credit.onload = function () {
                // .document.body.getElementsByClassName('sep')
                let creditcontent = credit.contentDocument;
                console.log(creditcontent);
                credit.remove();
            }
        }

        document.body.appendChild(credit);

        // var a = document.createElement('a');
        // a.setAttribute('href', 'data:text/html;gb2312,' + search);
        // a.setAttribute('download', 'test.txt');
        // a.setAttribute('target', '_blank');
        // a.style.display = "none";
        // document.body.appendChild(a);
        // a.click();
    }

    function removeExistingBeasts() {
        let existingBeasts = document.querySelectorAll(".beastify-image");
        for (let beast of existingBeasts) {
            beast.remove();
        }
    }

    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "beastify") {
            insertBeast(message.contents, message.path);
        } else if (message.command === "reset") {
            removeExistingBeasts();
        }
    });
})();