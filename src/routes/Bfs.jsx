import Graph from "../components/Graph";
import "./Bfs.css";

export default function Bfs(){
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
          <Graph />
        </section>
      </main>
      <footer>
        <p>&copy; 2024 Graph Algorithms Interactive Learning</p>
      </footer>
    </>
  );
}