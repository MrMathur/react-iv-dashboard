import * as d3 from 'd3';

const ColorScaleGenerator = function(dataset) {

  const colors = [
    '#AFC5DA', '#407EB6', '#B8CD96', '#559244', '#EBA8A1', '#DA4C37', '#EBBF80', '#EC9036', '#C4B7D0', '#74599E', '#E9C715', '#000000'
  ];

  let colorScale = d3.scaleOrdinal()
    .domain(dataset.map(d => d.name.toLowerCase()))
    // .range(d3.schemeSet3);
    .range(d3.shuffle(colors));
  return colorScale;

}

export default ColorScaleGenerator;