import { mockLoadCourses } from "@/data/mock";
import { CourseHeader } from "@/domain/unit";
import { CourseItem, CourseItemSkeleton } from "@/widgets/CourseItem";
import {
  Stack,
  TablePagination,
  TextField,
  Typography
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";

export default function Courses() {
  const [cards, setCards] = useState<CourseHeader[] | undefined>();
  const [page, setPage] = useState(0);
  const count = 41;
  const rowsPerPage = 10;

  useEffect(() => {
    mockLoadCourses().then(setCards);
  }, []);

  return (
    <Stack direction="column" maxWidth="md" marginX="auto" spacing={1}>
      <Typography variant="h4">Курсы</Typography>
      <TextField fullWidth placeholder="Искать" />
      <Grid
        container
        p={{ md: 4, xs: 1 }}
        spacing={2}
        sx={{ backgroundColor: "#f0f0f0" }}
      >
        {cards ? (
          cards.map((v, i) => (
            <Grid key={i} size={{ xs: 12, sm: 4 }}>
              <CourseItem title={v.title} progress={v.progress} />
            </Grid>
          ))
        ) : (
          Array.from({length: 8}).map(() => <Grid size={{ xs: 12, sm: 4 }}>
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
