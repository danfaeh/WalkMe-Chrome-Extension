function DOMtoString(document_root) {

    var scripts = document.getElementsByTagName('script');
    var length = scripts.length;
    var substring = "walkme.com/users";
    var subsubstring = "cloudfront.net/users";

    //iterrate over all script tags to first try to find traditional walkme script tag
    for (var i=0; i<length;i++){
        var string = scripts[i].outerHTML;
        if(string.indexOf(substring) > -1){
            return scripts[i].outerHTML;
        }
    }

    //if couldn't find traditional tag, iterrate again to try to find cloudfront version walkme script tag
    for (var j=0; j<length;j++){
        var strings = scripts[j].outerHTML;
        if(strings.indexOf(subsubstring) > -1){
            return scripts[j].outerHTML;
        }
    }

    return 0;
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});


