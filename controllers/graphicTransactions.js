
var arrayUrl = getUrlVars();

var xhReq = new XMLHttpRequest();
          xhReq.open("GET", "https://webapitransclick.azurewebsites.net/api/Consumption?idUserGraphic="+arrayUrl.ID, false);
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
             series:[{type: 'column',name: 'Consumo',data: dat}, 
    
           ],
             plotOptions:{line:{dataLabels:{enabled:true}}}
         });
     });