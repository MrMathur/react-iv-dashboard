import * as d3 from 'd3';

const UploadLocal = function(filename, assignment_function, filename_added = false) {
  d3.csv(filename).then(dataset => {
    if (filename_added) {
        let item = {};
        item.name = filename.slice(14, -25);
        item.data = dataset;
        assignment_function(item);
    } else {
      assignment_function(dataset);
    }
  });
}

export default UploadLocal;