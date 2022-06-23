import * as d3 from 'd3';

const DrawLegendGraph = function(svg_id, data, addToFilter, removeFromFilter, filterActive, colorScale) {

  data = data.sort((a,b) => b.wordCount - a.wordCount);

  // Setting up SVG
  let peopleCount = data.length;
  let svg = d3.select(`#${svg_id}`);
  

  const width = svg.style('width').slice(0, -2); // Remove px

  // d3 Scales
  let rScale = d3.scaleSqrt()
    .domain([0, d3.max(data, d => d.wordCount)])
    .range([0, width/2]);

  const PADDING = 30, NAME_PADDING = 2;

  let height = 0;
  for (let d of data) {
    height += (2 * rScale(d.wordCount) + PADDING);
  }

  svg.attr('height', height);

  let currentY = 0;

  let groups = svg.selectAll('.words')
    .data(data)
    .enter()
    .append('g')
    .attr('transform', d => {
      let outputposition = `translate(${width/2}, ${currentY})`;
      currentY += (2 * rScale(d.wordCount) + PADDING);
      return outputposition;
    })
    .classed('unselect', d => !d.active);

  groups.append('circle')
    .attr('r', d => rScale(d.wordCount))
    .attr('class', 'word-circle')
    .attr('fill', d => colorScale(d.name.toLowerCase()))
    .attr('cy', d => rScale(d.wordCount));
    

  groups.append('text')
    .text(d => {
      let name = d.name.charAt(0).toUpperCase() + d.name.slice(1);
      return name;
    })
    .attr('class', 'words')
    .attr('text-anchor', 'middle')
    .attr('transform', d => `translate(0,${2 * rScale(d.wordCount) + NAME_PADDING})`);

  groups.on('click', function(e,d) {
    
    if (!filterActive) {
      addToFilter(d.name);
    } else {
      if (d.active) {
        removeFromFilter(d.name);
      } else {
        addToFilter(d.name);
      }
    }
  });
}

export default DrawLegendGraph;