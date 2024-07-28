import Graph from "../components/Graph";
import { searchAnimation } from "../lib/utils";
import "../styles.css";

export default function Dfs() {
  return (
    <>
      <header>
        <h1>Depth-First Search (DFS) Algorithm</h1>
      </header>
      <main>
        <section id="dfs-details">
          <h2>Details</h2>
          <p>
            Depth-First Search (DFS) is another algorithm which is used to traverse or search through the nodes of a graph. It starts from an arbitrary node (called the source) but unlike BFS explores as far as possible along each branch before backtracking. Then it moves on to its neighbours.
          </p>
        </section>
        <section id="interactive-explanation">
          <h2>Interactive Explanation</h2>
          <div className="step">
            <h3>Step 1: Start at the Source Node</h3>
            <p>Just as in bfs, we choose any node of the graph as the source say (A)</p>

          </div>
          <div className="step">
            <h3>Step 2: Visit Neighbors</h3>
            <p>Suppose A has neighbours (B, C, D). We visit any of B, C, D; say B</p>
            <p>Now, in BFS we would have now gone to C and D to check the entire breadth .</p>
            <p>In DFS we now look at the children of B (the neighbours of its).</p>
            <p>Thus we explore down the branch as much as possible.</p>

          </div>
          <div className="step">
            <h3>Step 3: Recursion</h3>
            <p>Once the branch is visited completely, we return to the previous vertex which was visited and go to its all neighbours and so on.</p>
            <p>In other words, we visit the neighbour's of the vertices who were first step neighbours of the source.</p>

          </div>
          <div className="step">
            <h3>Step 4: Continue Traversal</h3>
            <p>Continue the process until all nodes have been visited.</p>
          </div>
        </section>
        <section id="graph-visualizer">
          <h2>Graph Visualizer</h2>
          <Graph algo="DFS" animation={searchAnimation("dfs")} />
        </section>
      </main>
      <footer>
        <p>&copy; 2024 Graph Algorithms Interactive Learning</p>
      </footer>
    </>
  );
}
