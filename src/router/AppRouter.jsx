import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import EventsPage from "../pages/EventsPage";
import EventDetailPage from "../pages/EventDetailPage";
import RegisterPage from "../pages/RegisterPage";

/**
 * Cada página gestiona su propio header:
 * - LandingPage  → header editorial con nav links
 * - EventsPage   → Navbar con buscador
 * - EventDetailPage → Navbar minimalista o propio
 * - RegisterPage → nav mínima (sin header completo)
 */
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetailPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
