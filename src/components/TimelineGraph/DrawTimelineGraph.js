import * as d3 from 'd3';

// Drawing the Cursor
function DrawCursor(svg, xScale, time, type) {

  let color = (type == 'video-cursor') ? '#171717' : '#F0F0F0';

  svg.select(`#${type}`).remove();

  let height = svg.style('height').substring(0, svg.style('height').length - 2);

  let video_cursor = svg.append('g')
  .attr('id', type)
  .attr('transform', `translate(${xScale(time)}, 0)`);

  // Drawing the line
  video_cursor.append('line')
  .style("stroke", color)
  .style("stroke-width", 1)
  .attr("x1", 0)
  .attr("y1", 0)
  .attr("x2", 0)
  .attr("y2", height); 

  // Drawing the triangles
  const triangleSize = 25;

  var triangle = d3.symbol()
    .type(d3.symbolTriangle)
    .size(triangleSize);

  video_cursor.append("path")
    .attr("d", triangle)
    .attr("stroke", color)
    .attr("fill", color)
    .attr("transform", `translate(0,3) rotate(180)`);

  video_cursor.append("path")
    .attr("d", triangle)
    .attr("stroke", color)
    .attr("fill", color)
    .attr("transform", `translate(0,${height - 3})`);
}

const DrawTimelineGraph = function(svg_id, data, videoLen, time, colorScale, setPlaybackTime) {
  // Setting up SVG
  let svg = d3.select(`#${svg_id}`);

  const width = svg.style('width').slice(0, -2), // Remove px
  height = svg.style('height').slice(0, -2); // Remove px

  const RADIUS = 5;

  // d3 Scales
  let xScale = d3.scaleLinear()
    .domain([0, videoLen])
    .range([RADIUS, width - RADIUS]);

  let pixelToTime = d3.scaleLinear()
    .domain([RADIUS, width - RADIUS])
    .range([0, videoLen]);

  let yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.wordCount)])
    .range([0, height/2]);
  
  // Draw ellipses
  let ellipse = svg.selectAll('.dialogues')
    .data(data)
    .enter()
    .append('ellipse')
    .attr('class',  d => d.active ? 'dialogues' : 'dialogues unselect')
    .attr('cx', d => xScale(d.time))
    .attr('cy', height/2)
    .attr('rx', d => xScale(d.duration)/2)
    .attr('ry', d => yScale(d.wordCount))
    .attr('fill', d => colorScale(d.name.toLowerCase()))
    .attr('opacity', 0.8);

  ellipse.on('mouseover', (e,d) => {
    let name = d.name.charAt(0).toUpperCase() + d.name.slice(1);
    svg.append('text')
      .text(`${name}: ${d.content}`)
      .attr('id', 'dialogue-text')
      .attr('cursor', 'pointer')
      .attr('text-anchor', 'middle')
      .attr('transform', `translate(${width/2}, ${3 * height / 4})`);
  })
  .on('mouseout', () => {
    d3.selectAll('#dialogue-text').remove();
  });

  d3.select('#x-axis').remove();
  
  // X Axis
  svg.append("g")
  .attr('id', 'x-axis')
  .attr("transform", `translate(0, ${height/2})`)      // This controls the vertical position of the Axis
  .call(d3.axisBottom(xScale));


  svg
  .attr('class', 'hover-cursor')
  .on('click', e => {
    let coords = d3.pointer(e);

    let time = (pixelToTime(coords[0]));

    DrawCursor(svg, xScale, time, 'video-cursor');
    setPlaybackTime(time);
  });

  // Adding Video Cursor
  DrawCursor(svg, xScale, time, 'video-cursor');
}

export default DrawTimelineGraph;