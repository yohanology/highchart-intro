$(document).ready(function(){
  var newDate;
  var price;
  var newData = [];

  function makeAjaxRequest(url, data) {
    var request = {
      type: "GET",
      url: url, 
      dataType: "JSON",
      success: function(response){
        response.data.forEach(function(item){
          newDate = new Date(item[0]);
          price = item[1];

          data.unshift({ x: newDate, y: price });
        });

        console.log(data);

        initializeHighChart();
      }
    };

    $.ajax(request);
  }

  makeAjaxRequest("https://www.quandl.com/api/v1/datasets/BTS_MM/RETAILGAS.json?auth_token=E6kNzExHjay2DNP8pKvB", newData);
  // makeAjaxRequest("my-second-url", newData2);
  // makeAjaxRequest("my-3rd-url", newData3);

  function initializeHighChart(){
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
        data: newData
      }]
    };

    $('#chart').highcharts(highchartConfig);
  }
});