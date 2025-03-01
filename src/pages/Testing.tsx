import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Box,
  Divider,
  Fab,
  Radio,
  Stack,
  Step,
  StepButton,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function Testing() {
  const pagesData = [
    {
      name: "Алгоритмы",
      error: false,
      questions: ["Лекции от Сиплюсплюсова", "Семинары от Эрбэтришного"],
    },
    {
      name: "Теорвер",
      error: true,
      questions: ["Лекции от Гауссова", "Семинары от Чебышева"],
    },
    {
      name: "Операционные системы",
      error: false,
      questions: ["Лекции от Регистрова", "Семинары от Ассемблеровича"],
    },
  ];

  const [activeTab, setActiveTab] = useState(0);
  function onNextStep(i: number) {
    setActiveTab(i);
  }
  function onFabClick() {
    setActiveTab(activeTab + 1 === pagesData.length ? 0 : activeTab + 1);
  }

  return (
    <Box maxWidth="sm" marginX="auto">
      <Stepper sx={{ height: "auto" }} nonLinear activeStep={activeTab}>
        {pagesData.map((v, i) => {
          return (
            <Step key={i} completed={false}>
              <StepButton onClick={() => onNextStep(i)}>
                <StepLabel error={v.error}>{v.name}</StepLabel>
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
      {pagesData.map((v, i) => {
        return (
          <Page blocks={v.questions} title={v.name} active={activeTab === i} />
        );
      })}
      <Box sx={{ display: "flex", justifyContent: "right" }}>
        <Fab color="primary" onClick={onFabClick}>
          <ArrowForwardIcon />
        </Fab>
      </Box>
    </Box>
  );
}

function Page(props: { active: boolean; title: string; blocks: string[] }) {
  return (
    <Stack
      direction={"column"}
      gap={1}
      sx={{ display: props.active ? undefined : "none" }}
    >
      <Typography mb={1} variant="h4">
        {props.title}
      </Typography>
      <Stack direction="column" divider={<Divider />} gap={2}>
        {props.blocks.map((v, i) => {
          return <ClassesQuestion question={v} key={i} />;
        })}
      </Stack>
    </Stack>
  );
}

function ClassesQuestion(props: { question: string }) {
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
          {Array(5)
            .fill(0)
            .map((_, i) => {
              return (
                <Radio
                  value={i.toString()}
                  checked={value === i.toString()}
                  onChange={(e) => setValue(e.target.value)}
                />
              );
            })}
        </Stack>
      </Grid>
    </>
  );
}
