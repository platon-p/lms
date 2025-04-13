import { mockLoadCourse } from "@/data/mock";
import { Chapter, Course, UnitHeader } from "@/domain/course";
import { default as CourseLayout } from "@/layout/student/Course";
import UnitIcon from "@/widgets/UnitIcon";
import { ArrowDropDown } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  Divider,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

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

function CourseContentSkeleton() {
  return (
    <Stack direction="column">
      <Typography p={2}>
        <Skeleton
          variant="text"
          width="80%"
          sx={{
            fontSize: (theme) => theme.typography.h4.fontSize,
          }}
        />
      </Typography>
      <Stack direction="column" aria-busy gap={2} p={2} divider={<Divider />}>
        {Array.from({ length: 5 }).map(() => (
          <ChapterSkeleton />
        ))}
      </Stack>
    </Stack>
  );
}

function CourseContentView({ chapters, title }: Course) {
  return (
    <Stack direction="column">
      <Typography variant="h4" p={2}>
        {title}
      </Typography>
      <Stack direction="column" spacing={1}>
        {chapters.map((chapter, i) => (
          <ChapterView key={i} name={chapter.name} units={chapter.units} />
        ))}
      </Stack>
    </Stack>
  );
}

function ChapterView(props: Chapter) {
  return (
    <Accordion disableGutters defaultExpanded elevation={0}>
      <AccordionSummary expandIcon={<ArrowDropDown />}>
        <Typography variant="h5">{props.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="column" spacing={1}>
          {props.units.map((unit) => (
            <UnitListItem {...unit} />
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}

function ChapterSkeleton() {
  return (
    <Stack direction="column" spacing={1}>
      <Skeleton variant="text" width="40%" height="2rem" />
      <Skeleton variant="rectangular" width="100%" height="3rem" />
      <Skeleton variant="rectangular" width="100%" height="3rem" />
    </Stack>
  );
}

function UnitListItem(props: UnitHeader) {
  const navigate = useNavigate();
  const goToTest = () => {
    if (props.type === "test") {
      navigate(`./${props.id}`);
    }
  };
  return (
    <Button
      onClick={goToTest}
      variant="outlined"
      size="large"
      sx={{ justifyContent: "start", gap: 1, textTransform: "none" }}
      startIcon={<UnitIcon type={props.type} />}
    >
      <Typography>{props.title}</Typography>
    </Button>
  );
}
