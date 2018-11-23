//document.body.style.border = "10px solid LightBlue";
function onError(error) {
    console.log(`Error:${error}`);
}

function onGot(item) {
    var color = "LightBlue";
    if (item.color) {
        color = item.color;
    }
    document.body.style.border = "10px solid " + color;
}

var getting = browser.storage.local.get("color");
getting.then(onGot, onError);