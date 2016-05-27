//Listen for Settings.txt Info
chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSettings") {
  	//convert aws tag to aws url
  	var awsTag = request.source;
  	var url = [];
  	var urlStart = awsTag.indexOf("https");
  	var urlEnd = awsTag.indexOf(" id");

  	for (var x=urlStart;x<urlEnd-1; x++){
  		url.push(awsTag[x]);
  	}
  	var awsUrl = url.join("");

		//if aws tag present
  	if (awsTag !== 0 ){

  		//Sending GET request to Listener
	  	var xhr = new XMLHttpRequest();
			xhr.addEventListener("load", reqListener);
			xhr.open("GET", awsUrl);
			xhr.send();

			//Listener grabs settings.txt data, parses important segments, then appends them to popup window.
			function reqListener () {
			  var awsTag = this.responseText;
			  var langs = ["English", "Spanish", "French", "Japanese", "Italian", "Chinese", "Portuguese", "German"];
			  var len = langs.length;
	  		var siteLangs = [];

	  		//getting Language attribute
		  	for(var i=0; i<len; i++){
		  		if(awsTag.indexOf(langs[i]) > -1){
		  			siteLangs.push(langs[i]);
		  		}
		  	}

		  	var stringLangs = siteLangs.join(", ");
		  	if(siteLangs.length === 0){
		  		stringLangs = "N/A";
		  	}
		  	document.getElementById('langs').innerText = "Languages - " + stringLangs;

		  	//getting Data attribute
		  	var data = [];
		  	var start = awsTag.indexOf("'DataFiles':");
		  	var end = awsTag.indexOf("','languages':");
		  	var diff = end - start;

		  	for(var j = start+21; j< start+diff; j++){
		  		data.push(awsTag[j]);
		  	}
		  	var siteData = data.join("");
		  	document.getElementById('siteData').innerText = "DataFile - " + siteData;

		  	//getting LibFile attribute
		  	var lib = [];
		  	var libStart = awsTag.indexOf("'LibFile':'");
		  	var libEnd = awsTag.indexOf("','PreLibJsFile");
		  	var dif = libEnd - libStart;

		  	for(var k = libStart+11; k< libStart+dif; k++){
		  		lib.push(awsTag[k]);
		  	}
		  	var siteLib = lib.join("");
		  	document.getElementById('siteLib').innerText = "LibFile - " + siteLib;		  	
		  	
			}	

  	}	
  }
});

//Listen for Script Tag Info
chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
  	var scriptTag = request.source;

	  if (scriptTag === 0){
	  	walkme.innerText = "No walkme code detected";
	  }else{

	  	//set each script attribute value
	  	var async;
	  	if(scriptTag.indexOf("async") > -1){
	  		async = "True";
	  	}else{
	  		async = "False";
	  	}

	  	var env;
	  	if(scriptTag.indexOf("test") > -1){
	  		env = "Test";
	  	}else{
	  		env = "Production";
	  	}	  	

	  	var https;
	  	if(scriptTag.indexOf("_https") > -1){
	  		https = "True";
	  	}else{
	  		https = "False";
	  	}	 

	  	var host;
	  	if(scriptTag.indexOf("cdn.walkme.com") > -1){
	  		host = "cdn.walkme.com";
	  	}else{
	  		host = "d3b3ehuo35wzeh.cloudfront.net";
	  	}	 		  		  	

	  	var id = [];
	  	var p = scriptTag.indexOf("/users/");

	  	for(var j = p+7; j< p+39; j++){
	  		id.push(scriptTag[j]);
	  	}
	  	var userid = id.join("");

	  	//append all set attributes to the popup page
		  document.getElementById('walkme').innerText = "www.walkme.com - WalkMe Enabled";
		  document.getElementById('details').innerText = "Details:";
		  document.getElementById('userid').innerText = "User Id - " + userid;
		  document.getElementById('env').innerText = "Env - " + env;
		  document.getElementById('https').innerText = "Is Https - " + https;
		  document.getElementById('host').innerText = "Host - " + host;
		  document.getElementById('async').innerText = "async - " + async;
	  }


  }
});

//on load, will run getPagesSource.js (for walkme script tag) & getSettings for settings.txt file
function onWindowLoad() {

  var message = document.getElementById('message');

  chrome.tabs.executeScript(null, {
    file: "js/getPagesSource.js",
  }, function() {
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });

  chrome.tabs.executeScript(null, {
    file: "js/getSettings.js",
  }, function() {
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });

}

window.onload = onWindowLoad;

