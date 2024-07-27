import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Bfs from './routes/Bfs.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/bfs',
    element: <Bfs />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
