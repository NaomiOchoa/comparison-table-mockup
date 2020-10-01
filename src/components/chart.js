import React, { useEffect } from "react";
import * as d3 from "d3";

export default function Chart({ activeCriteria, activeProducts }) {
  const chartRef = React.createRef();
  const xAxisRef = React.createRef();
  const xAxisValuesRef = React.createRef();
  const yAxisRef = React.createRef();
  const width = 1050;
  const height = 400;
  const margin = { top: 20, right: 5, bottom: 40, left: 80 };
  const [xLabels, setxLabels] = React.useState([]);
  const [xVals, setxVals] = React.useState([]);

  console.log("activeProducts", activeProducts.length);

  useEffect(() => {
    const criteriaNames = activeCriteria.map(function (d) {
      return d["criteria-name"];
    });
    setxLabels(criteriaNames);

    const criteriaNamesPlusVals = [];
    criteriaNames.forEach((name) => {
      for (let i = 0; i < activeProducts.length; i++) {
        criteriaNamesPlusVals.push(`${name} ${i}`);
      }
    });
    setxVals(criteriaNamesPlusVals);
  }, [activeCriteria]);

  function update(data) {
    const svg = d3.select(chartRef.current);
    const xAxis = d3.select(xAxisRef.current);
    const xValsAxis = d3.select(xAxisValuesRef.current);
    const yAxis = d3.select(yAxisRef.current);

    let x = d3
      .scaleBand()
      .domain(xLabels)
      .range([margin.left, width - margin.right])
      .padding(0.1)
      .paddingInner(0.1);

    let xValues = d3
      .scaleBand()
      .domain(xVals)
      .range([margin.left, width - margin.right])
      .padding(0.1)
      .paddingInner(0.1);

    let y = d3
      .scaleBand()
      .domain(["Untested", "Below Average", "Average", "Above Average"])
      .range([height - margin.bottom, margin.top]);

    xAxis.call(d3.axisBottom(x));
    xValsAxis.call(d3.axisBottom(xValues));

    yAxis.call(d3.axisLeft(y));

    // Create the u variable
    var u = svg.selectAll("dot").data(data);

    let b = svg.selectAll("rect").data(data);

    console.log(x.bandwidth());

    b.enter()
      .append("rect") // Add a new rect for each new elements
      .merge(b) // get the already existing elements as well
      .attr("x", function (d) {
        return x(d);
      })
      .attr("y", margin.top)
      .attr("width", x.bandwidth())
      .attr("height", function (d) {
        return height - margin.bottom - y("Above Average");
      })
      .attr("fill", "#BFD8ED");

    // If less group in the new dataset, I delete the ones not in use anymore
    b.exit().remove();

    u.enter();
    // .append("circle") // Add a new rect for each new elements
    // .merge(u) // get the already existing elements as well
    // .transition() // and apply changes to all of them
    // .duration(1000)
    // .attr("cx", function (d) {
    //   return x(d.taskName);
    // })
    // .attr("cy", function (d) {
    //   return y(d.seconds);
    // })
    // .attr("r", 5)
    // .style("fill", function (d) {
    //   return color(d.Species);
    // });

    // .attr("width", x.bandwidth())
    // .attr("height", function (d) {
    //   return height - margin.bottom - y(d.seconds);
    // })
    // .attr("fill", "#69b3a2");

    // If less group in the new dataset, I delete the ones not in use anymore
    u.exit().remove();
  }

  useEffect(() => {
    update(xLabels);
  }, [xLabels, activeProducts]);

  return (
    <div id="svg-container">
      <svg width={width} height={height} ref={chartRef}>
        <g
          ref={xAxisRef}
          transform={`translate(0, ${height - margin.bottom})`}
        />
        <g
          ref={xAxisValuesRef}
          transform={`translate(0, ${height - margin.bottom / 2})`}
        />
        <g ref={yAxisRef} transform={`translate(${margin.left}, 0)`} />
      </svg>
    </div>
  );
}
