import { TextState } from "@/store/unitBuilder";
import { TextField } from "@mui/material";
import { StoreApi, UseBoundStore } from "zustand";

export default function TextBuilder(props: {
  store: UseBoundStore<StoreApi<TextState>>;
}) {
  const { value, setValue } = props.store();
  return (
    <TextField
      fullWidth
      label="Правильный ответ"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
