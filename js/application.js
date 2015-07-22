
$(document).ready(function(){

var Chart = function(){
  this.graphData = [];
};

Chart.prototype.makeAjaxRequest = function(){

  $.ajax({
    context: this,
    type: 'GET',
    url: 'https://www.quandl.com/api/v1/datasets/BAVERAGE/USD.json?auth_token=E6kNzExHjay2DNP8pKvB',
    success: function(response){
      
      var items = response.data;
      var item;

      for(var i = 0; i < items.length; i++) {
        
        item = items[i];
        
        this.graphData.push({
          x: new Date(item[0]),
          y: item[1]
        });

      }

      console.log(this.graphData);
      this.graph();
    }
  });
}

Chart.prototype.graph = function(){
  var highchartConfig = {
    title: {
      text: 'USD/Bitcoin Average Price'
    },
    subtitle: {
      text: 'Aggregated bitcon price index from multiple exchanges providing a weighted average bitcoin price'
    },
    xAxis: {
      type: 'datetime'
    },
    series: [
      {
        turboThreshold: 0,
        name: 'Bitcoin price',
        data: this.graphData.reverse()
      }
    ]
    }
  $('#chart').highcharts(highchartConfig);
};




var bitcoinChart = new Chart();
bitcoinChart.makeAjaxRequest();


});