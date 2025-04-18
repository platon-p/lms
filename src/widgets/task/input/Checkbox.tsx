import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

export default function CheckboxInput(props: { options: string[] }) {
  return (
    <FormGroup>
      {props.options.map((v) => (
        <FormControlLabel control={<Checkbox />} label={v} />
      ))}
    </FormGroup>
  );
}
