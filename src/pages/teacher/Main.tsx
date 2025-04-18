import { teacherApi } from "@/api";
import { CourseHeader } from "@/domain/course";
import { CardsShowcase } from "@/layout/common/CardsShowcase";
import Header from "@/layout/student/Header";
import { CourseItem, CourseItemSkeleton } from "@/widgets";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Main() {
  const [courses, setCourses] = useState<CourseHeader[]>();
  useEffect(() => {
    teacherApi.getCourses().then(setCourses);
  }, []);

  return (
    <Container maxWidth="md">
      <AppBar>
        <Header maxWidth="md" />
      </AppBar>
      <Toolbar />
      <Typography sx={{ mt: 2 }} variant="h4">
        Курсы
      </Typography>
      <CardsShowcase
        size={{ xs: 6 }}
        cards={
          courses
            ? courses.map((v) => <CourseItem {...v} />)
            : Array.from({ length: 5 }).map(() => <CourseItemSkeleton />)
        }
      />
    </Container>
  );
}
