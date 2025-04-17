import { QuizUnitInfo } from "@/domain/unit";

import Finished from "./quiz/Finished";
import QuizNotStarted from "./quiz/NotStarted";
import QuizInProgress from "./quiz/Progress";
import Reviewing from "./quiz/Reviewing";

export default function QuizUnit({
  unit,
}: {
  unit: QuizUnitInfo;
}): React.ReactNode {
  switch (unit.status) {
    case "not-started":
      return <QuizNotStarted unit={unit} />;
    case "in-progress":
      return <QuizInProgress unit={unit} />;
    case "reviewing":
      return <Reviewing unit={unit} />;
    case "finished":
      return <Finished unit={unit} />;
  }
}
