angular.module('App', []).controller('CrudCtrl',function($scope, $http, $window) {
    $scope.entity = {}

    var arrayUrl = getUrlVars();

    var url = service_consumption + '?idUser=' + arrayUrl.ID; 

    // Obtener transacciones mediante método GET
    $scope.getData = function() 
    {
        $http.get(url)
        .then(function(response){
            if(response.status == 204){
                toastr.info("No posee transacciones registradas");
                $scope.JsonData = response.data;

            }else{
                $scope.JsonData = response.data;
                getPagination('#datatable-responsive');                
            }           
        }, function (error) {
            toastr.error("Ocurrió un error al intentar leer el registro");
            console.log(error);
        });        
    }
    $scope.getData();
    

    var xhReq = new XMLHttpRequest();
          xhReq.open("GET", service_consumption+"?idUserGraphic="+arrayUrl.ID, false);
          xhReq.send(null);
          var da = JSON.parse(xhReq.responseText);
          console.log(da);
          var dat = [];
      
          for (i = 0; i < da.length; i++) {
            var serie = new Array(da[i].mes, da[i].Total);
            console.log(serie);
            dat.push(serie);
            console.log(dat);
          }
        $(function($){
         $('#grafico').highcharts({
             title:{text:'Reporte Consumos'},
             xAxis:{title:{text:'Mes'}},
             yAxis:{title:{text:'Pesos $'}},
             tooltip:{valueSuffix:'$', pointFormat: '{series.total}: {point.y} (<b>{point.Pesos:..1f}$</b>)'},
             legend:{layout:'vertical',align:'right',verticalAlign:'middle',borderWidth:0},
             series:[{type: 'column',name: 'Consumo',data: dat},],
             plotOptions:{line:{dataLabels:{enabled:true}}}
         });
     });
});