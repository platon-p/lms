import { Button, Stack, TextField } from "@mui/material";
import ChapterPicker from "./ChapterPicker";

export default function UnitBuilderHeader() {
  return (
    <Stack direction="row" gap={2}>
      <TextField fullWidth label="Название элемента" />
      <ChapterPicker />
      <Button variant="contained" sx={{ flexShrink: 0 }} type="submit">
        Сохранить
      </Button>
    </Stack>
  );
}
