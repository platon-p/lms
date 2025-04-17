import YfmPreview from "@/components/md/YfmPreview";
import { SolutionReport } from "@/domain/review";
import TaskIdLabel from "@/widgets/task/TaskIdLabel";
import { Check, Close } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useState } from "react";
import AdvancedReview from "./Advanced";
import CheckboxReview from "./Checkbox";
import RadioReview from "./Radio";
import TextReview from "./Text";

export function SolutionBody({
  report,
}: {
  report: SolutionReport;
}): JSX.Element {
  switch (report.type) {
    case "checkbox":
      return <CheckboxReview report={report} />;
    case "radio":
      return <RadioReview report={report} />;
    case "text":
      return <TextReview report={report} />;
    case "advanced":
      return <AdvancedReview />;
  }
}

export default function SolutionReview({ report }: { report: SolutionReport }) {
  return (
    <Card>
      <CardContent>
        <Stack direction="row" gap={2}>
          <MetaInfo report={report} />
          <Stack direction="column" gap={2} width="100%">
            <YfmPreview value={report.title} />
            <SolutionBody report={report} />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

function MetaInfo({ report }: { report: SolutionReport }) {
  const auto = "correct" in report;
  const [value, setValue] = useState(
    auto ? (report["correct"] ? 1 : 0) : undefined,
  );
  return (
    <Stack alignItems="center" gap={2}>
      <TaskIdLabel id={report.id} />
      <ToggleButtonGroup
        orientation="vertical"
        disabled={auto}
        value={value}
        exclusive
        onChange={(_, v) => setValue(v)}
      >
        <ToggleButton value={0} color="success">
          <Check />
        </ToggleButton>
        <ToggleButton value={1} color="error">
          <Close />
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}
