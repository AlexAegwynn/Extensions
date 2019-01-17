(function () {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  function injectImage(request, sender, sendResponse) {
    insertImage(request.contents, request.path);
  }

  function insertImage(contents, path) {

    // console.log(contents + '_' + path);

    if (contents != "") {
      $('#credit').remove();

      let result = document.createElement('span');
      result.id = 'credit';
      result.style.display = "none";
      document.body.appendChild(result);

      let arr = contents.split('，');
      var credit = '';

      for (let i = 0; i < arr.length; i++) {
        (function (element) {
          setTimeout(function () {
            var url = "https://shopsearch.taobao.com/search?q=" + element + "&js=1&initiative_id=staobaoz_" + "20190116" + "&ie=utf8";

            let ifr = document.createElement('iframe');
            ifr.src = url;
            ifr.style.display = "none";

            if (!ifr.attachEvent) {
              ifr.onload = function () {
                let url = ifr.contentDocument.body.getElementsByClassName('rank').item(0).href;
                let name = ifr.contentDocument.body.getElementsByClassName('H')[0].firstChild.nodeValue;

                fetch(url)
                  .then(function (response) {
                    return response.text();
                  })
                  .then(function (body) {
                    let creditEle = document.createElement('div');
                    creditEle.innerHTML = body;
                    if (creditEle.getElementsByClassName('sep').length > 0) {
                      let creditcontent = creditEle.getElementsByClassName('sep')[0].firstElementChild.firstChild;
                      let creditValue = creditcontent.nodeValue.replace(/[\'\"\\\/\b\f\n\r\t]/g, '');
                      credit += name.replace(/[\'\"\\\/\b\f\n\r\t\s]/g, '') + ' ' + creditValue + '\n';
                      result.innerText = credit;

                      let test = name.replace(/[\'\"\\\/\b\f\n\r\t\s]/g, '') + ' ' + creditValue;
                      console.log(test);
                    } else {
                      console.error('Error: 验证超时');
                    }
                  })
                ifr.remove();
              };
            }
            document.body.appendChild(ifr);
          }, 10);
        })(arr[i])
      }

      // Save();
    } else {
      console.error('Error: 店铺名为空');
    }

    // //https://shopsearch.taobao.com/search?q=%E8%8B%B9%E6%9E%9C&js=1&initiative_id=staobaoz_20190116&ie=utf8

    // var credit = '';

    // let ifr = document.createElement('iframe');
    // ifr.src = document.location.href;
    // ifr.style.display = "none";

    // if (!ifr.attachEvent) {
    //   ifr.onload = function () {
    //     let url = ifr.contentDocument.body.getElementsByClassName('rank').item(0).href;
    //     let name = ifr.contentDocument.body.getElementsByClassName('H')[0].firstChild.nodeValue;
    //     console.log(name);
    //     // fetch(url)
    //     //   .then(function (response) {
    //     //     return response.text()
    //     //   })
    //     //   .then(function (body) {
    //     //     let creditEle = document.createElement('div');
    //     //     creditEle.innerHTML = body;
    //     //     let creditcontent = creditEle.getElementsByClassName('sep')[0].firstElementChild.firstChild;
    //     //     let creditValue = creditcontent.nodeValue.replace(/[\'\"\\\/\b\f\n\r\t]/g, '');
    //     //     // let name = creditEle.getElementsByClassName('title')[1].firstChild.nodeValue;
    //     //     credit += name.replace(/[\'\"\\\/\b\f\n\r\t\s]/g, '') + ' ' + creditValue + '\n';

    //     //     // var a = document.createElement('a');
    //     //     // a.setAttribute('href', 'data:text/html;gb2312,' + credit);
    //     //     // a.setAttribute('download', 'test.txt');
    //     //     // a.setAttribute('target', '_blank');
    //     //     // a.style.display = "none";
    //     //     // document.body.appendChild(a);
    //     //     // a.click();
    //     //   })
    //     ifr.remove();
    //   };
    // }
    // document.body.appendChild(ifr);
  }

  function Save() {
    let e = $('#credit');
    console.log(e);
  }

  /*
  Assign injectImage() as a listener for messages from the extension.
  */
  browser.runtime.onMessage.addListener(injectImage);

})();