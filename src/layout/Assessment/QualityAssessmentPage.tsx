import { Divider, Skeleton, Stack, Typography } from "@mui/material";
import { ClassesAssessment } from "./ClassesAssessment";

export function QualityAssessmentPage(props: {
  active: boolean;
  title: string;
  blocks: string[];
}) {
  return (
    <Stack
      direction={"column"}
      spacing={1}
      sx={{ display: props.active ? undefined : "none" }}
    >
      <Typography mb={1} variant="h4">
        {props.title}
      </Typography>
      <Stack direction="column" divider={<Divider />} spacing={2}>
        {props.blocks.map((v, i) => (
          <ClassesAssessment question={v} key={i} />
        ))}
      </Stack>
    </Stack>
  );
}

export function QualityAssessmentPageSkeleton() {
  return (
    <Stack direction="column" divider={<Divider />} spacing={2}>
      {Array.from({ length: 3 }).map(() => (
        <Stack direction="column" spacing={0}>
          <Skeleton width="30%" height="3rem" />
          <Skeleton variant="rounded" width="100%" height="12rem" />
        </Stack>
      ))}
    </Stack>
  );
}
