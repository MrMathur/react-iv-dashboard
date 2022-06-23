const FilterPeople = function(dataset, peopleToFilter, status) {
  if (status) {
    for (let person of dataset) {
      person.active = false;
    }
    for (let person of peopleToFilter) {
      let dataItem = dataset.filter(d => d.name.toLowerCase() == person.toLowerCase());

      if (dataItem.length) {
        for (let datum of dataItem) {
          datum.active = true;
        }
      }      
      
    }
  } else {
    for (let person of dataset) {
      person.active = true;
    }
  }

  return dataset;
}

export default FilterPeople;