
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Events from "../pages/Events";
import Navbar from "../components/Navbar";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </BrowserRouter>
  );
}
