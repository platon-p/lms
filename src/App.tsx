import {
  Auth,
  Course,
  Courses,
  QualityAssessment,
  UnitBuilderPage,
} from "@/pages";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router";

const theme = createTheme({
  typography: {
    h4: {
      fontSize: "2rem",
    },
  },
});

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="auth" element={<Auth />} />
          <Route path="/">
            <Route path="testing" element={<QualityAssessment />} />
            <Route path="courses" element={<Courses />} />
            <Route path="course/:id" element={<Course />} />
          </Route>
          <Route path="admin">
            <Route path="text-unit" element={<UnitBuilderPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
