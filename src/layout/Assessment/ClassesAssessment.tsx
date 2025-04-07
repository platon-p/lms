import {
  Box,
  Grid2 as Grid,
  Radio,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";

export function ClassesAssessment(props: { question: string }) {
  const qs = ["Ясность материала", "Ясность требований", "Коммуникация"];
  return (
    <Box>
      <Typography variant="h6">{props.question}</Typography>
      <TextField multiline fullWidth minRows={3} placeholder="Напишите отзыв" />
      <Grid container>
        {qs.map((v) => (
          <RatingRow question={v} />
        ))}
      </Grid>
    </Box>
  );
}

function RatingRow({ question }: { question: string }) {
  const [value, setValue] = useState<string | undefined>();
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
              <Tooltip title={"Хорошо"}>
                <Radio
                  value={i.toString()}
                  checked={value === i.toString()}
                  onChange={(e) => setValue(e.target.value)}
                />
              </Tooltip>
            );
          })}
        </Stack>
      </Grid>
    </>
  );
}
