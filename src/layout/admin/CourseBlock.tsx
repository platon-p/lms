import { CourseItemSkeleton } from "@/widgets/CourseItem";
import { Add } from "@mui/icons-material";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CardsShowcase } from "../common/CardsShowcase";

export function CourseBlock() {
  const totalCount = 131;
  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ArrowDropDown />}>
        <Stack direction="row" gap={4}>
          <Typography variant="h4">Курсы</Typography>
          <Typography variant="h5" color="text.secondary" alignContent="center">
            {totalCount}
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="row" gap={2} my={2}>
          <TextField fullWidth label="Найти курс" />
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{ flexShrink: 0 }}
          >
            Создать
          </Button>
        </Stack>
        <CardsShowcase
          size={{ xs: 12, sm: 6, md: 4 }}
          cards={[
            <CourseItemSkeleton />,
            <CourseItemSkeleton />,
            <CourseItemSkeleton />,
          ]}
        />
      </AccordionDetails>
    </Accordion>
  );
}
