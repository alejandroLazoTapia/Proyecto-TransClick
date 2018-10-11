angular.module('App', []).controller('CrudCtrl',function($scope, $http, $window) {
    $scope.JsonData = {}

    var arrayUrl = getUrlVars();

    var url = service_creditCards  + '?idUser=' + arrayUrl.ID; 

    // Obtener tarjetas mediante método GET
    $scope.getData = function() 
    {
        $http.get(url)
        .then(function(response){
            if(response.status == 204){
                toastr.info("No posee medios de pago registrados");
                $scope.JsonData = response.data;

            }else{
                $scope.JsonData = response.data;
                //console.log("Tarjetas registradas: " + response.data.length);    
                //Recorre los registros del JSON y genera HTML credit cards
            }
        }, function (error) {
            toastr.error("Ocurrió un error al intentar leer el registro");
            console.log(error);
        });        
    }
    
    $scope.getData();

    
     
    //Función para insertar o modificar registros
     $scope.save = function(JsonCard)
        {
            var index = JsonCard;
            console.log(index);

            $scope.entity = $scope.JsonCard;            
            $scope.entity.index = JsonCard;
            var codeSecure = $scope.JsonCard.secure_code;
            //$scope.entity.secure_code =  encrypt(codeSecure);
                            
            // Generar request al servicio
            var datos = $scope.entity;
           
            //Valido si el ID es null para iniciar y crear
            if (datos.id == undefined){
                datos.id= 0;
                datos.selected = "N";
                datos.status = "A";
                datos.id_user = arrayUrl.ID;
            }

            var url = service_creditCards  + '/' + $scope.entity; 

            console.log(datos);

            $http.post(url,datos,config)      
            .then(function (response) {
                $scope.getData();
                toastr.success('Registro guardado exitosamente');
                console.log(response);

            }, function (error) {
                toastr.error("Ocurrió un error al intentar insertar el registro");
                console.log(error);
            }); 
   
        };     

           //Función para insertar o modificar registros
     $scope.disable = function(index)
     {

         $scope.entity = $scope.JsonData[index];
         //$scope.entity.index = index;   
                                 
         // Generar request al servicio
         var datos = $scope.entity;
        
         //Valido si el ID es null para iniciar y crear
         if (datos.id == ''){
             datos.status= 'A';
         }else{
             datos.status = 'I';
         }

         var url = service_creditCards  + '/' + $scope.entity; 

         console.log(datos);

            $http.post(url,datos,config)      
            .then(function (response) {
                $scope.getData();
                toastr.success('Registro eliminado exitosamente');
                console.log(response);

            }, function (error) {
                toastr.error("Ocurrió un error al intentar quitar el registro");
                console.log(error);
            });          
     };    
       
        $scope.clear = function(data) {
            $scope.JsonDataUser = {};
            // Filter through the selected items if needed
         }; 
	}
);