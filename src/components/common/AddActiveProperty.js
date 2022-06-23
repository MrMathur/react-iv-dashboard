import * as d3 from 'd3';


const AddActiveProperty = (dataset) => {
    for (let datum of dataset) {
      datum.active = true;
    }

    return dataset;
}


export default AddActiveProperty;