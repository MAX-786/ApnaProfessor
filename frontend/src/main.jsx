import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./App";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./components/ErrorPage/index.jsx";
import AddReview from "./components/AddReview/AddReview.jsx";
import PrivateRoutes from "./utils/PrivateRoutes";
import Auth from "./components/Auth/Auth";
import { Provider } from "react-redux";
import { store, persistor } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import { Colleges } from "./components/Colleges/Colleges";
import Professor from "./components/Professors/Professor";
import Home from "./components/Home/Home";
import { Layout, loader as collegeLoader } from "./components/Layout/Layout";
import Professors from "./components/Professors/Professors";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} />
      <Route element={<PrivateRoutes />}>
        <Route path="add-review/:professor_id" element={<AddReview />} />
      </Route>
      <Route path="colleges" loader={collegeLoader} element={<Layout />}>
        <Route index element={<input />} />
        <Route path=":college_id" element={<Professors />} />
        <Route path=":college_id/:professor_id" element={<Professor />} />
      </Route>
      <Route path="login" element={<Auth />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
