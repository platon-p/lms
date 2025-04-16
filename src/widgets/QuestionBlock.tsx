import { RichQuestion } from "@/domain/test";
import { Card, CardContent, Typography } from "@mui/material";
import AnswerField from "./test/AnswerField";

export default function QuestionBlock(props: { question: RichQuestion }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{props.question.title}</Typography>
        <AnswerField question={props.question} />
      </CardContent>
    </Card>
  );
}
