import { ArrowDropDown, ArrowDropUp, Delete } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { CheckboxQuestion, RadioQuestion, TextQuestion } from ".";

export type QuestionType = "text" | "checkbox" | "radio";
const components: Record<QuestionType, React.FC> = {
  text: TextQuestion,
  checkbox: CheckboxQuestion,
  radio: RadioQuestion,
};

export function QuestionBuilder(props: {
  type: QuestionType;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const Component = components[props.type];
  return (
    <Stack
      sx={{ border: "1px solid gray", borderRadius: ".5rem" }}
      direction="row"
      width="100%"
      spacing={2}
      padding={2}
      boxSizing="border-box"
    >
      <QuestionControls
        onDelete={props.onDelete}
        onMoveDown={props.onMoveDown}
        onMoveUp={props.onMoveUp}
      />
      <Component />
    </Stack>
  );
}

function QuestionControls(props: {
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
}) {
  return (
    <Stack direction="column">
      <IconButton
        onClick={() => props.onMoveUp()}
        sx={{
          "&:hover": {
            color: "primary.main",
          },
        }}
      >
        <ArrowDropUp />
      </IconButton>
      <IconButton
        onClick={() => props.onMoveDown()}
        sx={{
          "&:hover": {
            color: "primary.main",
          },
        }}
      >
        <ArrowDropDown />
      </IconButton>
      <IconButton
        onClick={() => props.onDelete()}
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
