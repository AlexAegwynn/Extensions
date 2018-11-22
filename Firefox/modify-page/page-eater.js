//document.body.textContent = "";

//var header = document.createElement('h1');
//header.textContent = "This page has been eaten";
//document.body.appendChild(header);

//document.body.style.backgroundColor = "blue";

function eatPage(request, sender, sendResponse) {
    document.body.textContent = "";

    var header = document.createElement('h1');
    header.textContent = request.replacement;
    document.body.appendChild(header);
}

browser.runtime.onMessage.addListener(eatPage);