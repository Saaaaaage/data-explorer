import "./styles/index.scss";
import updateChart from './scripts/update_chart';
import buildLists from './scripts/build_field_lists';
import * as d3 from "d3";



window.addEventListener("DOMContentLoaded", () => {
    const file = "../data/income.csv";

    d3.csv(file, d => d3.autoType(d)).then(rawData => {
        
        const fields = buildLists(rawData);

        sessionStorage.setItem('dimension', fields.dimensions[0]);
        sessionStorage.setItem('metric', fields.metrics[0]);
        sessionStorage.setItem('fn', 'sum');

        updateChart({
            data: rawData,
            dimension: sessionStorage.getItem('dimension'),
            metric: sessionStorage.getItem('metric'),
            fn: 'sum'
        });
    });
});