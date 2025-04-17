import { CheckboxSolutionReport, SolutionReport } from "@/domain/review";
import { Checkbox } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import { correctSx, incorrectSx } from "./common";

export default function CheckboxReview({
  report,
}: {
  report: Extract<SolutionReport, CheckboxSolutionReport>;
}) {
  const data = report.options;
  const sx = (i: number) =>
    data[i].isChecked === data[i].isCorrect ? correctSx : incorrectSx;

  return (
    <Stack direction="column">
      {data.map((v, i) => (
        <FormControlLabel
          sx={sx(i)}
          control={<Checkbox readOnly checked={v.isChecked} sx={sx(i)} />}
          label={v.name}
        />
      ))}
    </Stack>
  );
}
