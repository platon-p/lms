import { default as CourseLayout } from "@/layout/student/Course";
import {
  CourseContentSkeleton,
  CourseContentView,
} from "@/layout/student/CourseContent";
import { useCourse } from "@/store/unit";
import { Container, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router";

export default function Course() {
  const { courseId } = useParams();
  const course = useCourse(courseId!);

  const navigate = useNavigate();
  const onUnitClick = (unitId: string) => {
    navigate(`./${unitId}`);
  };

  return (
    <CourseLayout courseId={courseId!} onUnitClick={onUnitClick}>
      <Container maxWidth="md">
        <Paper elevation={2}>
          {course ? (
            <CourseContentView {...course} />
          ) : (
            <CourseContentSkeleton />
          )}
        </Paper>
      </Container>
    </CourseLayout>
  );
}
