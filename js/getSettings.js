function getSettings(document_root) {

    var scripts = document.getElementsByTagName('script');
    var length = scripts.length;
    var substring = "https://s3.amazonaws.com/s3.maketutorial.com/users";

    //iterrate over all script tags to find s3 script tag
    for (var i=0; i<length;i++){
        var string = scripts[i].outerHTML;
        if(string.indexOf(substring) > -1){
            return scripts[i].outerHTML;
        }
    }    
    return 0;

}

chrome.runtime.sendMessage({
    action: "getSettings",
    source: getSettings(document)
});
