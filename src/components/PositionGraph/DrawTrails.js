import * as d3 from 'd3';
import { daDK } from 'rsuite/esm/locales';

const DrawTrails = function(svg_id, data, colorScale, RADIUS) {

  // Setting up SVG
  let svg = d3.select(`#${svg_id}`);

  const width = svg.style('width').slice(0, -2), // Remove px
  height = svg.style('height').slice(0, -2); // Remove px

  // d3 Scales
  let xScale = d3.scaleLinear()
    .domain([0, 1])
    .range([RADIUS, width - RADIUS]);
  let yScale = d3.scaleLinear()
    .domain([0, 1])
    .range([RADIUS, height - RADIUS]);

  for (let datum of data) {
    datum.data = datum.data.sort((a,b) => a.time - b.time);
  }

  let trail = svg.selectAll('.trail')
    .data(data)
    .enter()
    .append('path')
    .attr('class', d => d.active ? 'trail' : 'trail unselect')
    .attr("fill", 'none')
    .attr("stroke", d => {
      return colorScale(d.name);
    })
    .attr("stroke-width", 1)
    .datum(d => d.data)
    .attr("d", d3.line()
      .x(function (d) {
        return xScale(d.x)
      })
      .y(function (d) {
        return yScale(d.y)
      })
    )
    .attr('opacity', 0.8);

}

export default DrawTrails;