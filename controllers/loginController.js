

var app = angular.module('MyApp', []);
app.controller('Login', function ($scope, $http, $window) {

// Al ejecutar el evento click en login
$scope.ButtonClick = function () {
  var validate = validateInput();

  // Validar campos solicitados
  if (validate.status == true){
  
  // Encriptar contraseña para compararla con la almacenada
  var passencrip = window.btoa($scope.password);
  //console.log(passencrip);

  // Generar request al servicio
  var datos = { "email": $scope.email, "pass": passencrip };
  var request = $.get(service_login , datos);

  //console.log(service_login);
  //console.log(datos);
  //console.log(request);
  
  // Si el request est� OK
  request.done(function (response, textStatus, errorThrown) {                 

      var entity = JSON.parse(request.responseText);
      
      if (textStatus == "success") {
         // si el login es correcto creo la sesion en verdadero         
         var queryString = "ID=" + entity[0].id +"&"+ "PROFILE=" +entity[0].id_perfil;         
         var queryStringEncrypt = window.btoa(queryString);
         //console.log(queryString);
         //console.log(queryStringEncrypt);                
          $window.location.href = "profile.html?" + queryStringEncrypt;
      } else {
          // si el login es incorrecto creo la sesion en falso y doy anuncio de credenciales invalidad.
        toastr.error("Error:" + errorThrown);
    }
  });

  // Si falla el Request
  request.fail(function (jqXHR, textStatus, errorThrown) {  
    console.log(textStatus + ": " + errorThrown);          
    if(jqXHR.status == 404){
      toastr.error("Credenciales inválidas.");
    }else if (jqXHR.status == 500) {
      toastr.warning("Error interno del servidor [500].");                    
    }else if (jqXHR.status == 0) {
      toastr.info("Verifique su conexión [0].");                    
    }          
  });

}else{
  toastr.info(validate.message);                    
} 
}

// Redireccionar al formulario de registro
$scope.ButtonRedirect = function () {
  $window.location.href = "register.html";
}
});