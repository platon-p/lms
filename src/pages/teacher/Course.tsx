import { mockLoadCourse } from "@/data/mock";
import { Course as CourseType } from "@/domain/course";
import {
  CourseContentSkeleton,
  CourseContentView,
} from "@/layout/CourseContent";
import CourseLayout from "@/layout/student/Course";
import ChapterView from "@/widgets/Chapter";
import { Description, Quiz } from "@mui/icons-material";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function Course() {
  const { id } = useParams();
  const [course, setCourse] = useState<CourseType | undefined>();
  useEffect(() => {
    mockLoadCourse().then(setCourse);
  }, [id]);
  if (!course?.chapters) return "a";
  return (
    <CourseLayout
      sideBarProps={course?.chapters && { chapters: course.chapters }}
    >
      <Container maxWidth="md">
        <Stack direction="column" gap={2}>
          <Typography px={2} variant="h4">
            {course.title}
          </Typography>
          <Box px={2}>
            <Controls />
          </Box>
          {course.chapters.map((c) => {
            return <ChapterView {...c} />;
          })}
        </Stack>
        {course ? <CourseContentView {...course} /> : <CourseContentSkeleton />}
      </Container>
    </CourseLayout>
  );
}
function Controls() {
  const navigate = useNavigate();
  const textClick = () => {
    navigate("./builder/text");
  };
  const testClick = () => {
    navigate("./builder/test");
  };

  return (
    <Stack direction="row" gap={2}>
      <Button
        variant="contained"
        startIcon={<Description />}
        onClick={textClick}
      >
        Статья
      </Button>
      <Button variant="contained" startIcon={<Quiz />} onClick={testClick}>
        Тест
      </Button>
    </Stack>
  );
}
