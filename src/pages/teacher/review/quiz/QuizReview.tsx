import {
  AllStudentsQuizReport,
  StudentQuizReportPreview,
} from "@/domain/review";
import { QuizUnitInfo } from "@/domain/unit";
import { Delete, QuestionAnswer } from "@mui/icons-material";
import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";
import {
  Avatar,
  Button,
  Chip,
  ChipOwnProps,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { matchSorter } from "match-sorter";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function QuizReview({ unit }: { unit: QuizUnitInfo }) {
  const navigate = useNavigate();
  const onStudentReviewClick = (studentId: string) => {
    navigate(`student/${studentId}`);
  };

  return (
    <Container maxWidth="lg">
      <Stack direction="column" gap={2}>
        <UnitReviewControls title={unit.title} />
        <StudentsReport onStudentReviewClick={onStudentReviewClick} />
      </Stack>
    </Container>
  );
}

function UnitReviewControls(props: { title: string }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const onDeleteDialogOpen = () => setDeleteDialogOpen(false);
  const onDeleteClick = () => setDeleteDialogOpen(true);

  return (
    <Stack direction="row">
      <DeleteUnitDialog open={deleteDialogOpen} onClose={onDeleteDialogOpen} />
      <Typography sx={{ flexGrow: 1 }} variant="h4">
        {props.title}
      </Typography>
      <Button
        onClick={onDeleteClick}
        color="error"
        variant="outlined"
        startIcon={<Delete />}
      >
        Удалить
      </Button>
    </Stack>
  );
}

function DeleteUnitDialog(props: {
  open: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
}) {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Точно удалить этот элемент?</DialogTitle>
      <DialogContent>
        <DialogContentText>Восстановить будет невозможно</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Отмена</Button>
        <Button color="error" variant="outlined" onClick={props.onSubmit}>
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const doFilter = (data: StudentQuizReportPreview[], query: string) =>
  matchSorter(data, query, {
    keys: ["student.name"],
  });

const initialReports = Array.from({ length: 50 }).map((_, i) => ({
  student: { id: "id", name: `Student ${i}` },
  solutions: [{ id: 1, correct: true }, { id: 2, correct: false }, { id: 3 }],
  status: "in-progress",
  total: 10,
})) satisfies StudentQuizReportPreview[];

const fullReport: AllStudentsQuizReport = {
  tasks: [1, 2, 3],
  reports: initialReports,
};

const statusToString: Record<QuizUnitInfo["status"], string> = {
  finished: "завершён",
  reviewing: "ожидает проверки",
  "in-progress": "в процессе",
  "not-started": "не начат",
};

const statusToColor: Record<QuizUnitInfo["status"], ChipOwnProps["color"]> = {
  finished: "success",
  reviewing: "warning",
  "in-progress": "info",
  "not-started": "default",
};

function StudentsReport(props: {
  onStudentReviewClick: (studentId: string) => void;
}) {
  const [reports, setReports] = useState<StudentQuizReportPreview[]>(
    fullReport.reports,
  );
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    setReports(doFilter(fullReport.reports, searchValue));
  }, [searchValue]);

  const navigate = useNavigate();
  const onTaskIdClick = (taskId: number) => navigate(`task/${taskId}`);

  return (
    <>
      <TextField
        fullWidth
        label="поиск студента"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <TableContainer
        component={Paper}
        sx={{ maxHeight: (t) => t.spacing(80) }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Студент</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Результат</TableCell>
              {fullReport.tasks.map((v) => (
                <TableCell align="center" onClick={() => onTaskIdClick(v)}>
                  <Tooltip title="Отчёт по заданию" placement="top">
                    <Button sx={{}}>#{v}</Button>
                  </Tooltip>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((v) => (
              <ReportRow
                report={v}
                onClick={() => props.onStudentReviewClick(v.student.id)}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

function ReportRow({
  report,
  onClick,
}: {
  report: StudentQuizReportPreview;
  onClick?: () => void;
}) {
  const label = statusToString[report.status];

  return (
    <TableRow hover onClick={onClick} sx={{ cursor: "pointer" }}>
      <TableCell>
        <Student name={report.student.name} />
      </TableCell>
      <TableCell>
        <Chip
          label={label}
          color={statusToColor[report.status]}
          variant="outlined"
          size="medium"
        />
      </TableCell>
      <TableCell>{report.total}</TableCell>
      {fullReport.tasks.map((v, i) => {
        const row = report.solutions?.[i];

        return (
          <TableCell align="center">
            {!report.solutions ? (
              "N/A"
            ) : row!.correct === true ? (
              <Check color="success" />
            ) : row!.correct === false ? (
              <Close color="error" />
            ) : (
              <QuestionAnswer color="disabled" />
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
}

function Student(props: { name: string }) {
  return (
    <Chip
      avatar={
        <Avatar sx={{ width: 24, height: 24 }}>
          {props.name.substring(0, 1)}
        </Avatar>
      }
      label={props.name}
    />
  );
}
