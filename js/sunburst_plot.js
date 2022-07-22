function species_sunburst(main_data) {

  var sb_plot = document.getElementById('species_sunburst_plot');

  // INITIAL DATA STRUCTURE AS NOT SPECIFIED IN data_main.json
  var label_data = ["Eukaryota"]

  var parent_data = [""]

  var values = []

  // SPECIFY DATA.JSON FOR INPUT HERE
  d3.json(main_data, function (data) {
    for (var i = 0; i < data.length; i++) {

      if (!label_data.includes(data[i].phylum)) {
        label_data.push(data[i].phylum)
        parent_data.push("Eukaryota")
      };
      if (!label_data.includes(data[i].order)) {
        label_data.push(data[i].order)
        parent_data.push(data[i].phylum)
      };
      if (!label_data.includes(data[i].family)) {
        label_data.push(data[i].family)
        parent_data.push(data[i].order)
      };
      if (!label_data.includes(data[i].genus + ' sp.')) {
        label_data.push(data[i].genus + ' sp.')
        parent_data.push(data[i].family)
      };
    };

    // GET UNIQUE LIST OF GENUS + "sp."
    var unique = []
    for (var i = 0; i < data.length; i++) {
      if (!unique.includes(data[i].genus + ' sp.')) {
        unique.push(data[i].genus + ' sp.')
      }
    }

    // VALUES PER GENUS = 1
    unique.forEach( x => {
      if (x.includes('sp.')) {
        values.push(1)
      } else {
        values.push(0)
      }
    })

    //console.log(label_data)
    //console.log(values)
    // DATA ORDER {DOMAIN, PHYLUM, ORDER, FAMILY, GENUS}
    // COUNT SHOULD AUTOMATICALLY ASSIGN 1 TO EACH LEAF
    // AND SUM UP THE PLOT IF NO VALUE LIST or branchvalue ASSIGNED
    var datas = [{
        maxdepth: 2,
        "type": "sunburst",
        "labels": label_data,
        "parents": parent_data,
        // values: values
        // branchvalues:"remainder"
        count:"leaves",
        "leaf": {"opacity": 0.4},
        textposition: 'inside',
        insidetextorientation: 'radial'
    }];

    var layout = {
      margin: {l: 0, r: 0, b: 10, t:0},
      sunburstcolorway:[
        "#636efa","#EF553B","#00cc96","#ab63fa","#19d3f3",
        "#e763fa", "#FECB52","#FFA15A","#FF6692","#B6E880"
      ],
      extendsunburstcolorway: true
    };

    var config = {responsive: true}
    Plotly.newPlot(sb_plot, datas, layout, config)
  })
}
