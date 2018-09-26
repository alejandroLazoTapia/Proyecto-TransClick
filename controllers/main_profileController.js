angular.module('App', []).controller('CrudCtrl',function($scope, $http, $window) {
    
    // Obtener perfiles mediante método GET
    $scope.loading = false;
    $scope.getData = function() 
    {
        $scope.loading = true;
        $http.get(service_profiles)
        .then(function(response){
            $scope.JsonData = response.data;
            $scope.loading = false;
        }, function (error) {
            toastr.error("Ocurrió un error al intentar leer el registro");
            console.log(error);
        });
    }
    
    $scope.getData();	 
	$scope.entity = {}
            
    //Función para editar registros
	 $scope.edit = function(index){
     $scope.entity = $scope.JsonData[index];
	   $scope.entity.index = index;
     $scope.entity.editable = true;
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
                toastr.success('Success messages');
                console.log(response);
            }, function (error) {
                toastr.error("Ocurrió un error al intentar eliminar el registro");
                console.log(error);
            });
        }
     
     
    //Función para insertar o modificar registros
     $scope.save = function(index)
        {
            $scope.JsonData[index].editable = false;
            $scope.entity = $scope.JsonData[index];
            $scope.entity.index = index;
                
            // Generar request al servicio
            var datos = $scope.entity;
            var url = service_profiles  + '/' + $scope.entity; 

            console.log(datos);
            console.log(url);
                    
                $http.post(url,datos,config)      
                .then(function (response) {
                    console.log(response);

                }, function (error) {
                    console.log(error);
                });	   
        }     
       
    //Función para agregar filas a la tabla    
     $scope.add = function()
        {        
            $scope.JsonData.push({
            id : getMaxOfJson($scope.JsonData,'id') + 1,
            nombre : "",
            editable:true
            })
        }

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
                    toastr.success('Success messages');
                    console.log(response);
                    console.log("Delete profile: "+ entity.id)
                }, function (error) {
                    toastr.error("Ocurrió un error al intentar eliminar el registro");
                    console.log(error);
                });
            }
        });    $scope.JsonData=newDataList;
        
        };


     $scope.submit = function(data) {
        console.log(data);
        // Filter through the selected items if needed
     }; 
	}
);