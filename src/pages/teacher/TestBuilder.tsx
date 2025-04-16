import { QuestionType } from "@/domain/test";
import { useTestBuilderStore } from "@/store/unitBuilder";
import { QuestionBuilder } from "@/widgets/questions";
import UnitBuilderHeader from "@/widgets/UnitBuilderHeader";
import { CheckBox, RadioButtonChecked, TextFields } from "@mui/icons-material";
import {
  Button,
  ButtonGroup,
  Container,
  Stack,
  TextField,
  ToggleButton,
  Tooltip
} from "@mui/material";
import { useState } from "react";

export function TestUnitBuilderPage() {
  const { questions, onAdd } = useTestBuilderStore();
  return (
    <Container maxWidth="lg">
      <Stack direction="column" spacing={2}>
        <UnitBuilderHeader />
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
      alignItems="start"
    >
      <ButtonGroup orientation="vertical">
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
      </ButtonGroup>
      <Tooltip title="Ручная проверка">
        <ButtonGroup orientation="vertical">
          <Button variant="outlined" color="warning">
            развёрнутый ответ
          </Button>
        </ButtonGroup>
      </Tooltip>
      <Stack direction="column" gap={1}>
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
          color={deadlineValue ? "success" : undefined}
          type="datetime-local"
          focused
          label="Дедлайн"
          slotProps={{
            inputLabel: { shrink: true },
          }}
        />
      </Stack>
    </Stack>
  );
}
