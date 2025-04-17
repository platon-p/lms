import { CoursesShowcase } from "@/layout/admin/CoursesShowcase";
import { QABlock } from "@/layout/admin/QAWavesShowcase";
import {
  Container
} from "@mui/material";

export default function Main() {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <QABlock />
      <CoursesShowcase />
    </Container>
  );
}
