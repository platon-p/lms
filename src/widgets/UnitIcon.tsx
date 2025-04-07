import { UnitType } from "@/domain/unit";
import { Description, Quiz } from "@mui/icons-material";

export default function UnitIcon(props: { type: UnitType | never }) {
  switch (props.type) {
    case "text":
      return <Description />;
    case "test":
      return <Quiz />;
    default:
      // eslint-disable-next-line no-case-declarations
      const check: never = props.type;
      throw new Error(`Unknown unit type: ${check}`);
  }
}
