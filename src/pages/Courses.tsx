import {
  Card,
  CardActionArea,
  CardContent,
  LinearProgress,
  Skeleton,
  Stack,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";

export default function Courses() {
  const cards = ["Name 1", "Name 2", "Name 3", "Name 4"];
  const [page, setPage] = useState(0);
  const count = 41;
  const rowsPerPage = 10;
  return (
    <Stack direction="column" maxWidth="md" marginX="auto" gap={1}>
      <Typography variant="h4">Курсы</Typography>
      <TextField fullWidth placeholder="Искать" />
      <Grid
        container
        p={{ md: 4, xs: 1 }}
        spacing={2}
        sx={{ backgroundColor: "#f0f0f0" }}
      >
        {cards.map((v, i) => {
          return (
            <Grid key={i} size={{ xs: 12, sm: 4 }}>
              <CourseCard title={v} />
            </Grid>
          );
        })}
        <Grid size={{ xs: 12, sm: 4 }}>
          <Skeleton height={60} variant="rounded" />
        </Grid>
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
function CourseCard(props: { title: string }) {
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Typography variant="subtitle1">{props.title}</Typography>
          <LinearProgress variant="determinate" value={20} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
