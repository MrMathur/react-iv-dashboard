import StopWordsEN from './stop_words_english.json';
import StopWordsES from './stop_words_spanish.json';

const WordDataPrep = function(dataset) {
  let data = [];
  let totalContent = '';

  for (let datum of dataset) {
    if (datum.active) totalContent += (datum.content + ' ');
  }

  let wordObj = totalContent.replace(/[.+?+!+,+-]/g, '')
    .split(/\s/)
    .reduce((map, word) =>
      Object.assign(map, {
        [word.toLowerCase()]: (map[word.toLowerCase()]) ?
          map[word.toLowerCase()] + 1 : 1,
      }), {}
    );


  Object.keys(wordObj).sort().forEach(function (word) {
    if (!StopWordsEN.includes(word.toLowerCase()) && !StopWordsES.includes(word.toLowerCase())) {
      data.push({
        word: word,
        count: wordObj[word],
        active: true
      })
    }
  });

  return data;
}

export default WordDataPrep;