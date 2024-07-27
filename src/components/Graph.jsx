import { useEffect, useRef, useState } from "react";
import cytoscape from "cytoscape";

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
            "background-color": "#007bff",  // Blue color
            "shape": "ellipse",          // Circular shape
            "label": "data(id)",         // Display node ID
            "color": "#fff",            // White text color
            "text-valign": "center",      // Center text vertically
            "text-halign": "center",      // Center text horizontally
            "font-size": "16px"          // Font size
          }
        },
        {
          selector: "edge",
          style: {
            "width": 3,
            "line-color": "#ff0000",      // Red color
            "target-arrow-color": "#ff0000", // Red color
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

    cy.current.on("tap", "node", function(evt) {
      let node = evt.target;
      alert("Node " + node.id() + " tapped!");
    });
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

  return (
    <div id="container">
      <textarea id="inp" value={data} onChange={(e) => setData(e.target.value)}></textarea>
      <div id="cy"></div>
    </div>
  );
}