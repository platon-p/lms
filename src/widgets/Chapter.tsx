import { Chapter } from "@/domain/course";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import UnitListItem from "./UnitListItem";

export default function ChapterView({
  chapter,
  onUnitClick,
}: {
  chapter: Chapter;
  onUnitClick: (unitId: string) => void;
}) {
  return (
    <Accordion disableGutters defaultExpanded elevation={0}>
      <AccordionSummary expandIcon={<ArrowDropDown />}>
        <Typography variant="h5">{chapter.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="column" spacing={1}>
          {chapter.units.map((unit) => (
            <UnitListItem
              unitHeader={unit}
              onClick={() => onUnitClick(unit.id)}
            />
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}

export function ChapterSkeleton() {
  return (
    <Stack direction="column" gap={1}>
      <Skeleton variant="text" width="40%" height="2rem" />
      <Skeleton variant="rectangular" width="100%" height="3rem" />
      <Skeleton variant="rectangular" width="100%" height="3rem" />
    </Stack>
  );
}
