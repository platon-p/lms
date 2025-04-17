import CourseLayout from "@/layout/student/Course";

import { useUnit } from "@/store/unit";
import { CircularProgress, Stack, Toolbar } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import ArticleUnit from "./Article";
import QuizUnit from "./Quiz";

export default function Unit() {
  const { courseId, unitId } = useParams();
  const unit = useUnit(courseId!, unitId!)!;

  const view = () => {
    if (!unit) {
      return undefined;
    }

    switch (unit.type) {
      case "article":
        return <ArticleUnit unit={unit} />;
      case "quiz":
        return <QuizUnit unit={unit} />;
    }
  };

  const navigate = useNavigate();
  const onUnitClick = (unitId: string) => {
    navigate(`../${unitId}`);
  };

  return (
    <CourseLayout courseId={courseId!} onUnitClick={onUnitClick}>
      {unit ? (
        view()
      ) : (
        <Stack direction="row" justifyContent="center">
          <Toolbar />
          <CircularProgress />
        </Stack>
      )}
    </CourseLayout>
  );
}
