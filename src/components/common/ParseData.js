const ParseData = function(results) {
  let newData = [];
  let dataProps = results.data[0];

  for (let i = 1; i < results.data.length; i++) {
    let dataItem = {};
    for (let j = 0; j < dataProps.length; j++) {
      dataItem[dataProps[j]] = results.data[i][j];
    }
    newData.push(dataItem);
  }

  return newData;
}

export default ParseData;