import { adminApi } from "@/api/admin";
import { CourseHeader } from "@/domain/course";
import { CardsShowcase } from "@/layout/common/CardsShowcase";
import { CourseItem } from "@/widgets";
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  Container,
  Grid2 as Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function CreateQAWave() {
  const navigate = useNavigate();
  const onClick = () => {
    setIsSubmitting(true);
    new Promise((resolve) => {
      setTimeout(() => {
        navigate("/admin", { state: { snackbar_text: "Волна СОП создана" } });
        resolve(void 0);
      }, 1000);
    });
  };
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  return (
    <Container maxWidth="lg">
      <Stack direction="column" gap={2}>
        <Typography variant="h4">Создать волну СОП</Typography>
        <QAWaveCreateControls />
        <Typography variant="h4">Курсы</Typography>
        <Card>
          <CardContent>
            <Stack gap={2}>
              <CoursesPicker />
            </Stack>
          </CardContent>
        </Card>
        <Stack direction="row" justifyContent="end">
          <Button
            variant="contained"
            onClick={onClick}
            loading={isSubmitting}
            loadingPosition="end"
          >
            Создать
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}

function CoursesPicker() {
  const [searchResults, setSearchResults] = useState<CourseHeader[]>();
  const [inputValue, setInputValue] = useState<string>("");
  const [courses, setCourses] = useState<CourseHeader[]>([]);

  useEffect(() => {
    adminApi.searchCourses(inputValue).then(setSearchResults);
  }, [inputValue]);

  return (
    <>
      <Autocomplete
        loading={searchResults === undefined}
        options={searchResults ?? []}
        inputValue={inputValue}
        getOptionLabel={(v) => v.title}
        onChange={(e, val) => {
          setTimeout(() => {
            setInputValue("");
          });
          if (!val) return;
          if (courses.filter((v) => v === val).length === 0) {
            // FIXME:
            setCourses((v) => [...v, val]);
          }
        }}
        onInputChange={(_, value) => setInputValue(value)}
        renderInput={(props) => (
          <TextField {...props} fullWidth label="Название курса" />
        )}
      />
      <CardsShowcase
        size={{ xs: 6, md: 4, lg: 3 }}
        cards={courses.map((v) => (
          <CourseItem onClick={() => {}} {...v} />
        ))}
      />
    </>
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
