const TimelineDataPrep = function(dataset) {
  let data = [];
  for (let datum of dataset) {
    let turnOfTalk = {};

    turnOfTalk.name = datum.name;
    turnOfTalk.time = (parseFloat(datum.start_time) + parseFloat(datum.end_time)) / 2;
    turnOfTalk.duration = parseFloat(datum.end_time) - parseFloat(datum.start_time);
    turnOfTalk.content = datum.content;
    turnOfTalk.wordCount = datum.content.split(/[, ]+/).length;
    turnOfTalk.active = true;

    data.push(turnOfTalk);
  }

  return data;
}

export default TimelineDataPrep;