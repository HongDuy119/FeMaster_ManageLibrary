import React from "react";
import Graph from "./Graph";
import PathFinder from "./PathFinder";
import  { useState } from "react";


const Dfs = () => {
    const [adjList,setAdjList] = useState({
        A: ["B", "C"],
        B: ["D"],
        C: ["E"],
        D: ["F"],
        E: [],
        F: ["G"],
        G: [],
      });
      const updateAdjList = (newAdjList) => {
        setAdjList(newAdjList);
      };
  return (
    <div>
      <Graph adjList={adjList} updateAdjList = {updateAdjList} />
      <PathFinder adjList={adjList} />
    </div>
  );
};

export default Dfs;