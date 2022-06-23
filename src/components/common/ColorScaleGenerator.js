import * as d3 from 'd3';

const ColorScaleGenerator = function(dataset) {

  // const colors = [
  //   '#42335c',
  //   '#683a6b',
  //   '#913e71',
  //   '#b9436e',
  //   '#db4f61',
  //   '#f3654e',
  //   '#ff8333',
  //   '#ffa600'
  // ];

  let colorScale = d3.scaleOrdinal()
    .domain(dataset.map(d => d.name.toLowerCase()))
    .range(d3.schemeSet3);

  return colorScale;

}

export default ColorScaleGenerator;