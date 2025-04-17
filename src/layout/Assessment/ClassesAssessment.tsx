import { criterias, useQAStore } from "@/store/qa";
import {
  Grid2 as Grid,
  Radio,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

export function RatingRow({
  question,
  pageId,
}: {
  question: (typeof criterias)[number];
  pageId: number;
}) {
  const { criteriaValues, setCriteriaValue } = useQAStore((s) => s.pages)[
    pageId
  ]();
  const value = criteriaValues[question];
  const setValue = (value: number) => setCriteriaValue(question, value);

  const tooltips = ["1", "2", "3", "4", "5"]; // TODO: text labels

  return (
    <>
      <Grid size={{ xs: 12, sm: 4 }}>
        <Typography
          height="100%"
          alignContent="center"
          sx={{ textAlign: { xs: "center", sm: "left" } }}
        >
          {question}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, sm: 8 }}>
        <Stack
          direction="row"
          sx={{ justifyContent: { xs: "center", sm: "left" } }}
        >
          {Array.from({ length: 5 }).map((_, i) => {
            return (
              <Tooltip title={tooltips[i]}>
                <Radio
                  value={i}
                  checked={value === i}
                  onChange={(e) => setValue(Number.parseInt(e.target.value))}
                />
              </Tooltip>
            );
          })}
        </Stack>
      </Grid>
    </>
  );
}
