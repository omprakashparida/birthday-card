import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import CreateCard from "../pages/CreateCard";
import ViewCard from "../pages/ViewCard"; // <-- This imports the file below
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateCard />} />
        <Route path="/card/:slug" element={<ViewCard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;