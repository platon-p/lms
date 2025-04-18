import { CourseHeader } from "@/domain/course";
import TeacherChip from "@/widgets/TeacherChip";
import { Skeleton, Stack, Tooltip, Typography } from "@mui/material";

// TODO: maybe common component
export default function CourseMeta({
  course,
}: {
  course: CourseHeader & { teacher: string };
}) {
  return (
    <Stack
      direction="row"
      gap={2}
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography variant="h3">{course.title}</Typography>
      <Tooltip title="Преподаватель">
        <TeacherChip name={course.teacher} />
      </Tooltip>
    </Stack>
  );
}

export function CourseMetaSkeleton() {
  return (
    <Stack
      direction="row"
      gap={2}
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography variant="h3" sx={{ flexGrow: 1 }}>
        <Skeleton variant="text" width="40%" />
      </Typography>
      <Skeleton
        variant="rounded"
        sx={{ borderRadius: 999, width: 160, height: 30 }}
      />
    </Stack>
  );
}
