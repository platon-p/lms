import { QuestionType } from "@/domain/test";
import { useTestBuilderStore } from "@/store/unitBuilder";
import { QuestionBuilder } from "@/widgets/questions";
import {
  CheckBox,
  Close,
  RadioButtonChecked,
  TextFields,
} from "@mui/icons-material";
import {
  Breadcrumbs,
  Button,
  Container,
  IconButton,
  Stack,
  TextField,
  ToggleButton,
  Typography,
} from "@mui/material";
import { useState } from "react";

export function TestUnitBuilderPage() {
  const { questions, onAdd } = useTestBuilderStore();
  return (
    <Container maxWidth="md">
      <Stack direction="column" spacing={2}>
        <Breadcrumbs>
          <Typography>Курсы</Typography>
          <Typography>Алгоритмы</Typography>
        </Breadcrumbs>
        <TextField fullWidth label="Название элемента" />
        {questions.map((question, index) => (
          <QuestionBuilder type={question} index={index} />
        ))}
        <UnitControls onAdd={onAdd} />
      </Stack>
    </Container>
  );
}

function UnitControls(props: { onAdd: (type: QuestionType) => void }) {
  const [selectionDisabled, setSelectionDisabled] = useState(false);
  const [deadlineValue, setDeadlineValue] = useState<string>("");
  return (
    <Stack
      direction="row"
      gap={2}
      flexWrap="wrap"
      rowGap={2}
      justifyContent="center"
    >
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
      <Button variant="outlined" color="warning">
        развёрнутый ответ
      </Button>
      <ToggleButton
        selected={selectionDisabled}
        value="selection"
        onClick={() => setSelectionDisabled(!selectionDisabled)}
      >
        Запретить выделение
      </ToggleButton>
      <TextField
        value={deadlineValue}
        onChange={(e) => {
          console.log(e.target.value);
          setDeadlineValue(e.target.value);
        }}
        type="datetime-local"
        placeholder="Дедлайн"
        slotProps={{
          input: {
            endAdornment: (
              <IconButton
                onClick={() => setDeadlineValue("")}
                disabled={!deadlineValue}
              >
                <Close />
              </IconButton>
            ),
          },
        }}
      />
      <Button variant="contained">Сохранить</Button>
    </Stack>
  );
}
