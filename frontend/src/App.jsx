import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import ShowList from "./pages/ShowList";
import NewList from "./pages/NewList";
import EditList from "./pages/EditList";
import Layout from "./pages/Layout";
import AllListings from "./pages/AllListings";
import SignupLogin from "./pages/SignupLogin";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route
          path="*"
          element={
            <NotFound/>
          }
        />
        <Route path="/home/listings" element={<AllListings />} />
        <Route path="/home/listings/:id" element={<ShowList />} />
        <Route path="/home/listings/new" element={<NewList />} />
        <Route path="/home/listings/edit/:id" element={<EditList />} />
          <Route path="/home/profile" element={<Profile/>}/>
        <Route path="/login" element={<SignupLogin />} />
        <Route path="/signup" element={<SignupLogin />} />
          
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
