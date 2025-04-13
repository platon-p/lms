import { mockLoadCourse } from "@/data/mock";
import { Course } from "@/domain/course";
import { CourseContentSkeleton, CourseContentView } from "@/layout/CourseContent";
import { default as CourseLayout } from "@/layout/student/Course";
import {
  Container,
  Paper
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function CoursePage() {
  const { id } = useParams();
  const [course, setCourse] = useState<Course | undefined>();
  useEffect(() => {
    mockLoadCourse().then(setCourse);
  }, [id]);

  return (
    <CourseLayout
      sideBarProps={
        course?.chapters && { chapters: course.chapters, selectedId: 0 }
      }
    >
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
