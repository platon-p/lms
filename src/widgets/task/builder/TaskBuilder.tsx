import { YfmEditor } from "@/components";
import { TaskType } from "@/domain/quiz";
import { useQuizBuilderStore } from "@/store/unitBuilder";
import TaskIdLabel from "@/widgets/task/TaskIdLabel";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import ArrowDropUp from "@mui/icons-material/ArrowDropUp";
import Delete from "@mui/icons-material/Delete";
import { Button, ButtonGroup, Paper, Stack } from "@mui/material";
import React from "react";
import { StoreApi, UseBoundStore } from "zustand";
import AdvancedBuilder from "./Advanced";
import CheckboxBuilder from "./Checkbox";
import RadioBuilder from "./Radio";
import TextBuilder from "./Text";

const components = {
  text: TextBuilder,
  checkbox: CheckboxBuilder,
  radio: RadioBuilder,
  advanced: AdvancedBuilder,
} satisfies Record<TaskType, React.FC<{ store: UseBoundStore<StoreApi<any>> }>>;

export default function TaskBuilder(props: { index: number }) {
  const state = useQuizBuilderStore((s) => s.tasks)[props.index];
  const Component = components[state.getState().type];

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
        <Stack direction="column" sx={{ width: "100%" }} gap={2}>
          <YfmEditor label="Текст задания" />
          {/* @ts-ignore */}
          <Component store={state} />
        </Stack>
      </Stack>
    </Paper>
  );
}

function QuestionControls({ index }: { index: number }) {
  const { onDelete, onMoveDown, onMoveUp } = useQuizBuilderStore();
  return (
    <Stack direction="column" gap={2}>
      <TaskIdLabel id={index} />
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
    </Stack>
  );
}
