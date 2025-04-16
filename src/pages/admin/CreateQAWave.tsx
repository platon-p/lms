import {
  Card,
  CardContent,
  Container,
  Grid2 as Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function CreateQAWave() {
  return (
    <Container maxWidth="lg" sx={{ backgroundColor: "#f0f0f0" }}>
      <Stack direction="column" gap={2}>
        <Typography variant="h4">Создать волну СОП</Typography>
        <QAWaveCreateControls />
        <TextField label="название курса" />
        <Grid container spacing={2}>
          <CourseItem />
          <CourseItem />
          <CourseItem />
          <CourseItem />
          <CourseItem />
          <CourseItem />
          <CourseItem />
        </Grid>
      </Stack>
    </Container>
  );
}

function CourseItem() {
  return (
    <Grid size={{ xs: 6, md: 4, lg: 3 }}>
      <Card>
        <CardContent>asdad</CardContent>
      </Card>
      {/* <CourseItemSkeleton /> */}
    </Grid>
  );
}

function QAWaveCreateControls() {
  return (
    <Grid container spacing={2}>
      <Grid size={6}>
        <TextField label="название волны" required fullWidth />
      </Grid>
      <Grid size={3}>
        <TextField
          required
          label="начало"
          slotProps={{ inputLabel: { shrink: true } }}
          type="date"
          fullWidth
        />
      </Grid>
      <Grid size={3}>
        <TextField
          required
          fullWidth
          label="конец"
          type="date"
          slotProps={{ inputLabel: { shrink: true } }}
        />
      </Grid>
    </Grid>
  );
}
