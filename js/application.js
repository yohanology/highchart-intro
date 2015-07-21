$(document).ready(function(){
  var HighCharts = function(){
    this.graphData = [];
  };

  HighCharts.prototype.graphChart = function(){
    var highchartConfig = {
      title: {
        text: 'Average retail gas prices'
      },
      subtitle: {
        text: 'Bureau of Transportation Statistics (Multimodal)'
      },
      xAxis: {
        type: 'datetime'
      },
      series: [{
        name: 'US',
        data: this.graphData
      }]
    };

    $('#chart').highcharts(highchartConfig);
  };

  HighCharts.prototype.makeAjaxRequest = function(url){
    this.callbackFunction = function(response){
      var date;
      var price;
      var items = response.data;
      var item;

      for(var i = 0; i < items.length; i++){
        item = items[i];
        date = new Date(item[0]);
        price = item[1];
        this.graphData.unshift({ x: date, y: price });
      };

      this.graphChart();
    };

    var request = {
      context: this,
      type: "GET",
      url: url,
      dataType: "JSON",
      success: this.callbackFunction
    };

    $.ajax(request);
  };

  var url = "https://www.quandl.com/api/v1/datasets/BTS_MM/RETAILGAS.json?auth_token=E6kNzExHjay2DNP8pKvB";
  var chart = new HighCharts();
  chart.makeAjaxRequest(url);
});