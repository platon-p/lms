import { useCourse } from "@/store/unit";
import ChapterView from "@/widgets/Chapter";
import CreateChapterDialog from "@/widgets/CreateChapterDialog";
import Description from "@mui/icons-material/Description";
import Quiz from "@mui/icons-material/Quiz";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function CourseContent(props: {
  courseId: string;
  onUnitClick: (unitId: string) => void;
}) {
  const course = useCourse(props.courseId);

  const [chapterDialogOpen, setChapterDialogOpen] = useState(false);

  if (!course)
    // TODO:
    return (
      <Stack direction="row" justifyContent="center">
        <CircularProgress />;
      </Stack>
    );

  const onCreateChapterClick = () => {
    setChapterDialogOpen(true);
  };
  const onChapterDialogClose = () => {
    setChapterDialogOpen(false);
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ py: 2, mb: 2 }}>
        <Stack direction="column" gap={2}>
          <Typography px={2} variant="h4">
            {course.title}
          </Typography>
          <Box px={2}>
            <Controls />
          </Box>
          {course.chapters.map((c) => {
            return <ChapterView chapter={c} onUnitClick={props.onUnitClick} />;
          })}
          <Button
            sx={{ mx: 2 }}
            variant="outlined"
            onClick={onCreateChapterClick}
          >
            Создать главу
          </Button>
        </Stack>
      </Paper>
      <CreateChapterDialog
        open={chapterDialogOpen}
        onClose={onChapterDialogClose}
      />
    </Container>
  );
}

function Controls() {
  const navigate = useNavigate();
  const textClick = () => {
    navigate("./builder/article");
  };
  const quizClick = () => {
    navigate("./builder/quiz");
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
      <Button variant="contained" startIcon={<Quiz />} onClick={quizClick}>
        Тест
      </Button>
    </Stack>
  );
}
