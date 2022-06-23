const WordDataPrep = function(dataset) {
  let data = [];
  let totalContent = '';

  for (let datum of dataset) {
    if (datum.active) totalContent += (datum.content + ' ');
  }

  let wordObj = totalContent.replace(/[.]/g, '')
    .split(/\s/)
    .reduce((map, word) =>
      Object.assign(map, {
        [word]: (map[word]) ?
          map[word] + 1 : 1,
      }), {}
    );


  Object.keys(wordObj).sort().forEach(function (word) {
    data.push({
      word: word,
      count: wordObj[word],
      active: true
    })
  });

  return data;
}

export default WordDataPrep;