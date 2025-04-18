import { adminApi } from "@/api/admin";
import { CourseHeader } from "@/domain/course";
import { QAWaveReview as QAWaveReviewData, QAWaveStatus } from "@/domain/qa";
import StudentStatusesReview, {
  StudentStatusesReviewSkeleton,
} from "@/layout/admin/qa/StudentStatusesReview";
import { CardsShowcase } from "@/layout/common/CardsShowcase";
import Header from "@/layout/student/Header";
import { CourseItem, CourseItemSkeleton } from "@/widgets";

import {
  Alert,
  AppBar,
  Box,
  Chip,
  ChipOwnProps,
  Container,
  Skeleton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function QAWaveReview() {
  const { qaWaveId } = useParams();
  const [review, setReview] = useState<QAWaveReviewData | null>(null);
  const [courses, setCourses] = useState<CourseHeader[]>();
  useEffect(() => {
    Promise.all([
      Promise.resolve(adminApi.getQaWaveReview(qaWaveId!).then(setReview)),
      Promise.resolve(adminApi.getQaWaveCourses(qaWaveId!).then(setCourses)),
    ]);
  }, [qaWaveId]);

  return (
    <Container maxWidth="md">
      <AppBar>
        <Header maxWidth="md" />
      </AppBar>
      <Toolbar />
      <Stack gap={2} mt={2}>
        {review ? <MetaInfo {...review} /> : <WaveMetaInfoSkeleton />}
        <>
          <Typography variant="h5">Статусы студентов</Typography>
          {review ? (
            <StudentStatusesReview review={review} />
          ) : (
            <StudentStatusesReviewSkeleton />
          )}
        </>
        {review && <StatusAlert status={review.status} />}
        <>
          <Typography variant="h5">Курсы</Typography>
          <CardsShowcase
            cards={
              courses
                ? courses.map((v) => (
                    <CourseItem
                      onClick={
                        review?.status === "in-progress" ? () => {} : undefined
                      }
                      {...v}
                    />
                  ))
                : [<CourseItemSkeleton />, <CourseItemSkeleton />]
            }
            size={4}
          />
        </>
      </Stack>
    </Container>
  );
}

function WaveMetaInfoSkeleton() {
  return (
    <Box>
      <Typography variant="h4" sx={{ width: "100%" }}>
        <Skeleton width="40%" />
      </Typography>
      <Typography variant="body1" sx={{ width: "100%" }}>
        <Skeleton width="30%" />
      </Typography>
    </Box>
  );
}

function WaveStatusChip({ status }: { status: QAWaveReviewData["status"] }) {
  const mp = {
    "in-progress": ["Продолжается", "info"],
    finished: ["завершено", "success"],
  } satisfies Record<QAWaveStatus, [string, ChipOwnProps["color"]]>;
  const [label, color] = mp[status];
  return <Chip label={label} color={color} />;
}

function StatusAlert({ status }: { status: QAWaveStatus }) {
  switch (status) {
    case "finished":
      return <Alert severity="success">Анкеты доступны к просмотру</Alert>;
    case "in-progress":
      return (
        <Alert severity="warning">
          Анкеты будут доступны к просмотру после завершения
        </Alert>
      );
  }
}

function MetaInfo(
  props: Pick<QAWaveReviewData, "title" | "status" | "beginDate" | "endDate">
) {
  return (
    <Box>
      <Stack direction="row" alignItems="center" gap={2}>
        <Typography variant="h4">{props.title}</Typography>
        <WaveStatusChip status={props.status} />
      </Stack>
      <Typography variant="body1">
        {props.beginDate?.toDateString()} - {props.endDate?.toDateString()}
      </Typography>
    </Box>
  );
}
