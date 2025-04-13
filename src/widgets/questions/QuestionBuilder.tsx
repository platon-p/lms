import { QuestionType } from "@/domain/test";
import { ArrowDropDown, ArrowDropUp, Delete } from "@mui/icons-material";
import { IconButton, Paper, Stack } from "@mui/material";
import { CheckboxQuestion } from "./Checkbox";
import { RadioQuestion } from "./RadioQuestion";
import { TextQuestion } from "./TextQuestion";
import { useTestBuilderStore } from "@/store/unitBuilder";

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
    <Stack direction="column">
      <IconButton
        onClick={() => onMoveUp(index)}
        sx={{
          "&:hover": {
            color: "primary.main",
          },
        }}
      >
        <ArrowDropUp />
      </IconButton>
      <IconButton
        onClick={() => onMoveDown(index)}
        sx={{
          "&:hover": {
            color: "primary.main",
          },
        }}
      >
        <ArrowDropDown />
      </IconButton>
      <IconButton
        onClick={() => onDelete(index)}
        sx={{
          "&:hover": {
            color: "error.main",
          },
        }}
      >
        <Delete />
      </IconButton>
    </Stack>
  );
}
