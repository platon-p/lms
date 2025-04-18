import { QAStudentStatus, QAWaveReview as QAWaveReviewData } from "@/domain/qa";
import {
  Chip,
  ChipOwnProps,
  Divider,
  Grid2,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function StudentStatusesReview({
  review,
}: {
  review: QAWaveReviewData;
}) {
  return (
    <TableContainer component={Paper} sx={{ p: 1 }}>
      <Table>
        <MyHead />
        <TableBody>
          {review.students.map((student) => (
            <MyRow data={student} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function StudentStatusesReviewSkeleton() {
  const row = () => (
    <>
      <Grid2 container spacing={2}>
        <Grid2 size={6} p={1}>
          <Skeleton width="30%" height="2rem" />
        </Grid2>
        <Grid2 size={6} p={1}>
          <Skeleton width="30%" height="2rem" />
        </Grid2>
      </Grid2>
      <Divider />
    </>
  );
  return (
    <Paper>
      {row()}
      {Array.from({ length: 10 }).map(() => row())}
    </Paper>
  );
}

const statusLabel = {
  done: "Пройдено",
  "not-started": "Не пройдено",
} satisfies Record<QAStudentStatus, string>;
const statusColor = {
  done: "success",
  "not-started": "error",
} satisfies Record<QAStudentStatus, ChipOwnProps["color"]>;

function MyRow({ data }: { data: QAWaveReviewData["students"][number] }) {
  return (
    <TableRow>
      <TableCell>{data.name}</TableCell>
      <TableCell>
        <Chip
          label={statusLabel[data.status]}
          variant="outlined"
          color={statusColor[data.status]}
        />
      </TableCell>
    </TableRow>
  );
}

function MyHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Студент</TableCell>
        <TableCell sortDirection="asc">Статус</TableCell>
      </TableRow>
    </TableHead>
  );
}
