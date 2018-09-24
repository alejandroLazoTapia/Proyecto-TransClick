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

      if ($('#email').val() == ''){
        obj.status = false;
        obj.message = "Debe ingresar email.";
      }else if($('#password').val()  == ''){
        obj.status = false;
        obj.message = "Debe ingresar password.";
      }
      return obj;
    } 
      
    var app = angular.module('MyApp', []);
    app.controller('Login', function ($scope, $http, $window) {

      // Al ejecutar el evento click en login
      $scope.ButtonClick = function () {
        var validate = validateInput();

        // Validar campos solicitados
        if (validate.status == true){
        
        // Generar request al servicio
        var datos = { "email": $scope.email, "pass": $scope.password };
        var request = $.get(service_login , datos);

	      console.log(service_login);
        console.log(datos);
        console.log(request);
        
        // Si el request est� OK
        request.done(function (jqXHR, textStatus, errorThrown) {             
          console.log(jqXHR);

            if (textStatus == "success") {
               // si el login es correcto creo la sesion en verdadero
                $.cookie("session", true);
                $.cookie("usuario", $scope.email); 
                //toastr.success('Success messages');               
                $window.location.href = getAbsolutePath() + "/profile.html";
            } else {
                // si el login es incorrecto creo la sesion en falso y doy anuncio de credenciales invalidad.
              toastr.error("Error:" + errorThrown);
              $.cookie("session", false);
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
        $window.location.href = getAbsolutePath() + "/register.html";
      }
    });