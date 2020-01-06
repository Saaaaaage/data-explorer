import * as d3 from "d3";

export default (options) => {
    const { data, dimension, metric, fn } = options;


    // Width and height of SVG
    const w = 500;
    const h = 500;
    const sides = 50;
    const topbottom = 50;
    const location = '#chart';

    // Get length of dataset
    var arrayLength = data.length; // length of dataset
    var maxValue = d3.max(data, function (d) { return +d[metric]; }); // get maximum
    var x_axisLength = w - (sides * 2); // length of x-axis in our layout
    var y_axisLength = h - (topbottom * 2); // length of y-axis in our layout
    const barWidth = (x_axisLength / arrayLength) - 1;

    // Use a scale for the height of the visualization
    var yScale = d3.scaleLinear()
        .domain([0, maxValue])
        .range([0, y_axisLength]);

    //Create SVG element
    var svg = d3.select(location)
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("class", "chart");

    // Select and generate rectangle elements
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d, i) {
            return i * (x_axisLength / arrayLength) + sides; // Set x coordinate of rectangle to index of data value (i) *25
        })
        .attr("y", function (d) {
            return h - yScale(d[metric]) - topbottom; // Set y coordinate of rect using the y scale
        })
        .attr("width", barWidth)
        .attr("height", function (d) {
            return yScale(d[metric]); // Set height of using the scale
        })
        .attr("fill", "steelblue");

    // Create y-axis
    svg.append("line")
        .attr("x1", 30)
        .attr("y1", 75)
        .attr("x2", 30)
        .attr("y2", 175)
        .attr("stroke-width", 2)
        .attr("stroke", "black");

    // Create x-axis
    svg.append("line")
        .attr("x1", 30)
        .attr("y1", 175)
        .attr("x2", 130)
        .attr("y2", 175)
        .attr("stroke-width", 2)
        .attr("stroke", "black");

    // y-axis label
    svg.append("text")
        .attr("class", "y-label")
        .attr("text-anchor", "end")
        .text(`${metric}`)
        .attr("transform", "translate(20, 20) rotate(-90)")
        .attr("font-size", "14")
        .attr("font-family", "'Open Sans', sans-serif");

    svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "x-label")
        .attr("text-anchor", "end")
        .attr("x", (d, i) => {
            return i * (x_axisLength / arrayLength) + sides + barWidth/2; // Set x coordinate of rectangle to index of data value (i) *25
        })
        .attr("y", d => {
            return h - topbottom; // Set y coordinate of rect using the y scale
        })
        .attr("dy", ".75em")
        .text(function (d) { return d[dimension]; });
};