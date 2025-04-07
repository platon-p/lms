import { TextField } from "@mui/material";

export function AdvancedInput(props: { label?: string }) {
  return <TextField fullWidth label={props.label} multiline minRows={2} />;
}
