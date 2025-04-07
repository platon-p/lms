import {
  Box,
  Skeleton,
  Stack,
  Step,
  StepButton,
  StepLabel,
  Stepper,
} from "@mui/material";

export function StepperLayout({
  activeTab,
  pagesData,
  onNextStep,
}: {
  activeTab: number;
  pagesData: { name: string; error?: boolean }[];
  onNextStep: (i: number) => void;
}) {
  return (
    <Stepper
      orientation="vertical"
      nonLinear
      activeStep={activeTab}
      sx={{ height: "fit-content" }}
    >
      {pagesData.map((v, i) => {
        return (
          <Step key={i} completed={false}>
            <StepButton
              onClick={() => onNextStep(i)}
              sx={{ boxSizing: "border-box" }}
            >
              <StepLabel sx={{ boxSizing: "border-box" }} error={v.error}>
                {v.name}
              </StepLabel>
            </StepButton>
          </Step>
        );
      })}
    </Stepper>
  );
}

export function StepperSkeleton() {
  return (
    <Stack
      direction="column"
      gap={1}
      paddingY={2}
      divider={
        <Box
          sx={{
            paddingLeft: 1.5,
          }}
        >
          <Box sx={{ borderLeft: "1px solid #ccc", minHeight: "1.5rem" }} />
        </Box>
      }
    >
      {Array.from({ length: 5 }).map(() => (
        <Stack direction="row" spacing={2}>
          <Skeleton variant="circular" width="2em" height="1.8em" />
          <Skeleton variant="rounded" width="100%" height="2rem" />
        </Stack>
      ))}
    </Stack>
  );
}
