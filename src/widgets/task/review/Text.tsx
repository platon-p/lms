import { AutoReport, TextSolutionReport } from "@/domain/review";
import { Cancel } from "@mui/icons-material";
import Check from "@mui/icons-material/Check";
import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function TextReview(props: {
  report: Extract<AutoReport, TextSolutionReport>;
}) {
  const { correct, answer, correctAnswer } = props.report;
  const icon = correct ? <Check /> : <Cancel />;
  const color = correct ? "success" : "error";

  return (
    <>
      <TextField
        defaultValue={answer}
        color={color}
        focused
        slotProps={{
          input: {
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton color={color}>{icon}</IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      <Stack direction="row" gap={1} alignItems="center">
        <Typography>Правильный ответ: </Typography>
        <Typography
          sx={{ backgroundColor: "#f0f0f0", px: 1, py: 0.2, borderRadius: 1 }}
        >
          {correctAnswer}
        </Typography>
      </Stack>
    </>
  );
}
