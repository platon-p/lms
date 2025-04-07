import { QuestionBuilder, QuestionType } from "@/widgets/questions";
import { CheckBox, RadioButtonChecked, TextFields } from "@mui/icons-material";
import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";

export function UnitBuilderPage() {
  const [questions, setQuestions] = useState<QuestionType[]>([
    "text",
    "checkbox",
  ]);
  const handleAdd = (type: QuestionType) => {
    setQuestions((prev) => [...prev, type]);
  };
  const handleDelete = (id: number) => {
    setQuestions((prev) => prev.filter((_, index) => index !== id));
  };
  const handleMoveUp = (id: number) => {
    const newQuestions = [...questions];
    if (id === 0) return;
    setQuestions([
      ...newQuestions.slice(0, id - 1),
      newQuestions[id],
      newQuestions[id - 1],
      ...newQuestions.slice(id + 1),
    ]);
  };
  const handleMoveDown = (id: number) => {
    const newQuestions = [...questions];
    if (id === questions.length - 1) return;
    setQuestions([
      ...newQuestions.slice(0, id),
      newQuestions[id + 1],
      newQuestions[id],
      ...newQuestions.slice(id + 2),
    ]);
  };
  return (
    <Stack
      direction="column"
      spacing={2}
      alignItems="center"
      margin="auto"
      sx={{ maxWidth: "md", width: "100%" }}
    >
      <TextField fullWidth label="Название элемента" />
      {questions.map((question, index) => (
        <QuestionBuilder
          type={question}
          onDelete={() => handleDelete(index)}
          onMoveUp={() => handleMoveUp(index)}
          onMoveDown={() => handleMoveDown(index)}
        />
      ))}
      <UnitControls onAdd={handleAdd} />
    </Stack>
  );
}

function UnitControls(props: { onAdd: (type: QuestionType) => void }) {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        endIcon={<CheckBox />}
        onClick={() => props.onAdd("checkbox")}
        variant="outlined"
      >
        несколько вариантов
      </Button>
      <Button
        endIcon={<RadioButtonChecked />}
        onClick={() => props.onAdd("radio")}
        variant="outlined"
      >
        один вариант
      </Button>
      <Button
        endIcon={<TextFields />}
        onClick={() => props.onAdd("text")}
        variant="outlined"
      >
        текстовый ответ
      </Button>
      <Button variant="contained">Сохранить</Button>
    </Stack>
  );
}
