import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Events from "../pages/Events";
import Navbar from "../design-system/composites/Navbar/Navbar";
import Container from "../design-system/layout/Container/Container";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Container>
        <Navbar /> 
      </Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </BrowserRouter>
  );
}
