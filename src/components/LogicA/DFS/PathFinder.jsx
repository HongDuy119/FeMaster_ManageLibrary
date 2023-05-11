import React, { useState } from "react";

const PathFinder = ({ adjList }) => {
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");
  const [path, setPath] = useState([]);
  console.log(adjList);

  const handleFindPath = (event) => {
    event.preventDefault();

    // Tìm đường đi giữa source và target bằng thuật toán DFS
    const visited = {};
    const dfs = (node, path) => {
      visited[node] = true;
      if (node === target) {
        setPath(path);
        return true;
      }
      for (const neighbor of adjList[node]) {
        if (!visited[neighbor]) {
          const found = dfs(neighbor, [...path, neighbor]);
          if (found) {
            return true;
          }
        }
      }
      return false;
    };
    dfs(source, [source]);
  };

  return (
    <div>
      <form onSubmit={handleFindPath}>
        <input
          type="text"
          placeholder="Source"
          value={source}
          onChange={(event) => setSource(event.target.value)}
        />
        <input
          type="text"
          placeholder="Target"
          value={target}
          onChange={(event) => setTarget(event.target.value)}
        />
        <button type="submit">Find Path</button>
      </form>
      {path.length === 0 ? (
        <p>No path found</p>
      ) : (
        <p>{path.join(" -> ")}</p>
      )}
    </div>
  );
};

export default PathFinder;
