import { useEffect, useRef, useState } from "react";
import cytoscape from "cytoscape";
import "./Graph.css";

/**
 * Parse the input data to extract vertices and edges.
 * @param {string} data - Input data containing edges.
 * @returns {object} - Object containing vertices and edges.
 */
function parseData(data) {
  let vertices = new Set(), edges = new Set();

  for (const line of data.split("\n")) {
    const [source, target, weight] = line.trim().split(" ");
    if (source)
      vertices.add(source);
    if (target)
      vertices.add(target);
    if (source && target)
      edges.add({ source, target, weight });
  }

  return { vertices: Array.from(vertices), edges: Array.from(edges) };
}

export default function Graph({ algo, animation }) {
  const [data, setData] = useState("");
  const [isDirected, setIsDirected] = useState(true);
  const cy = useRef();

  useEffect(() => {
    cy.current = cytoscape({
      container: document.getElementById("cy"),
      elements: [],
      style: [
        {
          selector: "node",
          style: {
            "background-color": "#6EACDA",
            "shape": "ellipse",
            "label": "data(id)",
            "color": "#fff",
            "text-valign": "center",
            "text-halign": "center",
            "font-size": "16px"
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
            "line-color": "#6EACDA",
            "target-arrow-color": "#6EACDA",
            "target-arrow-shape": isDirected ? "triangle" : "none",
            "curve-style": "bezier",
            "label": "data(weight)",
            "text-margin-y": "-10px"
          }
        }
      ],
      layout: {
        name: "grid",
        rows: 1
      }
    });

    cy.current.on('tap', 'node', (event) => {
      const node = event.target;
      if (node.selected()) {
        node.style("background-color", "#6EACDA");
        node.unselect();
      } else {
        cy.current.nodes().forEach(n => {
          n.style("background-color", "#6EACDA");
          n.unselect();
        });
        node.style("background-color", "#E2E2B6");
        node.select();
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
    const count = {};
    edges.forEach(({ source, target, weight }) => {
      count[source] = (count[source] || 0) + 1;
      const edge = { group: "edges", data: { id: `${source}-${target}-${count[source]}`, source, target } };
      if (weight !== undefined)
        edge.data.weight = weight;
      cy.current.add(edge);
    });

    cy.current.style().selector('edge').style({
      'target-arrow-shape': isDirected ? 'triangle' : 'none'
    }).update();

  }, [data, isDirected]);

  const handleClick = () => {
    const selectedNodes = cy.current.$('node:selected');
    if (selectedNodes.nonempty()) {
      animation(cy.current, selectedNodes.first().id(), isDirected);
    } else {
      alert(`Please select a node to start ${algo}.`);
    }
  };

  const handleResetClick = () => {
    cy.current.nodes().forEach(node => {
      node.style("background-color", "#6EACDA");
      node.unselect();
    });
    cy.current.edges().forEach(edge => {
      edge.style("line-color", "#6EACDA");
      edge.style("target-arrow-color", "#6EACDA");
      edge.unselect();
    });
  };

  return (
      <div id="container">
        <div style={{ marginBottom: '10px' }}>
        <textarea
            id="inp"
            value={data}
            onChange={(e) => setData(e.target.value)}
        ></textarea>
          <button onClick={() => setIsDirected(!isDirected)} style={{ width: '100%' }}>
            {isDirected ? "Switch to Undirected Graph" : "Switch to Directed Graph"}
          </button>
          <button onClick={handleClick}>
            Start {algo}
          </button>
          <button onClick={handleResetClick}>
            Reset
          </button>
        </div>
        <div id="cy" style={{ width: '100%', height: '500px' }}></div>
      </div>
  );
}
