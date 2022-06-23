import * as d3 from 'd3';

const InitiateSvg = (div_id, svg_id) => {
  d3.select(`#${svg_id}`).remove();

  let div = d3.select(`#${div_id}`);

  let svg  = div.append('svg').attr('id', svg_id);

  svg.attr('width', '100%')
    .attr('height', '100%');

  // // Debugging Code

  // const width = svg.style('width').slice(0, -2), // Remove px
  //   height = svg.style('height').slice(0, -2); // Remove px

  // svg.append('rect')
  //   .attr('width', '100%')
  //   .attr('height', '100%')
  //   .style('fill', 'pink');
}

export default InitiateSvg;