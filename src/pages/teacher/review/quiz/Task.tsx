import YfmPreview from "@/components/md/YfmPreview";
import { SolutionBody } from "@/widgets/task/review/Solution";
import { Card, CardContent, Container, Stack, Typography } from "@mui/material";

const MySolutionReview = () => {
  return (
    <Card>
      <CardContent>
        <Stack direction="column" gap={2}>
          <Typography variant="h6">Имя Студента</Typography>
          <SolutionBody
            {...{
              type: "radio",
              title: "asda",
              options: ["вариант 1", "вариант 2", "вариант 3"],
            }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default function ReviewByTask() {
  return (
    <Container maxWidth="md">
      <Stack direction="column" gap={3}>
        <Card>
          <CardContent>
            <YfmPreview value="Текст вопроса" />
          </CardContent>
        </Card>
        {Array.from({ length: 10 }).map(() => (
          <MySolutionReview />
        ))}
      </Stack>
    </Container>
  );
}
