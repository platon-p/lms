import { UnitType } from "@/domain/unit";
import Description from "@mui/icons-material/Description";
import Quiz from "@mui/icons-material/Quiz";

const typeToIcon = {
  article: <Description />,
  quiz: <Quiz />,
} as const satisfies Record<UnitType, JSX.Element>;

export default function UnitIcon(props: { type: UnitType }) {
  return typeToIcon[props.type];
}
