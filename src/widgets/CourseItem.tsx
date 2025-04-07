import { CourseHeader } from "@/domain/unit";
import {
  Card,
  CardActionArea,
  CardContent,
  LinearProgress,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

export function CourseItem(props: CourseHeader) {
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Stack height={70} direction="column" justifyContent="space-between">
            <Typography variant="subtitle1">{props.title}</Typography>
            <LinearProgress variant="determinate" value={props.progress} />
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export function CourseItemSkeleton() {
  return <Skeleton height={70} variant="rounded" />;
}
