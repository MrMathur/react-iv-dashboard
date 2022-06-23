import * as d3 from 'd3';


const LegendDataPrep = (trancsript) => {
    let people = d3.group(trancsript, d => d.name);  
  
    let data = [];
  
    for (let person of people) {
      let legendItem = {};
  
      legendItem.name = person[0];
      legendItem.wordCount = 0;
      legendItem.active = true;
      for (let turnOfTalk of person[1]) {
        legendItem.wordCount += turnOfTalk.content.split(/[, ]+/).length;
      }
  
      data.push(legendItem);
    }
  
    return data;
}


export default LegendDataPrep;