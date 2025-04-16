import { CourseBlock } from "@/layout/admin/CourseBlock";
import { CardsShowcase } from "@/layout/common/CardsShowcase";
import { Add, ArrowDropDown } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function AdminMain() {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <QABlock />
      <CourseBlock />
    </Container>
  );
}

function QAWaveCard(props: { title: string; beginDate: Date; endDate: Date }) {
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Stack height={70} direction="column" justifyContent="space-between">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography display="inline-block" variant="h6">
                {props.title}
              </Typography>
            </Box>
            <Typography
              display="inline-block"
              variant="subtitle2"
              color="text.secondary"
            >
              {props.beginDate.toDateString()} - {props.endDate.toDateString()}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function QABlock() {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ArrowDropDown />}>
        <Stack direction="row" gap={4}>
          <Typography variant="h4">СОПы</Typography>
          <Typography variant="h5" color="text.secondary" alignContent="center">
            10
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="row" gap={2} my={2}>
          <TextField fullWidth label="Найти волну" />
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{ flexShrink: 0 }}
          >
            Создать
          </Button>
        </Stack>
        <CardsShowcase
          size={{ xs: 12, sm: 6, md: 6 }}
          cards={[
            <QAWaveCard
              title="БПИ23"
              beginDate={new Date()}
              endDate={new Date()}
            />,
            <QAWaveCard
              title="БПИ23"
              beginDate={new Date()}
              endDate={new Date()}
            />,
            <QAWaveCard
              title="БПИ23"
              beginDate={new Date()}
              endDate={new Date()}
            />,
          ]}
        />
      </AccordionDetails>
    </Accordion>
  );
}
