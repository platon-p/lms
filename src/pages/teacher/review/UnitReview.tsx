import { useUnit } from "@/store/unit";
import { Container, Paper, Skeleton, Stack } from "@mui/material";
import { useParams } from "react-router";
import QuizReview from "./quiz/QuizReview";

export default function UnitReview() {
  const { courseId, unitId } = useParams();
  const unit = useUnit(courseId!, unitId!);

  if (!unit)
    // TODO:
    return <QuizSkeleton />;
  switch (unit.type) {
    case "quiz":
      return <QuizReview unit={unit} />;
    case "article":
      return <ArticleReview />;
  }
}

function QuizSkeleton() {
  return (
    <Container>
      <Stack gap={2}>
        <Skeleton width="40%" sx={{ fontSize: (t) => t.typography.h4 }} />
        <Skeleton width="100%" variant="rounded" sx={{ height: 60 }} />
        <Paper sx={{ p: 2 }}>
          <Stack direction="row" gap={2}>
            <Skeleton width="20%" sx={{ height: 50 }} />
            <Skeleton width="10%" sx={{ height: 50 }} />
            <Skeleton width="30%" sx={{ height: 50 }} />
            <Skeleton width="40%" sx={{ height: 50 }} />
          </Stack>
          <Stack direction="row" gap={2}>
            <Skeleton variant="rounded" width="20%" sx={{ height: 550 }} />
            <Skeleton variant="rounded" width="10%" sx={{ height: 550 }} />
            <Skeleton variant="rounded" width="30%" sx={{ height: 550 }} />
            <Skeleton variant="rounded" width="40%" sx={{ height: 550 }} />
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}

function ArticleReview() {
  return "TODO:";
}
