import {
  mockQualityAssessmentPages,
  QualityAssessmentPageHeader,
} from "@/data/mock";
import {
  QualityAssessmentPage,
  QualityAssessmentPageSkeleton,
} from "@/layout/Assessment/QualityAssessmentPage";
import { StepperLayout, StepperSkeleton } from "@/layout/Assessment/Stepper";
import { Check } from "@mui/icons-material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Fab, Stack } from "@mui/material";
import { useEffect, useState } from "react";

export default function QualityAssessment() {
  const [pagesData, setPagesData] = useState<
    (QualityAssessmentPageHeader & { error: boolean })[] | undefined
  >();
  useEffect(() => {
    mockQualityAssessmentPages().then((v) => {
      setPagesData(
        v.map((v) => ({
          ...v,
          error: false,
        })),
      );
    });
  }, []);

  const [activeTab, setActiveTab] = useState(0);
  function onNextStep(i: number) {
    setActiveTab(i);
  }
  function onFabClick() {
    if (!pagesData) return;
    setActiveTab(activeTab + 1 === pagesData.length ? 0 : activeTab + 1);
  }

  return (
    <Stack direction="row" maxWidth="md" marginX="auto" spacing={2}>
      <Box sx={{ minWidth: "12rem", width: "20%" }}>
        {pagesData ? (
          <StepperLayout
            onNextStep={onNextStep}
            activeTab={activeTab}
            pagesData={pagesData}
          />
        ) : (
          <StepperSkeleton />
        )}
      </Box>
      <Box width="80%">
        {pagesData ? (
          pagesData.map((v, i) => {
            return (
              <QualityAssessmentPage
                blocks={v.questions}
                title={v.name}
                active={activeTab === i}
              />
            );
          })
        ) : (
          <QualityAssessmentPageSkeleton />
        )}

        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <Fab color="primary" onClick={onFabClick}>
            {pagesData && activeTab === pagesData.length - 1 ? (
              <Check />
            ) : (
              <ArrowForwardIcon />
            )}
          </Fab>
        </Box>
      </Box>
    </Stack>
  );
}
