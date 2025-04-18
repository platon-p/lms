import { adminApi } from "@/api/admin";
import { CourseHeader } from "@/domain/course";
import { CardsShowcase } from "@/layout/common/CardsShowcase";
import CourseItem, { CourseItemSkeleton } from "@/widgets/CourseItem";
import Add from "@mui/icons-material/Add";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function CoursesShowcase() {
  const [courses, setCourses] = useState<CourseHeader[]>();
  const [totalCount, setTotalCount] = useState<number>();
  const onCreateCourseClick = () => {
    setDialogOpen(true);
  };

  useEffect(() => {
    adminApi.getCourses().then((v) => {
      setCourses(v.courses);
      setTotalCount(v.count);
    });
  }, []);

  const [dialogOpen, setDialogOpen] = useState(false);
  const onDialogClose = () => {
    setDialogOpen(false);
  };
  const navigate = useNavigate();
  const onCreate = () => {
    onDialogClose();
    navigate("/admin", { state: { snackbar_text: "Курс создан" } });
  };
  return (
    <>
      <CreateCourseDialog
        open={dialogOpen}
        onClose={onDialogClose}
        onSubmit={onCreate}
      />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ArrowDropDown />}>
          <Stack direction="row" gap={4}>
            <Typography variant="h4">Курсы</Typography>
            {totalCount ? (
              <Typography
                variant="h5"
                color="text.secondary"
                alignContent="center"
              >
                {totalCount}
              </Typography>
            ) : (
              <Skeleton width={25} />
            )}
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="row" gap={2} my={2}>
            <TextField fullWidth label="Найти курс" />
            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{ flexShrink: 0 }}
              onClick={onCreateCourseClick}
            >
              Создать
            </Button>
          </Stack>
          <CardsShowcase
            size={{ xs: 12, sm: 6, md: 4 }}
            cards={
              courses
                ? courses.map((v) => <CourseItem {...v} />)
                : Array.from({ length: 5 }).map(() => <CourseItemSkeleton />)
            }
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
}

function CreateCourseDialog(props: {
  open: boolean;
  onClose?: () => void;
  onSubmit?: (name: string, teacher: string) => void;
}) {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Создать курс</DialogTitle>
      <DialogContent>
        <Stack gap={1} py={1} sx={{ minWidth: "25rem" }}>
          <TextField required label="Название курса" />
          <TeacherPicker textFieldProps={{ required: true }} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Отмена</Button>
        <Button
          variant="outlined"
          type="submit"
          onClick={() => props.onSubmit?.("TODO:", "")}
        >
          Создать
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function TeacherPicker({
  textFieldProps,
}: {
  textFieldProps?: TextFieldProps;
}) {
  const searchResults = ["Марья Ивановна", "Иван Петрович", "Василий Иванович"];
  return (
    <Autocomplete
      renderInput={(params) => (
        <TextField {...params} {...textFieldProps} label="Преподаватель" />
      )}
      options={searchResults}
    />
  );
}
