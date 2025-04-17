import CoursesShowcase from "@/layout/student/CoursesShowcase";
import Header from "@/layout/student/Header";
import QAsShowcase from "@/layout/student/QAsShowcase";
import {
  AppBar,
  Container,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

export default function Main() {
  return (
    <Container maxWidth="md">
      <AppBar>
        <Header maxWidth="md" />
      </AppBar>
      <Stack direction="column" spacing={2}>
        <Toolbar />
        <Typography variant="h4">СОПы</Typography>
        <QAsShowcase />
        <Typography variant="h4">Курсы</Typography>
        <Paper sx={{ p: 2 }}>
          <CoursesShowcase />
        </Paper>
      </Stack>
    </Container>
  );
}
