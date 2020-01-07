import drawChart from './chart';
import aggregateData from './aggregate_data';


export default options => {
    let aggData = aggregateData(options);
    
    options.data = aggData;
    
    drawChart(options);
};