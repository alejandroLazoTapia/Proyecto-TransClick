angular.module('App', []).controller('CrudCtrl',function($scope, $http, $window) {
    $scope.entity = {}

    var arrayUrl = getUrlVars();

    var url = service_creditCards  + '?' + arrayUrl.ID; 

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