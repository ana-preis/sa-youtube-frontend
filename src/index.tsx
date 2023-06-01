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
import { handleFetchCategoryByID, handleFetchCategories } from "./services/CategoryServices";
import UserDetails from "./pages/UserDetails";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<PageBase />}>
      <Route path="home" 
        element={<Homepage />} 
        loader={() => {
          return handleFetchCategories()
        }} 
      />
      <Route path="signup" element={<SignUp />} />
      <Route path="login" element={<Login />} />
      <Route path="videos/:id" element={<VideoDetails />} loader={({ params }) => {
        return handleFetchVideoDetails(params.id)
      }} />
      <Route path="categories/:id" 
        element={<CategoryDetails />} 
        loader={({ params }) => {
          return handleFetchCategoryByID(params.id)
        }} 
      />
      <Route path="users/1" 
        element={<UserDetails />} 
        loader={({ params }) => {
          return handleFetchCategoryByID(params.id)
        }} 
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

reportWebVitals();
