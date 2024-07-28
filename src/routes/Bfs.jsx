import Graph from "../components/Graph";
import { searchAnimation } from "../lib/utils";
import "../styles.css";

export default function Bfs() {
  return (
    <>
      <header>
        <h1>Breadth-First Search (BFS) Algorithm</h1>
      </header>
      <main>
        <section id="bfs-details">
          <h2>Details</h2>
          <p>
            Breadth-First Search (BFS) is an algorithm used to traverse or search through the nodes of a graph. It starts from an arbitrary node (called the source) and explores all of its neighboring nodes at the present depth before moving on to nodes at the next depth level.
          </p>
        </section>
        <section id="interactive-explanation">
          <h2>Interactive Explanation</h2>
          <div className="step">
            <h3>Step 1: Start at the Source Node</h3>
            <p>Select a starting node (source) from which the traversal will begin.</p>
            <p>Any node of the graph can be made the source node.</p>


          </div>
          <div className="step">
            <h3>Step 2: Visit Neighbors</h3>
            <p>All the vertices to which the source node has an edge are called its neighbours.</p>
            <p>These neighbours are now marked as visited vertices.</p>


          </div>
          <div className="step">
            <h3>Step 3: Move to the Next Layer</h3>
            <p>Once all the nighbours of the source node are visited, we move on to the next "layer" of vertices.</p>
            <p>In other words, we visit the neighbour's of the vertices who were first step neighbours of the source.</p>

          </div>
          <div className="step">
            <h3>Step 4: Continue Traversal</h3>
            <p>Continue the process until all nodes have been visited.</p>
          </div>
        </section>
        <section id="graph-visualizer">
          <h2>Graph Visualizer</h2>
          <Graph algo="BFS" animation={searchAnimation("bfs")} />
        </section>
      </main>
      <footer>
        <p>&copy; 2024 Graph Algorithms Interactive Learning</p>
      </footer>
    </>
  );
}
