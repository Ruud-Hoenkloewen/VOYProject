import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "../context/AuthContext";
import LandingPage from "../pages/LandingPage";
import EventsPage from "../pages/EventsPage";
import EventDetailPage from "../pages/EventDetailPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";

/**
 * Si el usuario ya está autenticado y navega a /login → redirigir a /.
 * Evita mostrar el formulario de login a alguien que ya inició sesión.
 */
function ProtectedLoginRoute() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />;
}

/**
 * Cada página gestiona su propio header:
 * - LandingPage      → EditorialHeader con nav links
 * - EventsPage       → Navbar con buscador
 * - EventDetailPage  → Navbar minimalista
 * - RegisterPage     → nav mínima
 * - LoginPage        → nav mínima (reutiliza RegisterPage.module.css)
 */
export default function AppRouter() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"           element={<LandingPage />} />
          <Route path="/events"     element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />
          <Route path="/register"   element={<RegisterPage />} />
          <Route path="/login"      element={<ProtectedLoginRoute />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
