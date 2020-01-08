import updateChart from './update_chart';
import buildLists from './build_field_lists';
import getOptions from './get_options';
import * as d3 from "d3";

export default file => {
    d3.csv(file, d => d3.autoType(d)).then(rawData => {
        window.DataExplorer = {};
        DataExplorer.rawData = rawData;

        buildLists(rawData);

        let options = getOptions();

        updateChart(options);
    });
};