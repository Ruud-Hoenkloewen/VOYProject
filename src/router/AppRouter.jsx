import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "../context/AuthContext";

// ── Lazy loading — cada ruta descarga su chunk solo cuando se necesita
const LandingPage     = lazy(() => import("../pages/LandingPage"));
const EventsPage      = lazy(() => import("../pages/EventsPage"));
const EventDetailPage = lazy(() => import("../pages/EventDetailPage"));
const RegisterPage    = lazy(() => import("../pages/RegisterPage"));
const LoginPage       = lazy(() => import("../pages/LoginPage"));

/** Fallback minimalista durante la carga del chunk */
function PageLoader() {
  return (
    <div style={{ minHeight: "100vh", background: "#080808", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ color: "#333", fontSize: "0.7rem", letterSpacing: "0.2em", fontFamily: "monospace" }}>
        CARGANDO...
      </span>
    </div>
  );
}

/** Redirige a / si el usuario ya está autenticado */
function ProtectedLoginRoute() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />;
}

/**
 * Cada página gestiona su propio header:
 * - LandingPage      → EditorialHeader con nav links
 * - EventsPage       → Navbar con buscador
 * - EventDetailPage  → Navbar minimalista
 * - RegisterPage / LoginPage → nav mínima
 */
export default function AppRouter() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/"           element={<LandingPage />} />
            <Route path="/events"     element={<EventsPage />} />
            <Route path="/events/:id" element={<EventDetailPage />} />
            <Route path="/register"   element={<RegisterPage />} />
            <Route path="/login"      element={<ProtectedLoginRoute />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}
