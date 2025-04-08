import { RichQuestion } from "@/domain/test";
import { Paper, Typography } from "@mui/material";
import AnswerField from "./test/AnswerField";

export default function QuestionBlock(props: { question: RichQuestion }) {
  return (
    <Paper sx={{ p: 2 }} elevation={4}>
      <Typography variant="h6">{props.question.title}</Typography>
      <AnswerField question={props.question} />
    </Paper>
  );
}
