import { AdvancedInput } from "@/components";
import { Close } from "@mui/icons-material";
import { Button, Checkbox, IconButton, Stack, TextField } from "@mui/material";
import { useState } from "react";

export function CheckboxQuestion() {
  const [state, setState] = useState<
    {
      active: boolean;
      text: string;
    }[]
  >([]);
  const addVariant = () => {
    setState((prev) => [...prev, { active: false, text: "" }]);
  };
  const onTextChange = (index: number, text: string) => {
    const newState = [...state];
    newState[index].text = text;
    setState(newState);
  };
  const onActiveChange = (index: number, active: boolean) => {
    const newState = [...state];
    newState[index].active = active;
    setState(newState);
  };
  const onDelete = (index: number) => {
    const newState = [...state];
    newState.splice(index, 1);
    setState(newState);
  };
  return (
    <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
      <AdvancedInput label="Текст задания" />
      <Stack direction="column" spacing={2}>
        {state.map((v, i) => (
          <CheckboxRow
            active={v.active}
            text={v.text}
            onActiveChange={(active) => onActiveChange(i, active)}
            onTextChange={(text) => onTextChange(i, text)}
            onDelete={() => onDelete(i)}
          />
        ))}
      </Stack>
      <Button variant="outlined" onClick={() => addVariant()}>
        Добавить вариант
      </Button>
    </Stack>
  );
}

function CheckboxRow(props: {
  active: boolean;
  onActiveChange: (active: boolean) => void;
  text: string;
  onTextChange: (text: string) => void;
  onDelete: () => void;
}) {
  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
      <Checkbox
        checked={props.active}
        onChange={(e) => props.onActiveChange(e.target.checked)}
      />
      <TextField
        value={props.text}
        onChange={(e) => props.onTextChange(e.target.value)}
        fullWidth
        label="Вариант ответа"
      />
      <IconButton onClick={() => props.onDelete()}>
        <Close />
      </IconButton>
    </Stack>
  );
}
