// Get Path ../
function getAbsolutePath() {
    var loc = window.location;
    var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/'));
    return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
};

function getMaxOfJson(jsonalreadyparsed, property) {
    var max = null;        
    for (var i=0 ; i<jsonalreadyparsed.length ; i++) {
            if(max == null){
                max = jsonalreadyparsed[i][property];
            } else {

            if (parseFloat(jsonalreadyparsed[i][property]) > max){

                max = jsonalreadyparsed[i][property];

            }

        }

    }
    return max;
};

function mayusc(e) {
    e.value = e.value.toUpperCase();
}

var config = 
{
    async: true,
    crossDomain: true,
    headers: 
    {
      'Content-Type': 'application/json; charset=utf-8', 
      'Accept': 'application/json' 

    }
};

function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
  
      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      xhr.open(method, url, true);
  
    } else if (typeof XDomainRequest != "undefined") {
  
      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      xhr = new XDomainRequest();
      xhr.open(method, url);
  
    } else {
  
      // Otherwise, CORS is not supported by the browser.
      xhr = null;
  
    }
    return xhr;
  };