import { Chapter } from "@/domain/course";
import { ArrowDropDown } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import UnitListItem from "./UnitListItem";

export default function ChapterView(props: Chapter) {
  return (
    <Accordion disableGutters defaultExpanded elevation={0}>
      <AccordionSummary expandIcon={<ArrowDropDown />}>
        <Typography variant="h5">{props.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="column" spacing={1}>
          {props.units.map((unit) => {
            return <UnitListItem {...unit} />;
          })}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}

export function ChapterSkeleton() {
  return (
    <Stack direction="column" spacing={1}>
      <Skeleton variant="text" width="40%" height="2rem" />
      <Skeleton variant="rectangular" width="100%" height="3rem" />
      <Skeleton variant="rectangular" width="100%" height="3rem" />
    </Stack>
  );
}
