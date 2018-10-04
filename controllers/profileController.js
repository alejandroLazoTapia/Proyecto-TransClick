angular.module('App', []).controller('CrudCtrl',function($scope, $http, $window) {
    $scope.entity = {}

    console.log("-------ARRAY URL DESENCRIPTADA-------");
    var arrayUrl = getUrlVars();
    console.log(arrayUrl);

    var url = service_register  + '/' + arrayUrl.ID; 

    // Obtener usuario mediante método GET
    $scope.getData = function() 
    {
        $http.get(url)
        .then(function(response){
            console.log(response.data);
            $scope.entity = response.data;
        }, function (error) {
            toastr.error("Ocurrió un error al intentar leer el registro");
            console.log(error);
        });        
    }
    
    $scope.getData();


	}
);