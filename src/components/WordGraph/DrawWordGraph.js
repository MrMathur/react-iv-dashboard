import * as d3 from 'd3';
import d3Cloud from "d3-cloud";

const DrawWordGraph = function(svg_id, data) {
  // Setting up SVG
  let svg = d3.select(`#${svg_id}`);

  const width = svg.style('width').slice(0, -2), // Remove px
  height = svg.style('height').slice(0, -2); // Remove px

  // d3 Scales
  let fontScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.count))
    .range([6, 30]);

  // Draw cloud
  let layout = d3Cloud()
    .size([width, height])
    .words(data)
    .padding(5) //space between words
    .rotate(function () {
      return ~~(Math.random() * 2) * 90;
    })
    .fontSize(function (d) {
      return fontScale(d.count);
    }) // font size of words
    .on("end", words => {
      svg
        .append("g")
        .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
        .selectAll(".wordCloudText")
        .data(words)
        .enter()
        .append("text")
        .attr('class', 'wordCloudText')
        .attr("id", d => d.word.toLowerCase())
        .style("font-size", function (d) {
          return d.size;
        })
        .style("fill", "grey")
        .attr('opacity', 0.5)
        .attr("text-anchor", "middle")
        .style("font-family", "Impact")
        .attr("transform", function (d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function (d) {
          return d.word;
        });
    });


  layout.start();
}

export default DrawWordGraph;