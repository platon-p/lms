import { TaskType } from "@/domain/quiz";
import { useQuizBuilderStore } from "@/store/unitBuilder";
import { TaskBuilder } from "@/widgets/task/builder";
import UnitBuilderHeader from "@/widgets/UnitBuilderHeader";
import CheckBox from "@mui/icons-material/CheckBox";
import RadioButtonChecked from "@mui/icons-material/RadioButtonChecked";
import TextFields from "@mui/icons-material/TextFields";
import {
  Button,
  ButtonGroup,
  Container,
  Stack,
  TextField,
  ToggleButton,
  Tooltip,
} from "@mui/material";
import { useState } from "react";

export default function QuizBuilder() {
  const { tasks, onAdd } = useQuizBuilderStore(); // FIXME: loosing states while reordering
  return (
    <Container maxWidth="lg">
      <Stack direction="column" spacing={2} my={2}>
        <UnitBuilderHeader />
        {tasks.map((_, index) => (
          <TaskBuilder index={index} />
        ))}
        <UnitControls onAdd={onAdd} />
      </Stack>
    </Container>
  );
}

function UnitControls(props: { onAdd: (type: TaskType) => void }) {
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
          <Button
            variant="outlined"
            color="warning"
            onClick={() => props.onAdd("advanced")}
          >
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
          focused={Boolean(deadlineValue)}
          label="Дедлайн"
          slotProps={{
            inputLabel: { shrink: true },
          }}
        />
      </Stack>
    </Stack>
  );
}
