import "./Bfs.css";
import { useEffect } from "react";
import cytoscape from "cytoscape";

export default function Bfs(){
  useEffect(() => {
    let cy = cytoscape({
      container: document.getElementById('cy'),
      elements: [],
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#007bff',  // Blue color
            'shape': 'ellipse',          // Circular shape
            'label': 'data(id)',         // Display node ID
            'color': '#fff',            // White text color
            'text-valign': 'center',      // Center text vertically
            'text-halign': 'center',      // Center text horizontally
            'font-size': '16px'          // Font size
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 3,
            'line-color': '#ff0000',      // Red color
            'target-arrow-color': '#ff0000', // Red color
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier'
          }
        }
      ],
      layout: {
        name: 'grid',
        rows: 1
      }
    });

    document.getElementById('initialize-graph').addEventListener('click', function() {
      let numVertices = parseInt(prompt('Enter the number of vertices:'), 10);
      let numEdges = parseInt(prompt('Enter the number of edges:'), 10);

      if (isNaN(numVertices) || isNaN(numEdges) || numVertices <= 0 || numEdges < 0) {
        alert('Invalid input. Please enter valid numbers for vertices and edges.');
        return;
      }

      // Clear existing graph
      cy.elements().remove();

      // Add vertices with names A, B, C, etc.
      for (let i = 0; i < numVertices; i++) {
        let id = String.fromCharCode(65 + i); // ASCII code for 'A' is 65
        cy.add({ group: 'nodes', data: { id: id }, position: { x: Math.random() * 800, y: Math.random() * 600 } });
      }

      // Add edges
      for (let i = 0; i < numEdges; i++) {
        let source = prompt(`Enter the source node ID for edge ${i + 1}:`);
        let target = prompt(`Enter the target node ID for edge ${i + 1}:`);

        if (source && target && source !== target && cy.$('#' + source).length && cy.$('#' + target).length) {
          cy.add({ group: 'edges', data: { id: source + '-' + target, source: source, target: target } });
        } else {
          alert('Invalid node IDs or self-loop. Edge creation failed. Please try again.');
          i--; // Retry the current edge
        }
      }
    });

    // Node tap event for debugging
    cy.on('tap', 'node', function(evt) {
      let node = evt.target;
      alert('Node ' + node.id() + ' tapped!');
    });
  }, []);

  return (
    <>
      <header>
        <h1>Breadth-First Search (BFS) Algorithm</h1>
      </header>
      <main>
        <section id="bfs-details">
          <h2>Details</h2>
          <p>Breadth-First Search (BFS) is an algorithm to traverse all the nodes in a graph. It starts at an arbitrary node of a graph (source) and then traverses all its neighbors. It then moves on to the next layer and so forth, following a traversal system where it covers breadth (neighbors) and then depth (subtrees).</p>
        </section>
        <section id="graph-visualizer">
          <h2>Graph Visualizer</h2>
          <div id="cy"></div>
          <button id="initialize-graph">Initialize Graph</button>
          <p>Initialize the graph by entering the number of vertices and edges. Then, input the edges in a loop.</p>
        </section>
        <div id="root"></div>
      </main>
      <footer>
        <p>&copy; 2024 Graph Algorithms Interactive Learning</p>
      </footer>
    </>
  );
}