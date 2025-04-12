import { Stack, TextField } from "@mui/material";
import { YfmEditor } from "../../components/md/YfmEditor";

export function TextQuestion() {
  return (
    <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
      <YfmEditor label="Текст задания" />
      <TextField
        fullWidth
        label="Правильные ответы"
        placeholder="на отдельных строчках"
        multiline
        minRows={3}
      />
    </Stack>
  );
}
