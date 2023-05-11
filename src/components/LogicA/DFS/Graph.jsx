import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

const Graph = ({ adjList, updateAdjList }) => {
  const [adjLists, setAdjLists] = useState(adjList); // danh sách các đỉnh kề
  const svgRef = useRef();
  // svgRef.attr("width", 500).attr("height", 500);


  useEffect(() => {
    const svg = d3.select(svgRef.current);
  svg.attr("width", 500).attr("height", 500);


    // Xóa các đỉnh và cạnh cũ trước khi vẽ lại đồ thị
    svg.selectAll("*").remove();

    // Vẽ đỉnh
    const nodes = Object.keys(adjLists).map((node) => ({ id: node }));
    const node = svg
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    node.append("circle").attr("r", 10).style("fill", "steelblue");

    node
      .append("text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("fill", "white")
      .text((d) => d.id);

    // Vẽ cạnh
    const links = [];
    Object.keys(adjLists).forEach((source) => {
      adjLists[source].forEach((target) => {
        links.push({ source, target });
      });
    });

    const link = svg
      .selectAll(".link")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("stroke", "black")
      .attr("stroke-width", "2")
      .attr("x1", (d) => nodes.find((n) => n.id === d.source).x)
      .attr("y1", (d) => nodes.find((n) => n.id === d.source).y)
      .attr("x2", (d) => nodes.find((n) => n.id === d.target).x)
      .attr("y2", (d) => nodes.find((n) => n.id === d.target).y);

    // Tạo một đối tượng mô tả hướng của đường nối
    const marker = svg
      .append("defs")
      .append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 15)
      .attr("refY", 0)
      .attr("markerWidth", 8)
      .attr("markerHeight", 8)
      .attr("orient", "auto");

    marker
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("class", "arrowHead")
      .style("fill", "black");

    link.attr("marker-end", "url(#arrow)");
  }, [adjLists]);

  // Xử lý sự kiện thêm đỉnh kề
  const handleAddEdge = (event) => {
    event.preventDefault();
    const source = event.target.source.value;
    const target = event.target.target.value;

    // Thêm đỉnh kề vào danh sách
    setAdjLists((prevAdjLists) => ({
      ...prevAdjLists,
      [source]: [...(prevAdjLists[source] || []), target],
    }));
    updateAdjList &&
      updateAdjList({
        ...adjLists,
        [source]: [...(adjLists[source] || []), target],
      });
  };

  return (
    <div>
      <form onSubmit={handleAddEdge}>
        <input type="text" name="source" placeholder="Source" />
        <input type="text" name="target" placeholder="Target" />
        <button type="submit">Add Edge</button>
      </form>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default Graph;
