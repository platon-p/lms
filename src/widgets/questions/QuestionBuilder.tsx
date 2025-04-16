import { QuestionType } from "@/domain/test";
import { useTestBuilderStore } from "@/store/unitBuilder";
import { ArrowDropDown, ArrowDropUp, Delete } from "@mui/icons-material";
import { Button, ButtonGroup, Paper, Stack } from "@mui/material";
import { CheckboxQuestion } from "./Checkbox";
import { RadioQuestion } from "./RadioQuestion";
import { TextQuestion } from "./TextQuestion";

const components: Record<QuestionType, React.FC> = {
  text: TextQuestion,
  checkbox: CheckboxQuestion,
  radio: RadioQuestion,
};

export function QuestionBuilder(props: { type: QuestionType; index: number }) {
  const Component = components[props.type];
  return (
    <Paper elevation={4} sx={{ width: "100%" }}>
      <Stack
        direction="row"
        width="100%"
        spacing={2}
        p={2}
        boxSizing="border-box"
      >
        <QuestionControls index={props.index} />
        <Component />
      </Stack>
    </Paper>
  );
}

function QuestionControls({ index }: { index: number }) {
  const { onDelete, onMoveDown, onMoveUp } = useTestBuilderStore();
  return (
    <ButtonGroup orientation="vertical" variant="outlined">
      <Button onClick={() => onMoveUp(index)}>
        <ArrowDropUp />
      </Button>
      <Button onClick={() => onMoveDown(index)}>
        <ArrowDropDown />
      </Button>
      <Button onClick={() => onDelete(index)} color="error">
        <Delete />
      </Button>
    </ButtonGroup>
  );
}
