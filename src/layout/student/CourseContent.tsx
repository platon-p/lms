import { Course } from "@/domain/course";
import ChapterView, { ChapterSkeleton } from "@/widgets/Chapter";
import TeacherChip from "@/widgets/TeacherChip";
import { Divider, Skeleton, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export function CourseContentView({ chapters, title, teacher }: Course) {
  const navigate = useNavigate();

  const onUnitClick = (unitId: string) => {
    navigate(`./${unitId}`);
  };

  return (
    <Stack direction="column">
      <Typography variant="h4" p={2}>
        {title}
      </Typography>
      <Stack direction="row" px={2} alignItems="center" gap={2}>
        <Typography display="inline-block">Преподаватель</Typography>
        <TeacherChip name={teacher} />
      </Stack>
      <Stack direction="column" spacing={1}>
        {chapters.map((chapter, i) => (
          <ChapterView key={i} chapter={chapter} onUnitClick={onUnitClick} />
        ))}
      </Stack>
    </Stack>
  );
}

export function CourseContentSkeleton() {
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
