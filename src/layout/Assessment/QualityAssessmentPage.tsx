import { criterias, useQAStore } from "@/store/qa";
import TeacherChip from "@/widgets/TeacherChip";
import {
  Box,
  Divider,
  Grid2 as Grid,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { RatingRow } from "./ClassesAssessment";

export function QualityAssessmentPage(props: { index: number }) {
  const { pages, activeIndex } = useQAStore();
  const { name, teacher, remark, setRemark } = pages[props.index]();
  const isActive = activeIndex == props.index;

  return (
    <Stack
      direction={"column"}
      spacing={1}
      sx={{ display: isActive ? undefined : "none" }}
    >
      <Typography variant="h4">{name}</Typography>
      <Box>
        <TeacherChip name={teacher} />
      </Box>
      <Stack direction="column" divider={<Divider />} spacing={2}>
        <Box>
          <Typography variant="h6">Оцените качество курса</Typography>
          <TextField
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            multiline
            fullWidth
            minRows={3}
            placeholder="Напишите отзыв"
          />
          <Grid container>
            {criterias.map((v) => (
              <RatingRow question={v} pageId={props.index} />
            ))}
          </Grid>
        </Box>
      </Stack>
    </Stack>
  );
}

export function QualityAssessmentPageSkeleton() {
  return (
    <Stack direction="column">
      <Typography variant="h4" sx={{ width: "100%" }}>
        <Skeleton width="50%" />
      </Typography>
      <Stack direction="column" divider={<Divider />} spacing={2}>
        {Array.from({ length: 2 }).map(() => (
          <Stack direction="column" spacing={1}>
            <Skeleton width="30%" sx={{ fontSize: (t) => t.typography.h6 }} />
            <Skeleton variant="rounded" width="100%" height="6rem" />
            {Array.from({ length: 5 }).map(() => (
              <Stack direction="row" gap={2}>
                <Skeleton variant="rounded" width="30%" height="1.5rem" />
                <Skeleton variant="rounded" width="40%" height="1.5rem" />
              </Stack>
            ))}
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
