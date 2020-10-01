import React, { useEffect } from "react";
import * as d3 from "d3";

export default function Chart({ activeCriteria, activeProducts }) {
  const chartRef = React.createRef();
  const containerRef = React.createRef();
  const xAxisRef = React.createRef();
  const xAxisValuesRef = React.createRef();
  const yAxisRef = React.createRef();
  const width = 1050;
  const height = 400;
  const margin = { top: 20, right: 5, bottom: 20, left: 80 };
  const [xLabels, setxLabels] = React.useState([]);
  const [xVals, setxVals] = React.useState([]);
  const [productDataPoints, setProductDataPoints] = React.useState([]);

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

    const points = [];

    var convertRating = d3
      .scaleOrdinal()
      .domain([0, 1, 2, 3])
      .range(["Untested", "Below Average", "Average", "Above Average"]);

    activeProducts.forEach((prod, i) => {
      for (let key in prod) {
        if (criteriaNames.includes(key) && typeof prod[key] === "object") {
          points.push({
            xPos: `${key} ${i}`,
            yPos: convertRating(prod[key].rating),
            model: prod.Model,
            ...prod[key],
            color: prod.color,
            fullColor: prod.fullColor,
            greyscale: prod.greyscale,
          });
        }
      }
    });
    console.log(points);
    setProductDataPoints(points);
  }, [activeCriteria, activeProducts]);

  function update(axisData, productData) {
    console.log("update function product data", productData);
    const svg = d3.select(chartRef.current);
    const xAxis = d3.select(xAxisRef.current);
    const xValsAxis = d3.select(xAxisValuesRef.current);
    const yAxis = d3.select(yAxisRef.current);

    //tooltip setup
    let tooltip = d3
      .select(containerRef.current)
      .append("div")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .text("a simple tooltip");

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
      .padding(0.2)
      .paddingInner(0.1);

    let y = d3
      .scalePoint()
      .domain(["Untested", "Below Average", "Average", "Above Average"])
      .range([height - margin.bottom, margin.top])
      .padding(0.2);

    xAxis.call(d3.axisBottom(x));
    xValsAxis.call(d3.axisBottom(xValues));

    yAxis.call(d3.axisLeft(y));

    let b = svg.selectAll("rect").data(axisData);

    b.enter()
      .append("rect")
      .merge(b)
      .attr("x", function (d) {
        return x(d);
      })
      .attr("y", margin.top)
      .attr("width", x.bandwidth())
      .attr("height", function (d) {
        return height - margin.bottom - margin.top;
      })
      .attr("fill", "#F5F5F5");

    b.exit().remove();

    let u = svg.selectAll("circle").data(productData);
    u.enter()
      .append("circle")
      .merge(u)
      .attr("cx", function (d) {
        return xValues(d.xPos) + xValues.bandwidth() / 2;
      })
      .attr("cy", function (d) {
        return y(d.yPos);
      })
      .attr("value", function (d) {
        return d.model;
      })
      .attr("r", 5)
      .style("fill", function (d) {
        return d.color;
      })
      .style("opacity", function (d) {
        console.log(d);
        if (d.color === d.fullColor) {
          return 1;
        } else {
          return 0.2;
        }
      })
      .on("mouseover", function (e) {
        console.log(e.target.__data__);
        return tooltip
          .style("visibility", "visible")
          .text(e.target.__data__.model);
      })
      .on("mousemove", function (event) {
        return tooltip
          .style("top", event.pageY - 10 + "px")
          .style("left", event.pageX + 10 + "px");
      })
      .on("mouseout", function () {
        return tooltip.style("visibility", "hidden");
      });
    u.exit().remove();
  }

  useEffect(() => {
    update(xLabels, productDataPoints);
  }, [xLabels, productDataPoints]);

  return (
    <div id="svg-container" ref={containerRef}>
      <svg width={width} height={height} ref={chartRef}>
        <g
          ref={xAxisRef}
          transform={`translate(0, ${height - margin.bottom})`}
        />
        <g ref={xAxisValuesRef} transform={`translate(0, ${height})`} />
        <g ref={yAxisRef} transform={`translate(${margin.left}, 0)`} />
      </svg>
    </div>
  );
}
