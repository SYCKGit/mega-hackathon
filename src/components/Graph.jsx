import { useEffect, useRef, useState } from "react";
import cytoscape from "cytoscape";
import "./Graph.css";

/**
 * Parse the input data to extract vertices and edges.
 * @param {string} data - Input data containing edges.
 * @returns {object} - Object containing vertices and edges.
*/
function parseData(data){
  let vertices = new Set(), edges = new Set();

  for (const line of data.split("\n")) {
    const [source, target] = line.trim().split(" ");
    if (source)
      vertices.add(source);
    if (target)
      vertices.add(target);
    if (source && target)
      edges.add({ source, target });
  }

  return { vertices: Array.from(vertices), edges: Array.from(edges) };
}

export default function Graph(){
  const [data, setData] = useState("");
  const cy = useRef();

  useEffect(() => {
    cy.current = cytoscape({
      container: document.getElementById("cy"),
      elements: [],
      style: [
        {
          selector: "node",
          style: {
            "background-color": "#6EACDA",  // Blue color
            "shape": "ellipse",          // Circular shape
            "label": "data(id)",         // Display node ID
            "color": "#fff",            // White text color
            "text-valign": "center",      // Center text vertically
            "text-halign": "center",      // Center text horizontally
            "font-size": "16px"          // Font size
          }
        },
        {
          selector: "node:selected",
          style: {
            "background-color": "#E2E2B6",
          }
        },
        {
          selector: "edge",
          style: {
            "width": 3,
            "line-color": "#6EACDA",      // Red color
            "target-arrow-color": "#6EACDA", // Red color
            "target-arrow-shape": "triangle",
            "curve-style": "bezier"
          }
        }
      ],
      layout: {
        name: "grid",
        rows: 1
      }
    });

    window.cyto = cy.current;
  }, []);

  useEffect(() => {
    if (!cy.current) return;
    const pos = {};
    cy.current.nodes().forEach(node => {
      pos[node.id()] = node.position();
    });
    cy.current.elements().remove();
    const { vertices, edges } = parseData(data);
    vertices.forEach(vertex => {
      cy.current.add({
        group: "nodes", data: { id: vertex },
        position: pos[vertex] || { x: Math.random() * 800, y: Math.random() * 600 }
      });
    });
    edges.forEach(({ source, target }) => {
      cy.current.add({ group: "edges", data: { id: source + "-" + target, source, target } });
    });
  }, [data]);

  const handleBFSClick = () => {
    const selectedNodes = cy.current.$('node:selected');
    if (selectedNodes.nonempty()) {
      bfs(selectedNodes.first().id());
    } else {
      alert("Please select a node to start BFS.");
    }
  };
  const bfs = (startNode) => {
    const bfsResult = cy.current.elements().bfs(`#${startNode}`, function(){}, true);
    let i = 0;
    const highlightNextEle = function(){
      if( i < bfsResult.path.length ){
        const ele = bfsResult.path[i];
        if (ele.isNode()) {
          ele.animate({
            style: { "background-color": "#03346E"},
            duration: 500
          });
        } else if (ele.isEdge()) {
          ele.animate({
            style: { "line-color": "#03346E", "target-arrow-color": "#03346E" },
            duration: 500
          });
        }
        i++;
        setTimeout(highlightNextEle, 1000);
      }
    };
    highlightNextEle();
  };

  return (
      <div id="container">
        <div style={{ marginBottom: '10px' }}> {/* Container for textarea and button */}
          <textarea
              id="inp"
              value={data}
              onChange={(e) => setData(e.target.value)}
              style={{ width: '100%', height: '400px', marginBottom: '10px' }} // Set the height to 400px and ensure the textarea is full width
          ></textarea>
          <button
              onClick={handleBFSClick}
              style={{ width: '100%' }} // Make the button the same width as the textarea
          >
            Start BFS
          </button>
        </div>
        <div id="cy" style={{ width: '100%', height: '500px' }}> {/* Maintain explicit dimensions for the graph area */}
          {/* Graph will render here */}
        </div>
      </div>
  );
}