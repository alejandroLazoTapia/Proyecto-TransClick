angular.module('App', []).controller('CrudCtrl',function($scope, $http, $window) {
    $scope.entity = {}

    var arrayUrl = getUrlVars();

    var url = service_consumption + '?idUser=' + arrayUrl.ID; 

    // Obtener transacciones mediante método GET
    $scope.getData = function() 
    {
        $http.get(url)
        .then(function(response){
            $scope.JsonData = response.data;
            getPagination('#datatable-responsive');
            console.log(response.data);
        }, function (error) {
            toastr.error("Ocurrió un error al intentar leer el registro");
            console.log(error);
        });        
    }
    $scope.getData();
    //$scope.entity.disabled == true;
});