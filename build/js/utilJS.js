//Valida los campos ingresados en el formulario  
function validateInput(){
    var obj =[];
    obj.status = true;
    obj.message = "";
    
    if ($('#email').val() == ''){
      obj.status = false;
      obj.message = "Debe ingresar email.";
    }else if($('#password').val()  == ''){
      obj.status = false;
      obj.message = "Debe ingresar password.";
    }
    return obj;
    } 

function getUrlVars()
    {
        var vars = [], hash;
        var url = window.location.href.slice(window.location.href.indexOf('') + 1).split('&');
        var urlEncrypt = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

        if (urlEncrypt == undefined || urlEncrypt == '' || url == undefined || url == '') {
            window.location.href = getAbsolutePath() + "page_404.html";
            return;
        }else
        {                    
            console.log("----------------------");        
            console.log("QueryString: " + urlEncrypt);
            var dec = window.atob(urlEncrypt);
            //console.log(dec);
            //console.log("----------------------");
            var hashes = dec.split('&');
            for(var i = 0; i < hashes.length; i++)
            {
                hash = hashes[i].split('=');
                //vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
        }
        return vars;        
    }


    function getUrlEncrypt()
    {
        var urlEncrypt = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

        return urlEncrypt;        
    }    
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

function enabledBtnDelete(obj)
{
    if(obj.checked==true){            
        $("#removeBtn").attr("style", "visibility: visible");
    }else{
        $("#removeBtn").attr("style", "visibility: hidden");
    }
};

function encrypt(string)
{
    var enc = window.btoa(string);

    return enc;
};


function decrypt(string)
{
    var dec = window.atob(string);

    return dec;
};