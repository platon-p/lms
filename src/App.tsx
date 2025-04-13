import { ThemeProvider } from "@emotion/react";
import {
  ThemeProvider as GravityThemeProvider,
  ToasterProvider,
} from "@gravity-ui/uikit";
import { toaster } from "@gravity-ui/uikit/toaster-singleton";
import { createTheme } from "@mui/material";
import { RouterProvider } from "react-router";
import "./app.css";
import { routes } from "./router";

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
          <RouterProvider router={routes} />
        </ToasterProvider>
      </GravityThemeProvider>
    </ThemeProvider>
  );
}
