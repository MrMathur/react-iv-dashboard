import * as d3 from 'd3';

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


    let time = Math.floor(pixelToTime(coords[0]));

    d3.select('#video-cursor')
      .attr('cx', xScale(time));

    setPlaybackTime(time);

  });

  svg.append('circle')
    .attr('r', RADIUS)
    .attr('id', 'video-cursor')
    .attr('fill', 'blue')
    .attr('cx', xScale(time))
    .attr('cy', height/2);
}

export default DrawTimelineGraph;