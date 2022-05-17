function species_sunburst_2() {

  var sb_plot = document.getElementById('species_sunburst_plot_2');


  // SPECIFY DATA.JSON FOR INPUT HERE
  d3.json("data_main.json", function (data) {
    var data_tree = []
    const datas = data.map(v => Object.assign(v, {kingdom: 'Eukaryota'}))
    datas.map(v => Object.assign(v.genus = v.genus + ' sp.'))
    datas.map(v => Object.assign(v, {value: 1}))
    console.log(data)

    const order = ['kingdom', 'phylum', 'order', 'family', 'genus'];
    const result = [];
    const levels = {result}

    datas.forEach(o => {
      order.reduce((r, e) => {
        const name = o[e];
        if (!r[name]) {
          const value = {name, children: []}
          r[name] = {result: value.children}
          r.result.push(value)
        }
        return r[name]

      }, levels)
    })

    eachRecursive(result)

    var chart = anychart.sunburst(result, "as-tree");
    chart.calculationMode("parent-independent");

    // set the container id
    chart.container("species_sunburst_plot_2");
    chart.sort('desc')
    chart.level(4).enabled(false)
    // initiate drawing the chart
    chart.draw();
  })
}

function eachRecursive(obj) {
  for (var k in obj) {
    if (typeof obj[k] == "object" && obj[k] !== null) {
        eachRecursive(obj[k]);
    } else {
      obj.value = 1
    }
  }
}
