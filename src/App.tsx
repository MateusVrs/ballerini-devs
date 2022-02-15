import { BrowserRouter, Route, Routes } from "react-router-dom";

import { DevsPage } from "./pages/DevsPage";
import { LandingPage } from "./pages/LandingPage";

export function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/devs" element={<DevsPage />} />
        </Routes>
      </BrowserRouter>
  )
}
