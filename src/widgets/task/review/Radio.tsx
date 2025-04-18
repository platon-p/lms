import { RadioSolutionReport, SolutionReport } from "@/domain/review";
import { Radio } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import { correctSx, incorrectSx } from "./common";

export default function RadioReview({
  report,
}: {
  report: Extract<SolutionReport, RadioSolutionReport>;
}) {
  const correct = report.correctId;
  const selected = report.checkedId;
  const sx = (i: number) =>
    i === selected || i === correct
      ? i === correct
        ? correctSx
        : incorrectSx
      : undefined;

  return (
    <Stack direction="column">
      {report.options.map((v, i) => (
        <FormControlLabel
          control={<Radio readOnly sx={sx(i)} checked={i === selected} />}
          label={v}
          sx={sx(i)}
        />
      ))}
    </Stack>
  );
}
