var TESTER = document.getElementById('dategraphLoc');

const master_dict = {
'a': 'Amphibia',
'b': 'Bird',
'c': 'Non-vascular plants',
'C': 'Insects', // To Account for Durbin Project Code
'd': 'Dicotyledons',
'e': 'Echinoderms',
'f': 'Fish',
'g': 'Fungi',
'h': 'Platyhelminths',
'i': 'Insects',
'j': 'Jellyfish and Cnidaria',
'k': 'Other Chordates',
'l': 'Monocotyledons',
'm': 'Mammal',
'n': 'Nematodes',
'o': 'Sponges',
'p': 'Protists',
'q': 'Other Arthropods',
'r': 'Reptile',
's': 'Shark',
't': 'Other Animal Phyla',
'u': 'Algae',
'v': 'Other Vascular Plants',
'w': 'Annelids',
'x': 'Molluscs',
'y': 'Bacteria',
'z': 'Archae'
}

function dategrapher(pacbio_data) {
    var alltot = document.getElementById('tolgraph1T');
    alltot = alltot.options[alltot.selectedIndex].value
    var two = document.getElementById('tolgraph1Y');
    two = two.options[two.selectedIndex].value
    var three = document.getElementById('tolgraph1C');
    three = three.options[three.selectedIndex].value
    var four = document.getElementById('tolgraph1L');
    four = four.options[four.selectedIndex].value

    $.getJSON(pacbio_data, function(data) {
      var x = []
      var y = []
      var label = []
      var c = []
      var key = []
      if (alltot === 'TRUE') {
        data.forEach((item) => {
          x.push(new Date(item['date']));
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
          var key_val = item['well_label'] + ':' + item['run'] + ':' + item['movie'] +':' + item['group']

          if (item['pipeline'] !== "PacBio - CLR") {
            // Makes three synced arrays
            // More efficient to make a JS Object but there are more changes coming.

            // Below creates a unique "key" to sort data
            if (!key.includes(key_val)) {

              key.push(key_val)
              label.push(item['specimen'] + ':' + item['well_label'] + ':' + item['run'] + ':' + item['movie'])
              x.push(new Date(item['date']))
              y.push(item[two])

              if (three === "Clade") {
                c.push(master_dict[item["specimen"].split("")[0]])
              } else {
                c.push(item[three])
              }

            } else {
              var indx = key.indexOf(key_val)
              var summed = y[indx] + item['sum']
              var new_label = item['specimen'] + ':' + label[indx]
              // Below takes index, deletes item and replaces it with the summed variable.
              y.splice(indx, 1, summed)
              label.splice(indx, 1, new_label)
            }
          }
        })
      }

      var maxDate=new Date(Math.max.apply(null,x));
      var minDate=new Date(Math.min.apply(null,x));

      if ( c.length === x.length & c.length === y.length ) {
        console.log("Yield Against Time Graph: Colour array matches data arrays (x, y) == data is good")
      } else {
        console.log("Yield Against Time Graph: Colour array length does not match amount of data in x and y arrays == data is bad")
      }

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

      var elmntdg = document.getElementById("dategraphLoc").clientWidth - 30

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
      Plotly.newPlot('dategraphLoc', datas, layout, config);
    })
  }
