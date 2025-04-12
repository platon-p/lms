import {
  Auth,
  Course,
  Courses,
  QualityAssessment,
  Unit,
  UnitBuilderPage,
} from "@/pages";
import { ThemeProvider } from "@emotion/react";
import {
  ThemeProvider as GravityThemeProvider,
  ToasterProvider,
} from "@gravity-ui/uikit";
import { toaster } from "@gravity-ui/uikit/toaster-singleton";
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
      <GravityThemeProvider theme="light">
        <ToasterProvider toaster={toaster}>
          <BrowserRouter>
            <Routes>
              <Route path="auth" element={<Auth />} />
              <Route path="/">
                <Route path="testing" element={<QualityAssessment />} />
                <Route path="courses" element={<Courses />} />
                <Route path="course/:id" element={<Course />} />
                <Route path="course/:id/:unitId" element={<Unit />} />
              </Route>
              <Route path="admin">
                <Route path="text-unit" element={<UnitBuilderPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ToasterProvider>
      </GravityThemeProvider>
    </ThemeProvider>
  );
}
