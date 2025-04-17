import { RadioState } from "@/store/unitBuilder";
import Close from "@mui/icons-material/Close";
import {
  Button,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { StoreApi, UseBoundStore } from "zustand";

export default function RadioBuilder(props: {
  store: UseBoundStore<StoreApi<RadioState>>;
}) {
  const { activeId, setActive, options, setText, remove, add } = props.store();

  return (
    <>
      <RadioGroup
        value={activeId}
        onChange={(_, value) => setActive(Number(value))}
        sx={{ display: options.length === 0 ? "none" : undefined }}
      >
        <Stack direction="column" spacing={2}>
          {options.map((v, i) => (
            <RadioRow
              text={v}
              onTextChange={(text) => setText(i, text)}
              value={i}
              onDelete={() => remove(i)}
            />
          ))}
        </Stack>
      </RadioGroup>
      <Button variant="outlined" onClick={() => add()}>
        Добавить вариант
      </Button>
    </>
  );
}
function RadioRow(props: {
  text: string;
  onTextChange: (text: string) => void;
  value: number;
  onDelete: () => void;
}) {
  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
      <Radio value={props.value} />
      <TextField
        fullWidth
        value={props.text}
        onChange={(e) => props.onTextChange(e.target.value)}
        label="Вариант ответа"
      />
      <IconButton onClick={() => props.onDelete()}>
        <Close />
      </IconButton>
    </Stack>
  );
}
