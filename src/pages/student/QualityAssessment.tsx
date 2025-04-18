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
import { useNavigate } from "react-router";

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

  const navigate = useNavigate();

  const onFabClick = () => {
    if (state === "loading") return;
    if (!isCompleted) nextPage();
    else {
      navigate("../")
    }
  };

  return (
    <Container maxWidth="md">
      <Stack direction="row" gap={2}>
        <Box minWidth="8rem" width="20%">
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
