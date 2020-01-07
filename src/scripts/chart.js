import * as d3 from "d3";

export default (options) => {
    const { data, dimension, metric, fn } = options;

    // Width and height of SVG
    const width = 500;
    const height = 500;
    const margin = { top: 20, right: 20, bottom: 100, left: 100 };
    const location = '#chart';

    // Get length of dataset
    // const arrayLength = data.length; // length of dataset
    // const maxValue = d3.max(data, function (d) { return +d[metric]; }); // get maximum
    // const x_axisLength = width - (margin.left + margin.right); // length of x-axis in our layout
    // const y_axisLength = height - (margin.top + margin.bottom); // length of y-axis in our layout
    // const barWidth = (x_axisLength / arrayLength) - 1;

    const x = d3.scaleBand()
        .domain(d3.range(data.length))
        .range([margin.left, width - margin.right])
        .padding(0.1);
    
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d[metric])]).nice()
        .range([height - margin.bottom, margin.top]);

    const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat(i => data[i][dimension]).tickSizeOuter(0))

    const yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call(g => g.select(".domain").remove());

    const svg = d3.create("svg")
        .attr("viewBox", [0, 0, width, height]);

    // Remove any existing SVG
    d3.select("svg").remove();

    // Add the new SVG
    d3.select(location).append(() => svg.node());

    svg.append("g")
            .attr("fill", "steelblue")
        .selectAll("rect")
        .data(data)
        .join("rect")
            .attr("x", (d, i) => x(i))
            .attr("y", d => y(0))
            .attr("height", d => y(0) - y(0))
            .attr("width", x.bandwidth());

    svg.append("g")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");

    svg.append("g")
        .call(yAxis);

    // Transition from 0 height to data height
    svg.selectAll("rect")
        .transition()
        .duration(800)
        .attr("y", d => y(d[metric]))
        .attr("height", d => y(0) - y(d[metric]))
        .delay(function (d, i) { console.log(i); return (i * 100); });
    
    // Use a scale for the height of the visualization
    // const yScale = d3.scaleLinear()
    //     .domain([0, maxValue])
    //     .range([0, y_axisLength]);

    // // Remove any existing SVG
    // d3.select("svg").remove();

    // // Create fresh SVG element
    // const svg = d3.select(location)
    //     .append("svg")
    //     .attr("width", width)
    //     .attr("height", height)
    //     .attr("class", "chart");

    // // define the y axis
    // var yAxis = d3.axisLeft(yScale);

    // svg.append("g")
    //     .attr("class", "axis")
    //     .attr("transform", "translate(" + margin.left + ",0)")
    //     .call(yAxis);

    // // Select and generate rectangle elements
    // svg.selectAll("rect")
    //     .data(data)
    //     .enter()
    //     .append("rect")
    //     .attr("x", function (d, i) {
    //         return i * (x_axisLength / arrayLength) + margin.left; // Set x coordinate of rectangle to index of data value (i) *25
    //     })
    //     .attr("y", function (d) {
    //         return height - yScale(0) - margin.bottom; // Set y coordinate of rect using the y scale
    //     })
    //     .attr("width", barWidth)
    //     .attr("height", function (d) {
    //         return yScale(0); // Set height of using the scale
    //     })
    //     .attr("fill", "steelblue");

    // // Transition from 0 height to data height
    // svg.selectAll("rect")
    //     .transition()
    //     .duration(800)
    //     .attr("y", function (d) {
    //         return height - yScale(d[metric]) - margin.bottom; // Set y coordinate of rect using the y scale
    //     })
    //     .attr("height", function (d) {
    //         return yScale(d[metric]); // Set height of using the scale
    //     })
    //     .delay(function (d, i) { console.log(i); return (i * 100); });

    // // Generate bar labels
    // svg.selectAll("text")
    //     .data(data)
    //     .enter()
    //     .append("text")
    //     .attr("class", "x-label")
    //     .attr("text-anchor", "end")
    //     .attr("x", (d, i) => {
    //         return i * (x_axisLength / arrayLength) + margin.left + barWidth/2; // Set x coordinate of rectangle to index of data value (i) *25
    //     })
    //     .attr("y", d => {
    //         return height - margin.bottom; // Set y coordinate of rect using the y scale
    //     })
    //     .attr("dy", ".75em")
    //     .text(function (d) { return d[dimension]; });
    


    // // Create y-axis
    // svg.append("line")
    //     .attr("x1", 30)
    //     .attr("y1", 75)
    //     .attr("x2", 30)
    //     .attr("y2", 175)
    //     .attr("stroke-width", 2)
    //     .attr("stroke", "black");

    // // Create x-axis
    // svg.append("line")
    //     .attr("x1", 30)
    //     .attr("y1", 175)
    //     .attr("x2", 130)
    //     .attr("y2", 175)
    //     .attr("stroke-width", 2)
    //     .attr("stroke", "black");

    // // y-axis label
    // svg.append("text")
    //     .attr("class", "y-label")
    //     .attr("text-anchor", "end")
    //     .text(`${metric}`)
    //     .attr("transform", "translate(20, 20) rotate(-90)")
    //     .attr("font-size", "14")
    //     .attr("font-family", "'Open Sans', sans-serif");
};