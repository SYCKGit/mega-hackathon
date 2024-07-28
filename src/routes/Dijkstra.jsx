import Graph from "../components/Graph";
import "./Dijkstra.css";

export default function Dijkstra() {
  return (
    <>
      <header>
        <h1>Dijkstra Algorithm</h1>
      </header>
      <main>
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
