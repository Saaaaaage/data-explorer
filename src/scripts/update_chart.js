import drawChart from './drawChart';
import aggregateData from './aggregate_data';


export default options => {
    // Aggregate data per the current selections
    let aggData = aggregateData(options);
    
    // Update the options object
    options.data = aggData;
    
    // Draw the D3.js chart per the options object
    drawChart(options);
};