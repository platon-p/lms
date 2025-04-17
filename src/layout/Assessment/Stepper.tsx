import { useQAStore } from "@/store/qa";
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
  onClick,
}: {
  activeTab: number;
  onClick: (i: number) => void;
}) {
  const pages = useQAStore((s) => s.pages);

  return (
    <Stepper
      orientation="vertical"
      nonLinear
      activeStep={activeTab}
      sx={{ height: "fit-content" }}
    >
      {pages.map((_, i) => {
        const { isCompleted, name } = pages[i].getState();
        return (
          <Step completed={isCompleted}>
            <StepButton
              onClick={() => onClick(i)}
              sx={{ boxSizing: "border-box" }}
            >
              <StepLabel sx={{ boxSizing: "border-box" }}>{name}</StepLabel>
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
        <Box sx={{ paddingLeft: "15px" }}>
          <Box sx={{ borderLeft: "1px solid #ccc", minHeight: "1.5rem" }} />
        </Box>
      }
    >
      {Array.from({ length: 5 }).map(() => (
        <Stack direction="row" spacing={2} alignItems="center">
          <Skeleton
            variant="circular"
            width={24}
            height={24}
            sx={{ flexShrink: 0 }}
          />
          <Skeleton
            variant="rounded"
            width="100%"
            sx={{ height: (t) => t.spacing(2) }}
          />
        </Stack>
      ))}
    </Stack>
  );
}
