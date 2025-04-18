import { ThemeProvider } from "@emotion/react";
import {
  ThemeProvider as GravityThemeProvider,
  ToasterProvider,
} from "@gravity-ui/uikit";
import "@gravity-ui/uikit/styles/styles.css";
import { toaster } from "@gravity-ui/uikit/toaster-singleton";
import { createTheme } from "@mui/material";
import { RouterProvider } from "react-router";
import "./app.css";
import { router } from "./router";

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
          <RouterProvider router={router} />
        </ToasterProvider>
      </GravityThemeProvider>
    </ThemeProvider>
  );
}
