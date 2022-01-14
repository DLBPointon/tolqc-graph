TESTER = document.getElementById('dategraphLoc');

function dategrapher() {

    var alltot = document.getElementById('tolgraph1T');
    alltot = alltot.options[alltot.selectedIndex].value
    var two = document.getElementById('tolgraph1Y');
    two = two.options[two.selectedIndex].value
    var three = document.getElementById('tolgraph1C');
    three = three.options[three.selectedIndex].value
    var four = document.getElementById('tolgraph1L');
    four = four.options[four.selectedIndex].value

    $.getJSON("data.json", function(data) {
      //console.log(data)
      var x = []
      var y = []
      var label = []
      var c = []

      if (alltot === 'TRUE') {
        data.forEach((item) => {
          x.push(item['date']);
          if (two === 'n') {
            y.push((item[two] / item['sum']) * 100)
          } else if (two === 'a') {
            y.push(((item[two] + item['t']) / item['sum']) * 100)
          } else {
            y.push(item[two])
          }
          c.push(item[three]);
          label.push(item[four])
        })
      } else if (alltot === 'FALSE'){
        data.forEach((item) => {
          if (item['pipeline'] === 'PacBio - HiFi') {
            // Makes three synced arrays
            // More efficient to make a JS Object but there are more changes coming.

            // Below creates a unique "key" to sort data
            if (!label.includes(item['specimen'] + ':' + item['well_label'] + ':' + item['run'] + ':' + item['group'])) {
              console.log(item['specimen'] + ':' + item['well_label'] + ':' + item['run'] + ':' + item['group'])
              label.push(item['specimen'] + ':' + item['well_label'] + ':' + item['run'] + ':' + item['group'])
              x.push(item['date'])
              y.push(item['sum'])
              if (item['specimen'] === 'mMelMel3'){
                c.push('XXX')
              } else {
                c.push(item['well_label'])
              }

              // For debugging
              //if (item['well_label'] + ' In Run: ' + item['run'] === 'C01 In Run: 83500') {
              //  console.log('First -- '+ item['sum'])
              //}
            } else {
              var indx = label.indexOf(item['specimen'] + ':' + item['well_label'] + ':' + item['run'] + ':' + item['group'])
              //if (item['well_label'] + ' In Run: ' + item['run'] === 'C01 In Run: 83500') {
              //  console.log('Old ' + y[indexxer])
              //  console.log("new " +item['sum'])
              //  var sumed = y[indexxer] + item['sum']
              //  console.log('Sum? ' + sumed)
              //}
              let summed = y[indx] + item['sum']
              // Below takes index, deletes item and replaces it with the summed variable.
              y.splice(indx, 1, summed)
              // For debugging: set the end of the condition to your search term to check the number
              // of results and there sum
              //if (item['well_label'] + ' In Run: ' + item['run'] === 'C01 In Run: 83500') {
              //  console.log('Another reading: ' + item['sum'])
              //  console.log('Summed: ' + y[indexxer])
              //  console.log(y[indexxer])
              //}
            }
          }
              // Per cell = total well per run - coloured by well | should be around 30GB per well
        })
      }
        console.log(x.length) // dates
        console.log(y.length) // data points

      var trace1 = {
          type: 'scatter',
          mode: 'markers',
          x: x,
          y:y,
          text: label,
          transforms: [{
              type: 'groupby',
              groups: c
          }]
      };

      var datas = [trace1]

      var elmntdg = document.getElementById("dategraphLoc").clientWidth - 30

      var layout = {
          title: 'Time Series of with Rangeslider',
          xaxis: {
              title:'Date of Ticket creation',
              autorange: true,
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
                  autorange: true
              },
              type: 'date'
          },
          yaxis: {
              autorange: true
          },
          width: elmntdg
      };

      var config = {responsive: true, displayModeBar: true}
      Plotly.newPlot('dategraphLoc', datas, layout, config);
      });


}
