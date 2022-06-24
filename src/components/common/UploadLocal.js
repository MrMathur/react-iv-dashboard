import * as d3 from 'd3';

const START_STRING_POINT = 14;
const END_STRING_POINT = -25;
const EXTENSION = 4;

const UploadLocal = function(filename, assignment_function, filename_added = false, filename_string = null) {
  d3.csv(filename).then(dataset => {
    if (filename_added) {
        let item = {};
        console.log(filename_string)
        item.name = filename_string ? filename_string.substring(0, filename_string.length-EXTENSION) : filename.slice(START_STRING_POINT, END_STRING_POINT);
        item.data = dataset;
        assignment_function(item);
    } else {
      assignment_function(dataset);
    }
  });
}

export default UploadLocal;