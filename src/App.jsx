import './App.css'

function App() {
    return (
        <>
            <header>
                <h1>Graph Algorithms Interactive Learning</h1>
            </header>
            <main>
                <section id="bfs">
                    <h2>BFS</h2>
                    <p>Learn about Breadth-First Search (BFS).</p>
                    <a href="bfs">Go to BFS Algorithm Page</a>
                </section>

                <section id="dfs">
                    <h2>DFS</h2>
                    <p>Learn about Depth-First Search (DFS).</p>
                    <a href="dfs">Go to DFS Algorithm Page</a>
                </section>

                <section id="dijkstra">
                    <h2>Dijkstra</h2>
                    <p>Learn about Dijkstra.</p>
                    <a href="dijkstra">Go to Dijkstra Algorithm Page</a>
                </section>

                <section id="binsearch">
                    <h2>Binary Search</h2>
                    <p>Learn about Binary Search.</p>
                    <a href="binsearch">Go to Binary Search Page</a>
                </section>

                <section id="knapsack">
                    <h2>Knapsack Problem (DP)</h2>
                    <p>Learn about Knapsack Problem (DP).</p>
                    <a href="knapsack">Go to Knapsack Problem Page</a>
                </section>

            </main>
            <footer>
                <p>&copy; 2024 Graph Algorithms Interactive Learning</p>
            </footer>
        </>
    )
}

export default App