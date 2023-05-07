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
import Auth from './components/Auth/Auth'
import { Provider } from 'react-redux'
import {store , persistor} from './app/store'
import { PersistGate } from 'redux-persist/integration/react';
import Professors from './components/Professors/Professors'
import Colleges from './components/Colleges/Colleges'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Root />} errorElement={<ErrorPage />}>
    <Route element={<PrivateRoutes />}>
      <Route path='add-review/:professor_id' element={<AddReview />} />
    </Route>
    <Route path='professors/:professor_id' element={<h1>Professor</h1>} />
    <Route path='professors' element={<Professors />} />
    <Route path='colleges/:college_id' element={<h1>College</h1>} />
    <Route path='colleges' element={<Colleges />} />
    <Route path='login' element={<Auth />} />
  </Route>
));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
