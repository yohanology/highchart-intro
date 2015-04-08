$(document).ready(function(){

  function getData(data, url){
    $.ajax({
      type: 'GET',
      url: url,
      dataType: 'JSON',
      success: function(response){
        console.log(response);

        // this is how I loop it to get all temperatures
        $(response.data).each(function(){
          // collect each data point 
          var dataPoint = {};

          dataPoint.x = new Date(this[0]);
          dataPoint.y = this[1];

          // add each data point to the data array
          data.unshift(dataPoint);
        })

        // print out data
        console.log(data);

        initializeHighChart();
      },
      error: function(){
        alert("cannot connect");
      }
    });
  }

  // data is an array
  var data = [];
  var url = 'https://www.quandl.com/api/v1/datasets/BTS_MM/RETAILGAS.json?trim_start=1995-01-02&trim_end=2012-10-15&auth_token=E6kNzExHjay2DNP8pKvB';
  getData(data, url);

  function initializeHighChart(){
    $('#chart').highcharts({
      // key: value
      title: {
        text: 'Average retail gas prices'
      },
      subtitle: {
        text: 'Bureau of Transportation Statistics (Multimodal)'
      },
      xAxis: {
        // Configuration of xAxis
        type: 'datetime',
        dateTimeLabelFormats: {
            millisecond: '%H:%M:%S.%L',
            second: '%H:%M:%S',
            minute: '%H:%M',
            hour: '%H:%M',
            day: '%e. %b',
            week: '%e. %b',
            month: '%b \'%y',
            year: '%Y'
        }
      },
      yAxis: {
        // Configuration of yAxis
        // min: 250,
        // max: 300,
        title: {
            text: 'Price ($)'
        }
      },
      legend: {
        // Configuration of Legends
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
      },
      series: [{
        // Data points
        name: 'US',
        data: data
      }]
    });
  }

});