import updateChart from './update_chart';
import buildLists from './build_field_lists';
import getOptions from './get_options';
import * as d3 from "d3";

export default file => {
    d3.csv(file, d => d3.autoType(d)).then(rawData => {
        window.DataExplorer = {};
        DataExplorer.rawData = rawData;

        // Construct Dimension and Metric lists
        buildLists(rawData);

        // Get currently selected options from Dim/Met lists
        let options = getOptions();

        // Aggregate data per options object, and build the D3.js chart
        updateChart(options);
    });
};