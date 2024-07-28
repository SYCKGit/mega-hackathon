import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Bfs from './routes/Bfs.jsx';
import Dfs from './routes/Dfs.jsx';
import Dijkstra from './routes/Dijkstra.jsx';



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
  }


]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
)