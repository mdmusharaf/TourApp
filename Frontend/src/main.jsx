import { createRoot } from "react-dom/client";

import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Root from "./Layout/Root";
import Tours from "./assets/components/Tours";
import AddTour from "./assets/components/AddTour";
import TourDetail from "./assets/components/TourDetail";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Tours />} />
      <Route path="addtour" element={<AddTour />} />
      <Route path="tours/:id/" element={<TourDetail />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
    <Toaster position="top-right" />
  </>
);
