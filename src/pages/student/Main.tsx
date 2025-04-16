import { mockLoadCourses } from "@/data/mock";
import { CourseHeader } from "@/domain/course";
import { CourseItem, CourseItemSkeleton } from "@/widgets/CourseItem";
import {
  Badge,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";

export default function StudentMain() {
  const [cards, setCards] = useState<CourseHeader[] | undefined>();
  const [page, setPage] = useState(0);
  const count = 41;
  const rowsPerPage = 10;

  useEffect(() => {
    mockLoadCourses().then(setCards);
  }, []);

  return (
    <Stack direction="column" maxWidth="md" marginX="auto" spacing={1}>
      <Badge
        badgeContent={1}
        color="primary"
        sx={{ width: "fit-content", marginTop: "1rem !important" }}
      >
        <Typography sx={{ display: "inline-block" }} variant="h4" pr={1}>
          СОПы
        </Typography>
      </Badge>
      <Card>
        <CardActionArea onClick={console.log}>
          <CardContent>Весенний период СОП</CardContent>
        </CardActionArea>
      </Card>
      <Typography variant="h4">Курсы</Typography>
      <TextField fullWidth placeholder="Искать" />
      <Grid
        container
        p={{ md: 4, xs: 1 }}
        spacing={2}
        sx={{ backgroundColor: "#f0f0f0" }}
      >
        {cards
          ? cards.map((v, i) => (
              <Grid key={i} size={{ xs: 12, sm: 4 }}>
                <CourseItem id={v.id} title={v.title} progress={v.progress} />
              </Grid>
            ))
          : Array.from({ length: 8 }).map(() => (
              <Grid size={{ xs: 12, sm: 4 }}>
                <CourseItemSkeleton />
              </Grid>
            ))}
      </Grid>
      <TablePagination
        count={count}
        onPageChange={(_, v) => setPage(v)}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10, 20, 50, 100]}
        component="div"
      />
    </Stack>
  );
}
