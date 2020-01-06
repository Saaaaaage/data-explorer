
export default (rawData) => {
    let dimensions = [];
    let metrics = [];
    rawData.columns.forEach(col => {
        if (!!parseInt(rawData[0][col])) {
            metrics.push(col);
        } else {
            dimensions.push(col);
        }
    });

    const dimUl = document.getElementById("dim-ul");
    const metUl = document.getElementById("met-ul");

    dimensions.forEach(dim => {
        const dimItem = document.createElement("li");
        dimItem.innerHTML = dim;
        dimItem.addEventListener("click", e => {
            Array.from(dimUl.getElementsByClassName('active')).forEach(li => {
                li.classList.remove('active');
            });
            e.target.classList.add('active');
        });
        dimUl.appendChild(dimItem);
    });

    metrics.forEach(met => {
        const metItem = document.createElement("li");
        metItem.innerHTML = met;
        metItem.addEventListener("click", e => {
            Array.from(metUl.getElementsByClassName('active')).forEach(li => {
                li.classList.remove('active');
            });
            e.target.classList.add('active');
        });
        metUl.appendChild(metItem);
    });

    return {
        metrics: metrics,
        dimensions: dimensions
    };
};