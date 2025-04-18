import { CoursesShowcase } from "@/layout/admin/CoursesShowcase";
import { QABlock } from "@/layout/admin/QAWavesShowcase";
import Header from "@/layout/student/Header";
import {
  AppBar,
  Container,
  Snackbar,
  SnackbarContent,
  Toolbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

export default function Main() {
  const locState = useLocation().state;
  const loc = locState?.["snackbar_text"];

  const [snackOpen, setSnackOpen] = useState<boolean>(false);
  const [snackText, setSnackText] = useState<string>();

  useEffect(() => {
    if (!loc) return;
    setSnackOpen(true);
    setSnackText(loc);
    window.history.replaceState({ ...locState, snackbar_text: undefined }, "");
  }, [loc, locState]);

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <AppBar>
        <Header maxWidth="md" />
      </AppBar>
      <Toolbar />
      <CoursesShowcase />
      <QABlock />
      <Snackbar
        open={snackOpen}
        onClose={() => setSnackOpen(false)}
        autoHideDuration={5000}
      >
        <SnackbarContent message={snackText} />
      </Snackbar>
    </Container>
  );
}
