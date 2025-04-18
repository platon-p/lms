import YfmPreview from "@/components/md/YfmPreview";
import Header from "@/layout/student/Header";
import {
  AppBar,
  Box,
  Card,
  CardContent,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import { BarChart } from "@mui/x-charts";

export default function QAReview() {
  const labels = ["Понятность", "Актуальность", "Полезность"];
  const comments = [
    "Не хватило обратной связи по контрольный работе ☹️",
    "Всё классно, любимый преподаватель на любимом курсе. Любимая цитата:\n> А ниче тот факт, что тут импликация верна??",
    "Лучшее что было в моей жизни",
    "Я разочарован",
    "**Ничего** особого",
  ];
  const data: [number, number, number][] = [
    [5, 4, 5],
    [3, 4, 4],
    [3, 3, 4],
    [4, 5, 4],
    [2, 2, 4],
  ];

  return (
    <Container maxWidth="md">
      <AppBar>
        <Header maxWidth="md" />
      </AppBar>
      <Toolbar />
      <Stack gap={3} my={2}>
        <Typography variant="h4">Оценки</Typography>
        <Card>
          <CardContent>
            <RatesChart labels={labels} data={data} />
            <MarksTable labels={labels} data={data} />
          </CardContent>
        </Card>
        <Typography variant="h4">Комментарии</Typography>
        <Stack gap={2}>
          {comments.map((comment) => (
            <Card>
              <CardContent>
                <YfmPreview value={comment} />
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}

function RatesChart({
  labels,
  data,
}: {
  labels: string[];
  data: [number, number, number][];
}) {
  const series = labels.map(() => Array.from({ length: 5 }).map(() => 0));
  data.forEach((row) =>
    row.forEach((v, i) => {
      series[i][v - 1]++;
    })
  );

  return (
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
        height={400}
        sx={{ width: "100%" }}
      />
    </Box>
  );
}

function MarksTable({
  labels,
  data,
}: {
  labels: string[];
  data: [number, number, number][];
}) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>{labels[0]}</TableCell>
            <TableCell>{labels[1]}</TableCell>
            <TableCell>{labels[2]}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <TableRow>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{row[0]}</TableCell>
              <TableCell>{row[1]}</TableCell>
              <TableCell>{row[2]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
