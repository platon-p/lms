import { mockLoadCourse } from "@/data/mock";
import { Chapter, Course, UnitHeader } from "@/domain/course";
import {
  CourseSideBar,
  CourseSideBarSkeleton,
} from "@/layout/student/CourseSideBar";
import UnitIcon from "@/widgets/UnitIcon";
import { ArrowDropDown } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Paper,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function CoursePage() {
  const lessSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const { id } = useParams();
  const [course, setCourse] = useState<Course | undefined>();
  useEffect(() => {
    mockLoadCourse().then(setCourse);
  }, [id]);

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        maxWidth: "lg",
        justifyContent: "center",
        marginX: "auto",
        marginTop: 2,
      }}
    >
      <Box
        sx={{
          display: lessSm ? "none" : undefined,
          position: "sticky",
          alignSelf: "start",
          top: 0,
        }}
      >
        {course && course.chapters ? (
          <CourseSideBar chapters={course.chapters} selectedId={1} />
        ) : (
          <CourseSideBarSkeleton />
        )}
      </Box>
      <Stack
        component={(props) => <Paper {...props} elevation={2} />}
        sx={{ width: "100%", padding: 2, height: "100%" }}
      >
        {course ? <CourseContentView {...course} /> : <CourseContentSkeleton />}
      </Stack>
    </Stack>
  );
}

function CourseContentSkeleton() {
  return (
    <Stack direction="column" spacing={4}>
      <Skeleton variant="text" width="80%" height="3rem" />
      <Stack direction="column" spacing={2} divider={<Divider />}>
        {Array.from({ length: 5 }).map(() => (
          <ChapterSkeleton />
        ))}
      </Stack>
    </Stack>
  );
}

function CourseContentView({ chapters, title }: Course) {
  return (
    <Stack>
      <Typography variant="h4" padding={2}>
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
      sx={{justifyContent: "start", gap: 1, textTransform: "none"}}
      startIcon={<UnitIcon type={props.type} />}
    >
      <Typography>{props.title}</Typography>
    </Button>
  );
}
