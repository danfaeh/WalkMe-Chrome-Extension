function getSettings(document_root) {

    var scripts = document.getElementsByTagName('script');
    var length = scripts.length;
    var substring = "https://s3.amazonaws.com/s3.maketutorial.com/users";

    for (var i=0; i<length;i++){
        var string = scripts[i].outerHTML;
        console.log();
        if(string.indexOf(substring) > -1){
            console.log("found script tag",scripts[i].outerHTML);
            return scripts[i].outerHTML;
        }
    }    

    return "Doesn't contain the WalkMe code";

}

chrome.runtime.sendMessage({
    action: "getSettings",
    source: getSettings(document)
});
