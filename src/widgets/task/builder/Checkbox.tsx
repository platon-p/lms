import { CheckboxState } from "@/store/unitBuilder";
import Close from "@mui/icons-material/Close";
import { Button, Checkbox, IconButton, Stack, TextField } from "@mui/material";
import { StoreApi, UseBoundStore } from "zustand";

export default function CheckboxBuilder(props: {
  store: UseBoundStore<StoreApi<CheckboxState>>;
}) {
  const { options, setChecked, setName, remove, add } = props.store();

  return (
    <>
      <Stack
        direction="column"
        spacing={2}
        display={options.length === 0 ? "none" : undefined}
      >
        {options.map((v, i) => (
          <CheckboxRow
            active={v.checked}
            text={v.name}
            onActiveChange={(active) => setChecked(i, active)}
            onTextChange={(text) => setName(i, text)}
            onDelete={() => remove(i)}
          />
        ))}
      </Stack>
      <Button variant="outlined" onClick={() => add()}>
        Добавить вариант
      </Button>
    </>
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
