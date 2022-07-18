function tolid_specify() {
  var TESTER = document.getElementById('tolid');
  var tolid_dd = document.getElementById('tolgraph0T')
  tolid = tolid_dd.options[tolid_dd.selectedIndex].value

    var alltot = 'FALSE'
    var two = 'sum'
    var three = 'pipeline'
    var four = 'specimen'

    $.getJSON("data.json", function(data) {
      var x = []
      var y = []
      var label = []
      var c = []


      if (tolid != 'True'){
        data.forEach((item) => {
          var key = item[four] + ':' + item['specimen'] + ':' + item['well_label'] + ':' + item['run'] + ':' + item['group']
          if (item['specimen'] === tolid) {
            //console.log(item["specimen"].split("")[0]);
              // Makes three synced arrays
              // More efficient to make a JS Object but there are more changes coming.

              // Below creates a unique "key" to sort data
              if (!label.includes(key)) {
                label.push(key)
                x.push(new Date(item['date']))
                y.push(item[two])
                c.push(item[three])
              } else {
                var indx = label.indexOf(key)
                var summed = y[indx] + item['sum']
                // Below takes index, deletes item and replaces it with the summed variable.
                y.splice(indx, 1, summed)
              }
            }
        })
      } else {
        data.forEach((item) => {
          var key = item[four] + ':' + item['specimen'] + ':' + item['well_label'] + ':' + item['run'] + ':' + item['group']
          //console.log(item["specimen"].split("")[0]);
            // Makes three synced arrays
            // More efficient to make a JS Object but there are more changes coming.

            // Below creates a unique "key" to sort data
            if (!label.includes(key)) {
              label.push(key)
              x.push(new Date(item['date']))
              y.push(item[two])
              c.push(item[three])
            } else {
              var indx = label.indexOf(key)
              var summed = y[indx] + item['sum']
              // Below takes index, deletes item and replaces it with the summed variable.
              y.splice(indx, 1, summed)
            }
        })
      }

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
          xaxis: {
              title:'Run Date',
              rangeselector: { buttons: [
                      {
                          count: 1,
                          label: '1 Week',
                          step: 'week',
                          stepmode: 'backward'
                      },
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
                      {step: 'all'}
                  ]},
              rangeslider: {
                borderwidth: 2,
                bgcolor: "#d3d3d3"
              },
              type: 'date',
              // +/- 4 is purely for aesthetics
              range: [new Date(minDate.setDate(minDate.getDate() - 4)),
                      new Date(maxDate.setDate(maxDate.getDate() + 4))],
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
