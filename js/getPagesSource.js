function DOMtoString(document_root) {

    var scripts = document.getElementsByTagName('script');
    var length = scripts.length;
    var substring = "https://cdn.walkme.com/users";

    for (var i=0; i<length;i++){
        var string = scripts[i].outerHTML;
        console.log();
        if(string.indexOf(substring) > -1){
            console.log("found script tag",scripts[i].outerHTML);
            return scripts[i].outerHTML;
        }
    }    
    return 0;
}

// var data = chrome.extension.getURL("Scripts/settings.txt");
// console.log("data",data);

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});


