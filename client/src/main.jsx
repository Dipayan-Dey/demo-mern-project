import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Enquiry from "./components/Enquiry.jsx";

import "sweetalert2/dist/sweetalert2.min.css";
import Admin from "./components/Admin/Admin.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
          {/* <Route path="/" element={   <App />}/> */}
          <Route path="/" element={   <Enquiry />}/>
          {/* <Route path="/admin" element={   <Admin />}/> */}

      </Routes>
    </BrowserRouter>
 
    {/* <Enquiry /> */}
  </StrictMode>
);
