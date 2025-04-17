import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

export default function RadioInput(props: { options: string[] }) {
  return (
    <RadioGroup>
      {props.options.map((v) => (
        <FormControlLabel control={<Radio />} label={v} value={v} />
      ))}
    </RadioGroup>
  );
}
