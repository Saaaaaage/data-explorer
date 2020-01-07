

export default options => {
    // sum, average, min, max
    const { data, dimension, metric, fn } = options;
    const staging = {};
    
    data.forEach(row => {
        let dimValue = row[dimension];
        let collectedValues = staging[dimValue] || [];
        collectedValues.push(row[metric]);
        staging[dimValue] = collectedValues;
    });

    let aggData = [];
    Object.keys(staging).forEach((key, i) => {
        switch (fn) {
            case "sum":
                aggData.push({
                    [dimension]: key,
                    [metric]: staging[key].reduce((a, b) => a + b, 0)
                });
                break;
            case "average":
                aggData.push({
                    [dimension]: key,
                    [metric]: (staging[key].reduce((a, b) => a + b, 0))/staging[key].length
                });
                break;
            case "min":
                aggData.push({
                    [dimension]: key,
                    [metric]: Math.min(...staging[key])
                });
                break;
            case "max":
                aggData.push({
                    [dimension]: key,
                    [metric]: Math.max(...staging[key])
                });
                break;
            default:
                break;
        }
    });

    console.log(aggData);
    return aggData.sort((a, b) => {
        return b[metric] - a[metric];
    });
};