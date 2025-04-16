import { mockLoadQAWaves } from "@/data/mock";
import { QAWaveHeader } from "@/domain/qa";
import AdminSideBar from "@/layout/admin/SideBar";
import { AccessTime, Done, Edit } from "@mui/icons-material";
import {
  Autocomplete,
  Avatar,
  Badge,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Container,
  Drawer,
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
  const allStudents = [
    "Иванов Иван",
    "Петров Пётр",
    "asdasd",
    "ddd",
    "dasdasd",
  ];
  const teacher = "Преподбек Училович";
  const [completionValue, setCompletionValue] = useState<string | null>();
  const [inputValue, setInputValue] = useState("");

  return (
    <Stack direction="row">
      <Drawer
        variant="permanent"
        PaperProps={{ sx: { width: "20rem" } }}
        sx={{ width: "20rem" }}
      >
        <AdminSideBar />
      </Drawer>
      <Container maxWidth="md">
        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          py={2}
          justifyContent="space-between"
        >
          <Stack direction="row" gap={2}>
            <Typography
              sx={{
                px: 1,
                mx: -1,
                cursor: "pointer",
                transitionDuration: "200ms",
                "&:hover": { backgroundColor: "#f2f2f2", borderRadius: "4px" },
              }}
              variant="h4"
            >
              {title}
            </Typography>
          </Stack>
          <Stack direction="row" gap={2} alignItems="center">
            <Tooltip title="Преподаватель курса">
              <Chip label={teacher} avatar={<Avatar>A</Avatar>} />
            </Tooltip>
            <IconButton>
              <Edit />
            </IconButton>
          </Stack>
        </Stack>
        <Typography variant="h4">Студенты</Typography>
        <Autocomplete
          slotProps={{
            chip: {
              avatar: <Avatar>asdsa</Avatar>,
            },
          }}
          multiple
          autoHighlight
          inputValue={inputValue}
          onInputChange={(e, v) => setInputValue(v)}
          // value={completionValue}
          onChange={(e, v) => {
            // if (!v) return;
            // addStudent(v);
            // setCompletionValue(null);
            // setTimeout(() => {
            //   setInputValue("");
            // });
          }}
          renderInput={(params) => <TextField {...params} label="Search" />}
          options={allStudents}
        />

        <Typography variant="h4">Результаты СОП</Typography>
        <QAWaves />
      </Container>
    </Stack>
  );
}

function QAWaves() {
  const [qaWaves, setQAWaves] = useState<QAWaveHeader[] | undefined>();
  useEffect(() => {
    mockLoadQAWaves().then(setQAWaves);
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
  const s = useTheme().typography.pxToRem(24);
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
