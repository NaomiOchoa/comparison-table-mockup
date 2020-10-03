import React, { useEffect } from "react";
import * as d3 from "d3";
import { useChartSize } from "../utils/ChartSizeProvider";
import "./chart.css";

export default function Chart({
  activeCriteria,
  activeProducts,
  priceHigh,
  priceLow,
}) {
  const chartRef = React.createRef();
  const containerRef = React.createRef();
  const xAxisRef = React.createRef();
  const xAxisValuesRef = React.createRef();
  const yAxisRef = React.createRef();
  const barsRef = React.createRef();
  const dotsRef = React.createRef();
  const tooltipRef = React.createRef();
  const { height, width } = useChartSize();
  const margin = { top: 20, right: 5, bottom: 20, left: 80 };
  const [xLabels, setxLabels] = React.useState([]);
  const [xVals, setxVals] = React.useState([]);
  const [productDataPoints, setProductDataPoints] = React.useState([]);
  const [numProducts, setNumProducts] = React.useState();

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

    setNumProducts(activeProducts.length);

    activeProducts.forEach((prod, i) => {
      for (let key in prod) {
        if (criteriaNames.includes(key) && typeof prod[key] === "object") {
          points.push({
            xPos: `${key} ${i}`,
            yPos: convertRating(prod[key].rating),
            model: prod.Model,
            ...prod[key],
            criteria: key,
            color: prod.color,
            fullColor: prod.fullColor,
            greyscale: prod.greyscale,
            offset: activeProducts.length - i,
          });
        } else if (criteriaNames.includes(key) && key === "Price") {
          points.push({
            xPos: `${key} ${i}`,
            value: prod[key],
            model: prod.Model,
            criteria: key,
            color: prod.color,
            fullColor: prod.fullColor,
            greyscale: prod.greyscale,
            offset: activeProducts.length - i,
          });
        } else if (criteriaNames.includes(key) && key === "Sale Price") {
          points.push({
            xPos: `${key} ${i}`,
            value: prod[key],
            criteria: key,
            model: prod.Model,
            color: prod.color,
            fullColor: prod.fullColor,
            greyscale: prod.greyscale,
            offset: activeProducts.length - i,
          });
        }
      }
    });
    setProductDataPoints(points);
  }, [activeCriteria, activeProducts]);

  function update(axisData, productData) {
    const svg = d3.select(chartRef.current);
    const xAxis = d3.select(xAxisRef.current);
    const xValsAxis = d3.select(xAxisValuesRef.current);
    const yAxis = d3.select(yAxisRef.current);
    const barsGroup = d3.select(barsRef.current);
    const dotsGroup = d3.select(dotsRef.current);

    //tooltip setup
    let tooltip = d3
      .select(tooltipRef.current)
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .text("a tooltip");

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

    let priceY = d3
      .scaleLinear()
      .domain([priceLow, priceHigh])
      .range([height - margin.bottom - 30, margin.top + 30]);

    xAxis.call(d3.axisBottom(x));
    xValsAxis.call(d3.axisBottom(xValues));

    yAxis.call(d3.axisLeft(y));

    let b = barsGroup.selectAll("rect").data(axisData);

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

    let u = dotsGroup.selectAll("circle").data(productData);
    u.enter()
      .append("circle")
      .merge(u)
      .attr("cx", function (d) {
        return (
          x(d.criteria) +
          x.bandwidth() -
          (x.bandwidth() / (numProducts + 1)) * d.offset
        );
      })
      .attr("cy", function (d) {
        if (d.yPos) {
          return y(d.yPos);
        } else {
          return priceY(d.value);
        }
      })
      .attr("value", function (d) {
        return d.model;
      })
      .attr("r", 7)
      .style("fill", function (d) {
        return d.color;
      })
      .style("opacity", function (d) {
        if (d.color === d.fullColor) {
          return 1;
        } else {
          return 0.2;
        }
      })
      .on("mouseover", function (e) {
        console.log("pageX: ", e.pageX, "width: ", width);
        return tooltip.style("visibility", "visible").html(
          `<h4>${e.target.__data__.model}</h4>
             <p>${
               e.target.__data__.notes
                 ? e.target.__data__.notes
                 : "$" + e.target.__data__.value
             }</p>`
        );
      })
      .on("mousemove", function (event) {
        if (event.pageX > width / 2) {
          return tooltip
            .style("top", event.pageY + 10 + "px")
            .style("left", event.pageX - 185 + "px");
        } else {
          return tooltip
            .style("top", event.pageY + 10 + "px")
            .style("left", event.pageX + 10 + "px");
        }
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
    <section id="svg-container" ref={containerRef}>
      <div ref={tooltipRef} className={"tooltip"}></div>
      <svg width={width} height={height} ref={chartRef}>
        <g ref={barsRef} />
        <g ref={dotsRef} />
        <g
          ref={xAxisRef}
          transform={`translate(0, ${height - margin.bottom})`}
        />
        <g ref={xAxisValuesRef} transform={`translate(0, ${height})`} />
        <g ref={yAxisRef} transform={`translate(${margin.left}, 0)`} />
      </svg>
    </section>
  );
}
