import { BrowserRouter, Route, Routes } from "react-router";
import { Auth, Courses, Testing } from "./pages";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="testing" element={<Testing />} />
        <Route path="auth" element={<Auth />} />
        <Route path="courses" element={<Courses />} />
      </Routes>
    </BrowserRouter>
  );
}
