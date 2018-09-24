angular.module('App', []).controller('CrudCtrl',function($scope, $http, $window) {
        
        // Generar request al servicio
        var datos = {};
        var request = $.get(service_profiles , datos); 
        // Si el request esta OK
        request.done(function (jqXHR, textStatus, errorThrown) {             
        //Verifico respuesta del servicio
            if (textStatus == "success") {
                $scope.Profiles = jqXHR;
                document.getElementById("btnReadTable").click();        
                console.log($scope.Profiles);
                return;
            } else {
                // si el login es incorrecto creo la sesion en falso y doy anuncio de credenciales invalidad.
            toastr.error("Error:" + errorThrown);
            $.cookie("session", false);
        }
        });
	 
	 $scope.entity = {}
	    
	 $scope.edit = function(index){
     $scope.entity = $scope.Profiles[index];
	   $scope.entity.index = index;
     $scope.entity.editable = true;
     console.log($scope.entity);
	 }
   
   //Eliminar registros desde la API
   $scope.delete = function(index)
   {
        $scope.entity = $scope.Profiles[index];
        $scope.entity.index = index;            
        var url = service_profiles + '/' + $scope.entity.id; 
        console.log($scope.entity); 

        $http.delete(url, config)      
          .then(function (response) {
            $scope.Profiles.splice(index,1);
            toastr.success('Perfil eliminado exitosamente.');               
            console.log(response);
          }, function (error) {
            toastr.error("Ocurrió un error al intentar eliminar el registro");
              console.log(error);
          });
	}
	    
	 $scope.save = function(index){
     $scope.Profiles[index].editable = false;
     $scope.entity = $scope.Profiles[index];
     $scope.entity.index = index;
        
     // Generar request al servicio
    var datos = $scope.entity;
    var url = 'http://localhost:56786/api/Profiles/'  + $scope.entity.id; 


    console.log(datos);
    console.log(url);
             
        $http.put(url,datos,config)      
          .then(function (response) {
              console.log(response);
      
        }, function (error) {
              console.log(error);
        });
	   
     }     
	    
	 $scope.add = function(){        
	   $scope.Profiles.push({
	    id : getMaxOfJson($scope.Profiles,'id') + 1,
        nombre : "",
        editable:true
       })
     }

     $scope.submit = function(data) {
        console.log(data);
        // Filter through the selected items if needed
     }; 
	}
);