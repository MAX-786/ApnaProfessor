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
import {
  Colleges,
  loader as collegeLoader,
} from "./components/Colleges/Colleges";
import Professor from "./components/Professors/Professor";
import Home from "./components/Home/Home";
import { Layout } from "./components/Layout/Layout";
import Professors from "./components/Professors/Professors";
import AddCollege from "./components/AddCollege/AddCollege";
import AddProfessor from "./components/AddProfessor/AddProfessor";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} />
      <Route element={<PrivateRoutes />}>
        <Route path="add" element={<Layout />}>
          <Route path="college" element={<AddCollege />} />
          <Route path="professor" element={<AddProfessor />} />
          <Route path="review/:professor_id" element={<AddReview />} />
        </Route>
      </Route>
      <Route path="colleges" element={<Layout />}>
        <Route index loader={collegeLoader} element={<Colleges />} />
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
