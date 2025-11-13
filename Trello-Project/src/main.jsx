import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom';
import routes from './router/Router.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes}>
      <App/>
    </RouterProvider>
  </StrictMode>,
)
