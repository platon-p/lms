import { ArrowDropDown, Description, Quiz } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { mockLoadCourse } from "../data/mock";
import { Chapter, Course, UnitHeader, UnitType } from "../domain/unit";

function CourseSideBar(props: { chapters: Chapter[] }) {
  return (
    <List
      sx={{
        width: "100%",
        maxHeight: "100vh",
        overflow: "scroll",
      }}
    >
      <ListItem>
        <Typography variant="h6">Содержание</Typography>
      </ListItem>
      {props.chapters.map((chapter, i) => (
        <ListItem disablePadding key={i}>
          <ListItemButton LinkComponent={"a"} href={`#${i}`}>
            <ListItemText primary={chapter.name} secondary="asd" />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default function CoursePage() {
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
      <Paper
        elevation={2}
        sx={{
          minWidth: "10rem",
          width: "30%",
          position: "sticky",
          alignSelf: "start",
          top: 0,
        }}
      >
        {course ? (
          <CourseSideBar chapters={course.chapters} />
        ) : (
          <CourseSideBarSkeleton />
        )}
      </Paper>
      <Stack
        component={(props) => <Paper {...props} elevation={2} />}
        sx={{ width: "85%", padding: 2, height: "100%" }}
      >
        {course ? <CourseContentView {...course} /> : <CourseContentSkeleton />}
      </Stack>
    </Stack>
  );
}

function CourseSideBarSkeleton() {
  return (
    <List
      sx={{
        width: "100%",
        maxHeight: "100vh",
        overflow: "scroll",
      }}
    >
      <ListItem>
        <Typography variant="h6">Содержание</Typography>
      </ListItem>
      {Array.from({ length: 8 }).map(() => (
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary={<Skeleton width="70%" height="1.5rem" />} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
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
      <Stack direction="column" spacing={1} >
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
    <Stack direction="column" gap={1}>
      <Skeleton variant="text" width="40%" height="2rem" />
      <Skeleton variant="rectangular" width="100%" height="3rem" />
      <Skeleton variant="rectangular" width="100%" height="3rem" />
    </Stack>
  );
}

function UnitListItem(props: UnitHeader) {
  return (
    <Stack
      direction="row"
      gap={2}
      sx={{ border: "1px solid #aaa", borderRadius: 2, padding: 2 }}
    >
      <UnitIcon type={props.type} />
      <Typography>{props.title}</Typography>
    </Stack>
  );
}

function UnitIcon(props: { type: UnitType | never }) {
  switch (props.type) {
    case "text":
      return <Description />;
    case "test":
      return <Quiz />;
    default:
      // eslint-disable-next-line no-case-declarations
      const check: never = props.type;
      throw new Error(`Unknown unit type: ${check}`);
  }
}
