chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSettings") {
  	// console.log("request:",request.source);
  	var awsUrl = "https://s3.amazonaws.com/s3.maketutorial.com/users/7a75f78cb4644e4188ad82d063b1f54b/settings.txt";

		var xhr = new XMLHttpRequest();
		xhr.addEventListener("load", reqListener);
		xhr.open("GET", awsUrl);
		xhr.send();

		function reqListener () {
		  var awsTag = this.responseText;
		  console.log("awsTag",awsTag);
		  var langs = ["English", "Spanish", "French", "Japanese", "Italian", "Chinese", "Portuguese", "German"];
		  var len = langs.length;
  		var siteLangs = [];

	  	for(var i=0; i<len; i++){
	  		if(awsTag.indexOf(langs[i]) > -1){
	  			siteLangs.push(langs[i]);
	  		}
	  	}

	  	var stringLangs = siteLangs.join(", ");
	  	document.getElementById('langs').innerText = "Languages - " + stringLangs;
	  	siteLangs = [];
		}		

  }
});



chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
  	var scriptTag = request.source;

	  if (scriptTag === 0){
	  	walkme.innerText = "Doesn’t contain the walkme code";
	  }else{

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
	  	var p1 = scriptTag.indexOf("/users/");
	  	var p2 = p1 + 32;

	  	for(var j = p1+7; j< p1+39; j++){
	  		id.push(scriptTag[j]);
	  	}
	  	var userid = id.join("");

		  document.getElementById('walkme').innerText = "www.walkme.com - WalkMe Enabled";
		  document.getElementById('details').innerText = "Details:";
		  document.getElementById('userid').innerText = "User Id - " + userid;
		  document.getElementById('env').innerText = "Env - " + env;
		  document.getElementById('https').innerText = "Is Https - " + https;
		  document.getElementById('host').innerText = "Host - " + host;
		  document.getElementById('async').innerText = "async - " + async;

		  message.innerText = request.source;
	  }


  }
});

function onWindowLoad() {

  var message = document.getElementById('message');

  chrome.tabs.executeScript(null, {
    file: "js/getPagesSource.js",
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });

  chrome.tabs.executeScript(null, {
    file: "js/getSettings.js",
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });

  

}

window.onload = onWindowLoad;

