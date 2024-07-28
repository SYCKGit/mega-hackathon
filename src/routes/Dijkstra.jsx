import { MinPriorityQueue } from "@datastructures-js/priority-queue";
import Graph from "../components/Graph";
import "../styles.css";
import { AnimationQueue } from "../lib/utils";

function dijkstraAnimation(cy, startNode, isDirected){
  const aq = new AnimationQueue(750);
  const pq = new MinPriorityQueue();
  const dist = {};
  cy.nodes().forEach(node => dist[node.id()] = Infinity);
  dist[startNode] = 0;
  pq.push([0, startNode]);
  while (!pq.isEmpty()){
    const [d, u] = pq.front();
    pq.pop();
    if (d > dist[u]) continue;
    aq.push(cy.$id(u), e => e.data("label", dist[u]));
    let edges = cy.edges(`[source = "${u}"]`);
    if (!isDirected) edges = edges.union(cy.edges(`[target = "${u}"]`));
    edges.forEach(edge => {
      const v = edge.target().id();
      const w = Number(edge.data("weight")) || 0;
      if (dist[u] + w < dist[v]){
        dist[v] = dist[u] + w;
        pq.push([dist[v], v]);
        aq.push(edge, () => cy.$id(v).data("label", dist[v]));
      }
    });
  }
}

export default function Dijkstra() {
  return (
    <>
      <header>
        <h1>Dijkstra Algorithm</h1>
      </header>
      <main>
        <section id="dijkstra-details">
          <h2>What Problem Does Dijkstra Solve?</h2>
          <p>Dijkstra's Algorithm helps you find the shortest path between two points (nodes) in a network, like finding the quickest route on a map.</p>
          
          <h3>Input Required</h3>
          <p>The algorithm needs a graph with nodes (places) and edges (paths connecting the places). Each edge has a weight, which is a number showing how long or hard it is to travel that path.</p>
          
          <h3>Why BFS Doesn't Work</h3>
          <p>Breadth-First Search (BFS) doesn't work for finding the shortest path in graphs with weighted edges because BFS treats all edges as equal. Dijkstra's Algorithm considers the weights, so it can find the truly shortest path.</p>
          
          <h3>Example</h3>
          <p>Imagine you are in a city and want to find the shortest route from your home to the park. The roads between intersections have different lengths (weights).</p>
          <ul>
            <li>You start at home (node A) and mark it with a distance of 0.</li>
            <li>You look at all the roads (edges) leading from home and note their lengths.</li>
            <li>You perform dijkstra with the intersections being nodes and the roads being edges to find the shortest length path </li>
          </ul>
        </section>
        <section id="dijkstra-explanation">
          <h2>Simple Explanation</h2>
          <p>Dijkstra's Algorithm is a way to find the shortest path from a starting point (node) to an ending point (node) in a graph. Here is a step-by-step summary:</p>
          <ol>
            <li><strong>Mark</strong> the source node with a current distance of 0 and the rest with infinity (∞).</li>
            <li><strong>Set</strong> the non-visited node with the smallest current distance as the current node.</li>
            <li><strong>For each neighbor</strong> of the current node, add the current distance of the current node to the weight of the edge connecting to the neighbor. If this is smaller than the current distance of the neighbor, update it to this new smaller distance.</li>
            <li><strong>Mark</strong> the current node as visited.</li>
            <li><strong>Repeat</strong> steps 2 to 4 until all nodes have been visited.</li>
          </ol>
        </section>
        <section id="graph-visualizer">
          <h2>Graph Visualizer</h2>
          <Graph algo="Dijkstra" animation={dijkstraAnimation} />
        </section>
      </main>
      <footer>
      <p> AlgoSpectrum - Oviyan Gandhi, Samik Goyal, Samvar Shah, Lu Chang</p>
      </footer>
    </>
  );
}
