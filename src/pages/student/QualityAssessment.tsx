import {
  QualityAssessmentPage,
  QualityAssessmentPageSkeleton,
} from "@/layout/Assessment/QualityAssessmentPage";
import { StepperLayout, StepperSkeleton } from "@/layout/Assessment/Stepper";
import { useQAStore } from "@/store/qa";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Check from "@mui/icons-material/Check";
import { Box, Container, Fab, Stack } from "@mui/material";
import { useEffect } from "react";

export default function QualityAssessment() {
  const init = useQAStore((s) => s.init);
  const {
    pages,
    activeIndex,
    state,
    nextPage,
    setActiveIndex,
    isCompleted,
    validate,
  } = useQAStore();
  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    setInterval(() => {
      validate();
    }, 300);
  }, [validate]);

  const onFabClick = () => {
    if (state === "loading") return;
    if (!isCompleted) nextPage();
    else {
      console.log("submit");
    }
  };

  return (
    <Container maxWidth="md">
      <Stack direction="row" gap={2}>
        <Box minWidth="12rem" width="20%">
          {state === "loaded" ? (
            <StepperLayout onClick={setActiveIndex} activeTab={activeIndex} />
          ) : (
            <StepperSkeleton />
          )}
        </Box>
        <Box width="80%">
          {state === "loaded" ? (
            pages.map((_, i) => <QualityAssessmentPage index={i} />)
          ) : (
            <QualityAssessmentPageSkeleton />
          )}

          <Box sx={{ display: "flex", justifyContent: "right" }}>
            <Fab color="primary" onClick={onFabClick}>
              {state === "loaded" && isCompleted ? (
                <Check />
              ) : (
                <ArrowForwardIcon />
              )}
            </Fab>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
}
