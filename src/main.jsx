import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Bfs from './routes/Bfs.jsx';
import Dfs from './routes/Dfs.jsx';
import Dijkstra from './routes/Dijkstra.jsx';
import Binsearch from './routes/Binsearch.jsx';
import Knapsack from './routes/Knapsack.jsx';



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/bfs',
    element: <Bfs />
  },
  {
    path: '/dfs',
    element: <Dfs />
  },
  {
    path: '/dijkstra',
    element: <Dijkstra />
  },
  {
    path: '/binsearch',
    element: <Binsearch />
  },
  {
    path: '/knapsack',
    element: <Knapsack />
  }


]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
)