import { teacherApi } from "@/api/teacher";
import { StudentQuizReport } from "@/domain/review";
import SolutionReview from "@/widgets/task/review/Solution";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function ReviewByStudent() {
  const { courseId, unitId, studentId } = useParams();

  const [report, setReport] = useState<StudentQuizReport>();
  const studentName = report?.student.name;

  useEffect(() => {
    teacherApi
      .getQuizReportByStudent(courseId!, unitId!, studentId!)
      .then(setReport);
  }, [courseId, unitId, studentId]);
  const navigate = useNavigate();
  const onSubmit = () => {
    navigate("../");
  };
  return (
    <Container maxWidth="md">
      <Stack direction="column" gap={2}>
        <Typography variant="h4">{studentName}</Typography>
        {report?.solutions?.map((v) => (
          <SolutionReview report={v} />
        ))}
        {report && <Controls total={report.total!} onSubmit={onSubmit} />}{" "}
        {/* FIXME: */}
      </Stack>
    </Container>
  );
}

function Controls(props: { total: number; onSubmit?: () => void }) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography>Всего баллов: {props.total}</Typography>
      <Button variant="outlined" onClick={props.onSubmit}>
        завершить проверку
      </Button>
    </Stack>
  );
}
