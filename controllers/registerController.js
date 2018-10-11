   //Crea un cookie con info del usuario
   $(document).ready(function () {
    $.cookie("session", false);
    $.removeCookie("usuario");
});

//Valida los campos ingresados en el formulario  
function validateInput(){
var obj =[];
obj.status = true;
obj.message = "";

if ($('#typeDocument').val() == ''){
  obj.status = false;
  obj.message = "Debe seleccionar tipo documento.";
}else if ($('#numberDocument').val() == ''){
  obj.status = false;
  obj.message = "Debe ingresar número documento.";
}else if ($('#name').val() == ''){
  obj.status = false;
  obj.message = "Debe ingresar nombre.";
}else if($('#lastname').val()  == ''){
  obj.status = false;
  obj.message = "Debe ingresar apellido.";
}else if($('#email').val()  == ''){
  obj.status = false;
  obj.message = "Debe ingresar email.";
}else if(!IsEmail($('#email').val())){
  obj.status = false;
  obj.message = "Email inválido.";
}else if($('#sex').val()  == ''){
  obj.status = false;
  obj.message = "Debe seleccionar género.";
}else if($('#birthdate').val()  == ''){
  obj.status = false;
  obj.message = "Debe ingresar fecha de nacimiento.";
}else if($('#password').val()  == ''){
  obj.status = false;
  obj.message = "Debe ingresar password.";
}else if($('#password').val().length < 4){
  obj.status = false;
  obj.message = "Password debe contener mínimo 4 caracteres.";
}
return obj;
} 

function IsEmail(email) {
var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
if(!regex.test(email)) {
  return false;
}else{
  return true;
}
}

var app = angular.module('MyApp', []);
app.controller('Register', function ($scope, $http, $window) {

// Al ejecutar el evento click en login
$scope.ButtonClick = function () {
  var validate = validateInput();

  // Validar campos solicitados
  if (validate.status == true){        
  
  //Se asigna formato de fecha internacional
  var fecha = $scope.birthdate;
  var fechaformat = fecha.format("yyyy-mm-dd'T'HH:MM:ss");
  // Encriptar contraseña antes de almacenarla
  var passencrip = window.btoa($scope.password);
  
  // Generar request al servicio
  var datos = { "id_perfil": 1, "id_doc_type": $scope.typeDocument,  "num_document": $scope.numberDocument, "name": $scope.name, "last_name": $scope.name, "email": $scope.email, "sex": $scope.sex, "birth_date": fechaformat, "password": passencrip };
  var request = $.post(service_user , datos);

  console.log(service_user);
  console.log(datos);
  console.log(request);
  
  // Si el request est� OK
  request.done(function (jqXHR, textStatus, errorThrown) {             
    console.log(jqXHR);

      if (textStatus == "success") {
          toastr.success('Usuario registrado exitosamente.');    
                     
          //$window.location.href = getAbsolutePath() + "/login.html";
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
  $window.location.href = getAbsolutePath() + "/login.html";
}
});