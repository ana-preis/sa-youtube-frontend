import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from "react-router-dom";
import './index.css';
import './App.css';
import { handleFetchCategoryByID, handleFetchCategories } from "./services/CategoryServices";
import { handleFetchVideoDetails } from "./services/VideoServices";
import { handleMe } from './services/UserService';

import PageBase from './layouts/PageBase';
import Homepage from './pages/Homepage'
import SignUp from './pages/SignUp';
import VideoDetails from './pages/VideoDetails';
import Login from "./pages/Login";
import CategoryDetails from "./pages/CategoryDetails";
import UserDetails from "./pages/UserDetails";
import Categories from './pages/Categories';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={ <PageBase /> }>
      <Route 
        path="/" 
        element={ <Homepage /> }
        errorElement={ <Login isErrorRedirect={true}/> }
        loader={() => {
          return handleFetchCategories()
        }} 
      />
      <Route
        path="signup"
        element={ <SignUp /> }
        errorElement={ <Login isErrorRedirect={true}/> }
      />
      <Route
        path="login"
        element={ <Login /> }
        errorElement={ <Login/> }
      />
      <Route 
        path="/categories" 
        element={ <Categories /> }
        errorElement={ <Login isErrorRedirect={true}/> }
        loader={() => {
          return handleFetchCategories()
        }}
      />
      <Route
        path="videos/:id" 
        element={ <VideoDetails /> }
        errorElement={ <Login isErrorRedirect={true}/> }
        loader={({ params }) => {
          return handleFetchVideoDetails(params.id)
        }}
      />
      <Route
        path="categories/:id"
        element={ <CategoryDetails /> }
        errorElement={ <Login isErrorRedirect={true}/> }
        loader={({ params }) => {
          return handleFetchCategoryByID(params.id)
        }}
      />
      <Route
        path="users/profile"
        element={ <UserDetails /> }
        errorElement={ <Login isErrorRedirect={true}/> }
        loader={() => {
          return handleMe()
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
