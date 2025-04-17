import { adminApi } from "@/api/admin";
import { QAWaveHeader } from "@/domain/qa";
import TeacherChip from "@/widgets/TeacherChip";
import AccessTime from "@mui/icons-material/AccessTime";
import Done from "@mui/icons-material/Done";
import Edit from "@mui/icons-material/Edit";
import {
  Autocomplete,
  Badge,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Container,
  Grid2,
  IconButton,
  Skeleton,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function AdminCourse() {
  const title = "Алгоритмы";
  const teacher = "Преподбек Училович";

  return (
    <Container maxWidth="md">
      <Stack gap={2} py={2}>
        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            sx={{
              px: 1,
              mx: -1,
              cursor: "pointer",
              transitionDuration: "200ms",
              "&:hover": { backgroundColor: "#f0f0f0", borderRadius: "4px" },
            }}
            variant="h3"
          >
            {title}
          </Typography>
          <Stack direction="row" gap={2} alignItems="center">
            <Tooltip title="Преподаватель курса">
              <TeacherChip name={teacher} />
            </Tooltip>
            <IconButton>
              <Edit />
            </IconButton>
          </Stack>
        </Stack>
        <Typography variant="h4">Студенты</Typography>
        <StudentsEditableList />
        <Typography variant="h4">Результаты СОП</Typography>
        <QAWaves />
      </Stack>
    </Container>
  );
}

function StudentsEditableList() {
  /** @deprecated */
  const allStudents = [
    "Иванов Иван",
    "Петров Пётр",
    "asdasd",
    "ddd",
    "dasdasd",
  ]; // TODO: migrate -> adminApi

  const [completionValue, setCompletionValue] = useState<string | null>();
  const [inputValue, setInputValue] = useState("");

  const [students, setStudents] = useState(allStudents);
  const addStudent = (name: string) => {
    if (students.includes(name)) return;
    setStudents([...students, name]);
  };

  return (
    <Card>
      <CardContent>
        <Stack gap={2}>
          {/* FIXME: */}
          <Autocomplete
            autoHighlight
            inputValue={inputValue}
            onInputChange={(e, v) => setInputValue(v)}
            value={completionValue}
            onChange={(e, v) => {
              if (!v) return;
              addStudent(v);
              setTimeout(() => {
                setInputValue("");
                setCompletionValue(null);
              });
            }}
            renderInput={(params) => <TextField {...params} label="Студент" />}
            options={allStudents}
          />
          <Stack direction="row" gap={2} sx={{ flexWrap: "wrap", rowGap: 1 }}>
            {students.map((v) => (
              <Chip label={v} onDelete={() => {}} />
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

function QAWaves() {
  const [qaWaves, setQAWaves] = useState<QAWaveHeader[] | undefined>();
  useEffect(() => {
    adminApi.getQaWaves().then(setQAWaves);
  }, []);
  const item = (wave: QAWaveHeader) => {
    return <QAWaveItem {...wave} />;
  };
  return (
    <Grid2 container spacing={2}>
      {qaWaves
        ? qaWaves.map((v) => <Grid2 size={6}>{item(v)}</Grid2>)
        : Array.from({ length: 6 }).map(() => (
            <Grid2 size={6}>
              <QAWaveItemSkeleton />
            </Grid2>
          ))}
    </Grid2>
  );
}

function QAWaveItem(props: QAWaveHeader) {
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="centerF"
          >
            <Typography>{props.title}</Typography>
            <Badge>{props.status === "done" ? <Done /> : <AccessTime />}</Badge>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function QAWaveItemSkeleton() {
  const s = useTheme().spacing(4);
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Skeleton
              variant="text"
              width="70%"
              sx={{ fontSize: (t) => t.typography.subtitle1 }}
            />
            <Skeleton variant="circular" height={s} width={s} />
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
