import { Stack, TextField } from "@mui/material";
import { AdvancedInput } from "../../components/AdvancedInput";

export function TextQuestion() {
  return (
    <Stack direction="column" spacing={2} sx={{width: "100%"}}>
      <AdvancedInput label="Текст задания" />
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
