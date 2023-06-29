function tolid_specify(pacbio_data) {
  var tolid_dd = document.getElementById('tolgraph0T')
  tolid = tolid_dd.options[tolid_dd.selectedIndex].value
  var detailed = document.getElementById('datadetailed');
  detailed_data = detailed.options[detailed.selectedIndex].value

    var two = 'sum'
    var four = 'specimen'

    $.getJSON(pacbio_data, function(data) {
      var x = []
      var y = []
      var label = []
      var c = []
      var key = []

      if (detailed_data == "TRUE"){
        data.forEach((item) => {
          var key = item[four] + ':' + item['well_label'] + ':' + item['run'] + ':' + item['group']
          //console.log(item["specimen"].split("")[0]);
            // Makes three synced arrays
            // More efficient to make a JS Object but there are more changes coming.

            // Below creates a unique "key" to sort data
            if (!label.includes(key)) {
              label.push(key)
              x.push(new Date(item['date']))
              y.push(item[two])
              if ( item['pipeline'].includes('_') ){
                var model = item['pipeline'].split('_')[1]
              } else {
                var model = item['pipeline'].split(' - ')[1]
              }
              if ( item["model"] == undefined ) {
                c.push(model)
              } else {
                c.push(item["model"])
              }
            } else {
              var indx = label.indexOf(key)
              var summed = y[indx] + item['sum']
              // Below takes index, deletes item and replaces it with the summed variable.
              y.splice(indx, 1, summed)
            }
        })
      } else {
        data.forEach((item) => {
          var key = item[four] + ':' + item['well_label'] + ':' + item['run'] + ':' + item['group']
          //console.log(item["specimen"].split("")[0]);
            // Makes three synced arrays
            // More efficient to make a JS Object but there are more changes coming.

            // Below creates a unique "key" to sort data
            if (!label.includes(key)) {
              label.push(key)
              x.push(new Date(item['date']))
              y.push(item[two])
              if ( item['pipeline'].includes('_') ){
                var model = item['type'].charAt(0).toUpperCase()+item['type'].slice(1) + '-' + item['pipeline'].split('_')[1]
              } else {
                var model = item['type'].charAt(0).toUpperCase()+item['type'].slice(1) + '-' + item['pipeline'].split(' - ')[1]
              }
              if ( item["model"] == undefined ) {
                c.push(model + '- Durbin Project')
              } else {
                c.push(model + '-' + item["model"])
              }
            } else {
              var indx = label.indexOf(key)
              var summed = y[indx] + item['sum']
              // Below takes index, deletes item and replaces it with the summed variable.
              y.splice(indx, 1, summed)
            }
        })
      }
      console.log(c)
      var maxDate=new Date(Math.max.apply(null,x));
      var minDate=new Date(Math.min.apply(null,x));

      //console.log("Colour array:  " + c.length)
      //console.log("X array:       " + x.length)
      //console.log("Y array:       " + y.length) // data points

      document.getElementById("datacounted").innerText=x.length

      var trace1 = {
          type: 'scatter',
          mode: 'markers',
          x: x,
          y: y,
          text: label,
          transforms: [{
              type: 'groupby',
              groups: c
          }]
      };

      var datas = [trace1]

      var elmntdg = document.getElementById("tolid").clientWidth - 30

      var layout = {
          title: 'Time Series for Pacbio Yields',
          showlegend: true,
          legend: {
            x: 1,
            y: 0.5
          },
          xaxis: {
              title:'Run Date',
              rangeselector: { buttons: [
                      {
                          count: 1,
                          label: '1 Month',
                          step: 'month',
                          stepmode: 'backward'
                      },
                      {
                          count: 6,
                          label: '6 Months',
                          step: 'month',
                          stepmode: 'backward'
                      },
                      {
                          count: 1,
                          label: '1 Year',
                          step: 'year',
                          stepmode: 'backward'
                      },
                      {
                        count: 2,
                        label: '2 Year',
                        step: 'year',
                        stepmode: 'backward'
                      },
                      {step: 'all'}
                  ]},
              rangeslider: {
                borderwidth: 2,
                bgcolor: "#d3d3d3"
              },
              type: 'date',
              // +/- 4 is purely for aesthetics
              range: ["2019-09-20",
                      new Date(maxDate.setDate(maxDate.getDate() + 10))],
              tickwidth: 1
          },

          yaxis: {
              autorange: true,
          },
          width: elmntdg,
      };

      var config = {responsive: true, displayModeBar: true}
      Plotly.newPlot('tolid', datas, layout, config);
    })
  }
