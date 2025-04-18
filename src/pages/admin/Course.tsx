import { adminApi } from "@/api/admin";
import { CourseHeader } from "@/domain/course";
import { Student } from "@/domain/profiles";
import { QAWaveHeader } from "@/domain/qa";
import CourseMeta, { CourseMetaSkeleton } from "@/layout/admin/CourseMeta";
import StudentsEditableList from "@/layout/admin/StudentsEditableList";
import { CardsShowcase } from "@/layout/common/CardsShowcase";
import QAWaveCard, { QAWaveItemSkeleton } from "@/widgets/QAWaveCard";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function AdminCourse() {
  const { courseId } = useParams();
  const [course, setCourse] = useState<
    CourseHeader & {
      teacher: string;
      qaWaves: QAWaveHeader[];
      students: Student[];
    }
  >();

  useEffect(() => {
    adminApi.getCourse(courseId!).then(setCourse);
  }, [courseId]);

  const onStudentsSubmit = async (
    created: Student[],
    deleted: Student[]
  ): Promise<Student[]> => {
    // sleep 1000ms
    if (!course) return [];
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newStudents = ((prev: Student[]) =>
      prev.filter((s) => !deleted.includes(s)).concat(created))(
      course.students
    );
    setCourse((prev) => ({
      ...prev!,
      students: newStudents,
    }));
    // TODO: update course 4real
    return newStudents;
  };

  return (
    <Container maxWidth="md">
      <Stack gap={2} py={2}>
        {course ? <CourseMeta course={course} /> : <CourseMetaSkeleton />}
        <Accordion defaultExpanded>
          <AccordionSummary>
            <Typography variant="h4">Студенты</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {course?.students ? (
              <StudentsEditableList
                onSubmit={onStudentsSubmit}
                studentsInitial={course.students}
              />
            ) : (
              <StudentsEditableListSkeleton />
            )}
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary>
            <Typography variant="h4">Результаты СОП</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <QAWaves qaWaves={course?.qaWaves} />
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Container>
  );
}

function StudentsEditableListSkeleton() {
  return (
    <Stack gap={2}>
      <Skeleton variant="rounded" height={50} width="100%" />
      <Stack
        direction="row"
        gap={2}
        sx={{ flexWrap: "wrap", rowGap: 1 }}
        p={2}
        component={(props) => <Paper {...props} p={2} variant="outlined" />}
      >
        {Array.from({ length: 3 }).map(() => (
          <Skeleton
            variant="rounded"
            sx={{ borderRadius: 999 }}
            height={30}
            width={120}
          />
        ))}
      </Stack>
    </Stack>
  );
}

function QAWaves({ qaWaves }: { qaWaves?: QAWaveHeader[] }) {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const onClick = (waveId: string) => {
    if (qaWaves?.find((v) => v.id === waveId)?.status === "finished") {
      navigate(`/admin/qa/${waveId}/course/${courseId}`); // FIXME:
    }
  };
  return (
    <CardsShowcase
      emptyCaption="Нет прикреплённых волн СОП"
      size={6}
      cards={
        qaWaves
          ? qaWaves.map((v) => (
              <QAWaveCard onClick={() => onClick(v.id)} wave={v} />
            ))
          : Array.from({ length: 4 }).map(() => <QAWaveItemSkeleton />)
      }
    />
  );
}
