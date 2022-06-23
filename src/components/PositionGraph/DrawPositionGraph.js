import * as d3 from 'd3';

const DrawPositionGraph = function(svg_id, data, time, colorScale, RADIUS) {

  // Setting up SVG
  let svg = d3.select(`#${svg_id}`)
    .attr('class', 'pull-up');

  const width = svg.style('width').slice(0, -2), // Remove px
  height = svg.style('height').slice(0, -2); // Remove px

  // d3 Scales
  let xScale = d3.scaleLinear()
    .domain([0, 1])
    .range([RADIUS, width - RADIUS]);
  let yScale = d3.scaleLinear()
    .domain([0, 1])
    .range([RADIUS, height - RADIUS]);

  let peopleCircle = svg.selectAll('.person-circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', d => d.active ? 'person-circle' : 'person-circle unselect')
    .attr('r', RADIUS)
    .attr('fill', d => colorScale(d.name.toLowerCase()))
    .attr('cy', d => {
      for (let coord of d.data) {
        if (Math.floor(coord.time) == Math.floor(time)) return yScale(coord.y);
      }
    })
    .attr('cx', d => {
      for (let coord of d.data) {
        if (Math.floor(coord.time) == Math.floor(time)) return xScale(coord.x);
      }
    });
}

export default DrawPositionGraph;