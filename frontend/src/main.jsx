import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './App'
import './index.css'
import './components/ErrorPage/index.jsx'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './components/ErrorPage/index.jsx'
import AddReview from './components/AddReview/AddReview.jsx'
import PrivateRoutes from './utils/PrivateRoutes'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Root />} errorElement={<ErrorPage />}>
    <Route element={<PrivateRoutes />}>
      <Route path='/add-review' element={<AddReview />} />
    </Route>
  </Route>
));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
