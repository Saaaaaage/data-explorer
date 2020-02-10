import * as d3 from "d3";

export default (options) => {
    const { data, dimension, metric, fn } = options;

    // Figure out bottom margin
    const records = data.length;
    let crowdFactor = Math.floor(records / 20) || 1;
    let longest = 0;
    data.forEach((d, i) => {
        if (i % crowdFactor === 0) {
            longest = d[dimension].length > longest ? d[dimension].length : longest;
        }
    });


    // Width and height of SVG
    const width = 500;
    const height = 500;
    const margin = { top: 20, right: 20, bottom: 75+longest*2, left: 75+longest };
    const location = '#chart';


    const x = d3.scaleBand()
        .domain(d3.range(data.length))
        .range([margin.left, width - margin.right])
        .padding(0.1);
    
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d[metric])]).nice()
        .range([height - margin.bottom, margin.top]);

    const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat(i => data[i][dimension]).tickSizeOuter(0));

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

    // create tooltip
    let tooltip;
    if (document.getElementById('tooltip')) {
        tooltip = d3.select('#tooltip');
    } else {
        tooltip = d3.select("body").append('div')
            .attr('id', 'tooltip')
            .attr('class', 'tooltip')
            .style('opacity', 0);
    }

    // draw bars and add tooltip
    svg.append("g")
            .attr("fill", "steelblue")
        .selectAll("rect")
        .data(data)
        .join("rect")
            .attr("x", (d, i) => x(i))
            .attr("y", d => y(0))
            .attr("height", d => y(0) - y(0))
            .attr("width", x.bandwidth())
        .on('mouseover', (d) => {
            tooltip.transition().duration(200).style('opacity', 0.9);
            tooltip.html(`${dimension}: <span>${d[dimension]}</span><br/><br/>
                ${metric} (${fn}): <span>${d[metric]}</span>`)
                .style('left', `${d3.event.layerX}px`)
                .style('top', `${(d3.event.layerY - 28)}px`);
            
        })
        .on('mousemove', d => {
            tooltip.style('left', `${d3.event.layerX}px`)
                .style('top', `${(d3.event.layerY - 28)}px`);
        })
        .on('mouseout', () => tooltip.transition().duration(500).style('opacity', 0));

    svg.append("g")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr('class', 'tick-label')
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)")
        .attr("opacity", (d, i) => {
            return i % crowdFactor === 0 ? "1" : "0";
        });

    svg.append("g")
        .call(yAxis);

    // Transition from 0 height to data height
    const totalDuration = 1000;
    let barDuration = totalDuration / data.length;
    svg.selectAll("rect")
        .transition()
        .duration(800)
        .attr("y", d => y(d[metric]))
        .attr("height", d => y(0) - y(d[metric]))
        .delay(function (d, i) { return (i * barDuration); });

    // Y axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", margin.left - 70)
        .attr("x",0 - (height / 3))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text(`${metric} (${fn})`);      
};