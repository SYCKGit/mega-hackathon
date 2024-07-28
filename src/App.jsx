import React from 'react';
import './App.css';

const styles = {
  header: {
    background: 'linear-gradient(135deg, #4CAF50, #2C6C41)',
    color: 'white',
    textAlign: 'center',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    position: 'relative'
  },
  h1: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: '2.5em',
    margin: '0',
    fontWeight: '700',
    letterSpacing: '1px'
  },
  main: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'auto auto',
    gap: '20px',
    padding: '20px',
    justifyContent: 'center',
    alignItems: 'center'
  },
  section: {
    width: '100%',
    height: '250px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    textAlign: 'center'
  },
  img: {
    width: '60%',
    height: 'auto',
    maxHeight: '120px',
    objectFit: 'contain',
    borderRadius: '5px',
    marginBottom: '10px'
  },
  h2: {
    margin: '0',
    color: '#333',
    fontFamily: "'Roboto', sans-serif"
  },
  p: {
    color: '#666',
    fontFamily: "'Lora', serif"
  },
  a: {
    textDecoration: 'none',
    color: '#007BFF',
    fontWeight: 'bold'
  },
  aHover: {
    textDecoration: 'underline'
  },
  footer: {
    backgroundColor: '#4CAF50',
    color: 'white',
    textAlign: 'center',
    padding: '10px',
    position: 'absolute',
    bottom: '0',
    width: '100%'
  },
  binsearch: {
    transform: 'translate(150px, -70px)'
  },
  knapsack: {
    transform: 'translate(150px, -70px)'
  }
};

function App() {
  return (
    <>
      <header style={styles.header}>
        <h1 style={styles.h1}>AlgoSpectrum</h1>
      </header>
      <main style={styles.main}>
        <section id="bfs" style={styles.section}>
          <img src="1.jpg" alt="BFS Algorithm" style={styles.img} />
          <h2 style={styles.h2}>BFS</h2>
          <p style={styles.p}>Learn about Breadth-First Search (BFS).</p>
          <a href="bfs" style={styles.a} onMouseOver={e => e.currentTarget.style.textDecoration = styles.aHover.textDecoration} onMouseOut={e => e.currentTarget.style.textDecoration = styles.a.textDecoration}>Go to BFS Algorithm Page</a>
        </section>

        <section id="dfs" style={styles.section}>
          <img src="2.jpg" alt="DFS Algorithm" style={styles.img} />
          <h2 style={styles.h2}>DFS</h2>
          <p style={styles.p}>Learn about Depth-First Search (DFS).</p>
          <a href="dfs" style={styles.a} onMouseOver={e => e.currentTarget.style.textDecoration = styles.aHover.textDecoration} onMouseOut={e => e.currentTarget.style.textDecoration = styles.a.textDecoration}>Go to DFS Algorithm Page</a>
        </section>

        <section id="dijkstra" style={styles.section}>
          <img src="3.jpg" alt="Dijkstra Algorithm" style={styles.img} />
          <h2 style={styles.h2}>Dijkstra</h2>
          <p style={styles.p}>Learn about Dijkstra.</p>
          <a href="dijkstra" style={styles.a} onMouseOver={e => e.currentTarget.style.textDecoration = styles.aHover.textDecoration} onMouseOut={e => e.currentTarget.style.textDecoration = styles.a.textDecoration}>Go to Dijkstra Algorithm Page</a>
        </section>

        <section id="binsearch" style={{ ...styles.section, ...styles.binsearch }}>
          <img src="4.jpg" alt="Binary Search" style={styles.img} />
          <h2 style={styles.h2}>Binary Search</h2>
          <p style={styles.p}>Learn about Binary Search.</p>
          <a href="binsearch" style={styles.a} onMouseOver={e => e.currentTarget.style.textDecoration = styles.aHover.textDecoration} onMouseOut={e => e.currentTarget.style.textDecoration = styles.a.textDecoration}>Go to Binary Search Page</a>
        </section>

        <section id="knapsack" style={{ ...styles.section, ...styles.knapsack }}>
          <img src="5.jpg" alt="Knapsack Problem" style={styles.img} />
          <h2 style={styles.h2}>Knapsack Problem (DP)</h2>
          <p style={styles.p}>Learn about Knapsack Problem (DP).</p>
          <a href="knapsack" style={styles.a} onMouseOver={e => e.currentTarget.style.textDecoration = styles.aHover.textDecoration} onMouseOut={e => e.currentTarget.style.textDecoration = styles.a.textDecoration}>Go to Knapsack Problem Page</a>
        </section>
      </main>
      <footer style={styles.footer}>
        <p>AlgoSpectrum - Oviyan Gandhi, Samik Goyal, Samvar Shah, Lu Chang </p>
      </footer>
    </>
  );
}

export default App;
