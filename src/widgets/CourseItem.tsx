import { CourseHeader } from "@/domain/course";
import {
  Card,
  CardActionArea,
  CardContent,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";

export default function CourseItem(props: CourseHeader) {
  const navigate = useNavigate();
  const navCourse = () => {
    navigate(`./course/${props.id}`);
  };
  return (
    <Card>
      <CardActionArea onClick={navCourse}>
        <CardContent>
          <Stack height={60} direction="column" justifyContent="space-between">
            <Typography variant="subtitle1">{props.title}</Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export function CourseItemSkeleton() {
  return <Skeleton height={100} variant="rounded" />;
}
