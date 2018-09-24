    var app = angular.module('MyApp', []);
    
app.controller('Profile', function ($scope, $http, $window) {
    
        // Generar request al servicio
    var datos = { "id": 1};
    var request = $.get(menu_service , datos);
    var htmlStrTxt = "";

        // Si el request esta OK
        request.done(function (jqXHR, textStatus, errorThrown) {             
            //Verifico respuesta del servicio
            console.log(jqXHR);
            htmlStrTxt = jqXHR.code_html;

              if (textStatus == "success") {
                  console.log(htmlStrTxt);
                  $("#menuDesplegable").replaceWith(htmlStrTxt);                  
                    return htmlStrTxt;
              } else {
                  // si el login es incorrecto creo la sesion en falso y doy anuncio de credenciales invalidad.
                toastr.error("Error:" + errorThrown);
                $.cookie("session", false);
            }
          });
    });