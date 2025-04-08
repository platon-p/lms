import { CheckboxQuestion, RadioQuestion, RichQuestion } from "@/domain/test";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

export default function AnswerField({ question }: { question: RichQuestion }) {
  if (question.type === "text") {
    return <TextQuestionField />;
  }
  if (question.type === "radio") {
    return <RadioAnswerField options={(question as RadioQuestion).options} />;
  }
  if (question.type === "checkbox") {
    return (
      <CheckboxAnswerField options={(question as CheckboxQuestion).options} />
    );
  }
}

function TextQuestionField() {
  return <TextField multiline fullWidth />;
}

function CheckboxAnswerField(props: { options: string[] }) {
  return (
    <FormGroup>
      {props.options.map((v) => (
        <FormControlLabel control={<Checkbox />} label={v} />
      ))}
    </FormGroup>
  );
}

function RadioAnswerField(props: { options: string[] }) {
  return (
    <RadioGroup>
      {props.options.map((v) => (
        <FormControlLabel control={<Radio />} label={v} value={v} />
      ))}
    </RadioGroup>
  );
}
