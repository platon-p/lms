import { mockLoadUnit } from "@/data/mock";
import { TextUnitInfo, UnitInfo } from "@/domain/unit";
import { useEffect, useState } from "react";
import TestUnit from "./TestUnit";

export default function Unit() {
  const [unit, setUnit] = useState<UnitInfo | undefined>();
  useEffect(() => {
    mockLoadUnit().then(setUnit);
  }, []);
  if (!unit) {
    return "loading";
  }
  if (unit.type === "text") {
    return <TextUnitView unit={unit} />;
  }
  if (unit.type === "test") {
    return <TestUnit unit={unit} />;
  }
}

function TextUnitView(_: { unit: TextUnitInfo }) {
  return "Text";
}
