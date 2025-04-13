import { Course } from "@/domain/course";
import ChapterView, { ChapterSkeleton } from "@/widgets/Chapter";
import { Divider, Skeleton, Stack, Typography } from "@mui/material";

export function CourseContentView({ chapters, title }: Course) {
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
