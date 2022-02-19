import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthContextProvider } from "./contexts/AuthContext";
import { DevsModalContextProvider } from "./contexts/DevsModalContext";
import { LoandingContextProvider } from "./contexts/LoadingContext";

import { ChatPage } from "./pages/ChatPage";
import { DevsPage } from "./pages/DevsPage";
import { LandingPage } from "./pages/LandingPage";

export function App() {
  return (
    <LoandingContextProvider>
      <DevsModalContextProvider>
        <AuthContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/devs" element={<DevsPage />} />
              <Route path="/chat" element={<ChatPage />} />
            </Routes>
          </BrowserRouter>
        </AuthContextProvider>
      </DevsModalContextProvider>
    </LoandingContextProvider>
  )
}
