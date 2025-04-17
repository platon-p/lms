import { CardsShowcase } from "@/layout/common/CardsShowcase";
import { CourseItem } from "@/widgets";
import {
  Button,
  Container,
  Grid2 as Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function CreateQAWave() {
  return (
    <Container maxWidth="lg">
      <Stack direction="column" gap={2}>
        <Typography variant="h4">Создать волну СОП</Typography>
        <QAWaveCreateControls />
        <Typography variant="h4">Курсы</Typography>
        <TextField fullWidth label="Название курса" />
        <CardsShowcase
          size={{ xs: 6, md: 4, lg: 3 }}
          cards={[<CourseItem {...{ id: "", title: "asd" }} />]}
        />
        <Stack direction="row" justifyContent="end">
          <Button variant="contained">Создать</Button>
        </Stack>
      </Stack>
    </Container>
  );
}

function QAWaveCreateControls() {
  return (
    <Grid container spacing={2}>
      <Grid size={6}>
        <TextField label="Название волны" required fullWidth />
      </Grid>
      <Grid size={3}>
        <TextField
          required
          label="Начало"
          slotProps={{ inputLabel: { shrink: true } }}
          type="date"
          fullWidth
        />
      </Grid>
      <Grid size={3}>
        <TextField
          required
          fullWidth
          label="Конец"
          type="date"
          slotProps={{ inputLabel: { shrink: true } }}
        />
      </Grid>
    </Grid>
  );
}
