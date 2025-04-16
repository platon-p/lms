import {
  Box,
  Container,
  Grid2,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { BarChart } from "@mui/x-charts";

export default function QAReview() {
  const labels = ["Понятность", "Актуальность", "Полезность"];
  const comments = ["Норм", "Классный препод", "Ну такое"];
  const data: [number, number, number][] = [
    [5, 4, 5],
    [1, 2, 1],
    [3, 4, 4],
    [3, 2, 4],
  ];
  const series = labels.map(() => Array.from({ length: 5 }).map(() => 0));
  data.forEach((row) =>
    row.forEach((v, i) => {
      series[i][v - 1]++;
    })
  );
  return (
    <Container maxWidth="md">
      <Box mx="auto">
        <BarChart
          series={labels.map((label, i) => ({
            data: series[i],
            label: label,
          }))}
          xAxis={[
            {
              scaleType: "band",
              data: ["1", "2", "3", "4", "5"].map((v) => `Оценка ${v}`),
            },
          ]}
          yAxis={[{ data: ["1", "2", "3", "4", "5"] }]}
          height={400}
          sx={{width: "100%"}}
        />
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{labels[0]}</TableCell>
              <TableCell>{labels[1]}</TableCell>
              <TableCell>{labels[2]}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow>
                <TableCell>{row[0]}</TableCell>
                <TableCell>{row[1]}</TableCell>
                <TableCell>{row[2]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid2 container spacing={2}>
        {comments.map((comment) => (
          <Grid2 size={6}>
            <Paper sx={{p: 2}}>
              <Typography>{comment}</Typography>
            </Paper>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
}
