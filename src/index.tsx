import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import PageBase from './layouts/PageBase';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Homepage from './pages/Homepage'
import SignUp from './pages/SignUp';
import VideoDetails from './pages/VideoDetails';
import Login from "./pages/Login";
import { handleFetchVideoDetails } from "./services/VideoServices";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from "react-router-dom";
import CategoryDetails from "./pages/CategoryDetails";
import { handleFetchCategoryByID } from "./services/CategoryServices";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<PageBase />}>
      <Route path="home" element={<Homepage />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="login" element={<Login />} />
      <Route path="videos/:id" element={<VideoDetails />} loader={({ params }) => {
        return handleFetchVideoDetails(params.id)
      }} />
      <Route path="categories/1" 
        element={<CategoryDetails />} 
        // loader={({ params }) => {
        //   return handleFetchCategoryByID(params.id)
        // }} 
      />
    </Route>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
