import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router";
import { Auth, Course, Courses, Testing } from "./pages";

const theme = createTheme({
  typography: {
    h4: {
      fontSize: "2rem",
    }
  }
});

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="testing" element={<Testing />} />
          <Route path="auth" element={<Auth />} />
          <Route path="courses" element={<Courses />} />
          <Route path="course/:id" element={<Course />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
