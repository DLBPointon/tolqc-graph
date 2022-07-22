function species_sunburst_2(main_data) {

  // SPECIFY DATA.JSON FOR INPUT HERE
  d3.json(main_data, function (data) {

    // MODIFY DATA TO INCLUDE KINGDOM, GENUS + 'sp.'
    const datas = data.map(v => Object.assign(v, {kingdom: 'Eukaryota'}))
    datas.map(v => Object.assign(v.genus = v.genus + ' sp.'))

    // SET ORDER OF RELATIONSHIP, THESE ARE KEYS FOR data.json
    const order = ['kingdom', 'phylum', 'order', 'family', 'genus'];
    const result = [];
    const levels = {result}

    // CONVERTS data.json INTO JSON DATA TREE FORMAT BASED ON ORDER
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

    // RECURSIVE FUNCTION TO FIND LAST NODE AND ADD VALUE: 1
    // MEANS EACH UNIQUE GENUS HAS VALUE:1
    eachRecursive(result)

    var chart = anychart.sunburst(result, "as-tree");

    // parent-independent COUNTS BOTTOM UP SO THE VALUE:1 IS SUMMED
    // UP THE HIERARCHY
    chart.calculationMode("parent-independent");

    chart.container("species_sunburst_plot_2");

    // HIDES OUTTER MOST RING OF DATA
    chart.level(4).enabled(true).thickness(20)
    chart.level(3).enabled(true).thickness(100)
    chart.level(2).enabled(true).thickness()
    chart.level(1).enabled(true).thickness()
    chart.level(0).enabled(true).thickness(50)
    chart.labels().position("radial");
    chart.sort('asc')
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
