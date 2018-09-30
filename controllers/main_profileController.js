angular.module('App', []).controller('CrudCtrl',function($scope, $http, $window) {
    
    $scope.entity = {}

    // Obtener perfiles mediante método GET
    $scope.getData = function() 
    {
        $http.get(service_profiles)
        .then(function(response){
            $scope.JsonData = response.data;
        }, function (error) {
            toastr.error("Ocurrió un error al intentar leer el registro");
            console.log(error);
        });
    }
    
    $scope.getData();
    $scope.entity.disabled == true;

    //Función para editar registros
     $scope.edit = function(index)
     {
        var fila = index + 1;
        $("table tr:eq("+fila+") #optStatus").removeAttr("disabled");

        $scope.entity = $scope.JsonData[index];
        $scope.entity.index = index;
        $scope.entity.editable = true;     
        $scope.entity.disabled = false; 
        console.log($scope.entity);
	 }
   
    
     //Función para eliminar registros
    $scope.delete = function(index)
        {
            $scope.entity = $scope.JsonData[index];
            $scope.entity.index = index;            
            var url = service_profiles + '/' + $scope.entity.id; 
            console.log($scope.entity); 

            $http.delete(url, config)      
            .then(function (response) {
                $scope.JsonData.splice(index,1);
                toastr.success('Registro eliminado exitosamente');
                $scope.getData();
                console.log(response);
            }, function (error) {
                toastr.error("Ocurrió un error al intentar eliminar el registro");
                console.log(error);
            });
        }
     
     
    //Función para insertar o modificar registros
     $scope.save = function(index)
        {
            var fila = index + 1;
            $("table tr:eq("+fila+") #optStatus").attr("disabled", true);

            $scope.JsonData[index].editable = false; 
            $scope.JsonData[index].disabled = true;                                   
            $scope.entity = $scope.JsonData[index];
            $scope.entity.index = index;
                
            // Generar request al servicio
            var datos = $scope.entity;
            var url = service_profiles  + '/' + $scope.entity; 

            console.log(datos);

            if($scope.entity.nombre != ''){
                if($scope.entity.id_status != undefined){
                    $http.post(url,datos,config)      
                    .then(function (response) {
                        $scope.getData();
                        toastr.success('Registro guardado exitosamente');
                        console.log(response);
    
                    }, function (error) {
                        toastr.error("Ocurrió un error al intentar insertar el registro");
                        console.log(error);
                    }); 
                }else{
                    toastr.warning("Debe seleccionar estado");    	
                }               
            }else{
                toastr.warning("Debe ingresar nombre del perfil");    	
            }
   
        };     
       
    //Función para agregar filas a la tabla    
     $scope.add = function()
        {        
            $scope.JsonData.push({
            id : 0,
            nombre : "",
            editable:true,
            disabled: false           
        })
        };

        $scope.removeSelect = function(){           
            var newDataList=[];
            angular.forEach($scope.JsonData,function(entity){
            if(!entity.selected){
                newDataList.push(entity);
            }
            else{
                //Extrae item seleccionados
                console.log(entity.id);  
                var url = service_profiles + '/' + entity.id; 
     
                $http.delete(url, config)      
                .then(function (response) {
                    $scope.getData();
                    toastr.success('Registro eliminado exitosamente');
                    console.log(response);
                    console.log("Delete profile: "+ entity.id)
                }, function (error) {
                    toastr.error("Ocurrió un error al intentar eliminar el registro");
                    console.log(error);
                });
            }
        });    $scope.JsonData=newDataList;        
        };      

     
    //Función para insertar o modificar registros
    $scope.cancel = function(index)
    {
        var fila = index + 1;
        $("table tr:eq("+ fila +") #optStatus").attr("disabled", true);

        $scope.JsonData[index].editable = false; 
        $scope.JsonData[index].disabled = true;                                   
        $scope.entity = $scope.JsonData[index];
        $scope.entity.index = index;
    };     
   

     $scope.submit = function(data) {
        console.log(data);
        // Filter through the selected items if needed
     }; 
	}
);