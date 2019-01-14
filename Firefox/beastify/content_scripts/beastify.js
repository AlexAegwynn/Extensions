(function () {
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    function insertBeast(search, path) {

        // console.log(search);
        // console.log(path);

        let arr = search.split('，');
        console.log(arr);
        arr.forEach(element => {
            (function (element) {
                setTimeout(function () {
                    $('#q').val(element);
                    $('.icon-btn-search').click();
                }, 10);
            })(element)
        });

        // var credit = '';

        // let ifr = document.createElement('iframe');
        // ifr.src = document.location.href;
        // ifr.style.display = "none";

        // if (!ifr.attachEvent) {
        //     ifr.onload = function () {
        //         let url = ifr.contentDocument.body.getElementsByClassName('rank').item(0).href;
        //         let name = ifr.contentDocument.body.getElementsByClassName('shop-name').item(0).innerHTML;

        //         fetch(url)
        //             .then(function (response) {
        //                 return response.text()
        //             })
        //             .then(function (body) {
        //                 let creditEle = document.createElement('div');
        //                 creditEle.innerHTML = body;
        //                 let creditcontent = creditEle.getElementsByClassName('sep')[0].firstElementChild.firstChild;
        //                 let creditValue = creditcontent.nodeValue.replace(/[\'\"\\\/\b\f\n\r\t]/g, '');
        //                 credit += name.replace(/[\'\"\\\/\b\f\n\r\t\s]/g, '') + ' ' + creditValue + '\n';
        //                 var a = document.createElement('a');
        //                 a.setAttribute('href', 'data:text/html;gb2312,' + credit);
        //                 a.setAttribute('download', 'test.txt');
        //                 a.setAttribute('target', '_blank');
        //                 a.style.display = "none";
        //                 document.body.appendChild(a);
        //                 a.click();
        //                 console.log(credit);
        //             })
        //         ifr.remove();
        //     };
        // }
        // document.body.appendChild(ifr);
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