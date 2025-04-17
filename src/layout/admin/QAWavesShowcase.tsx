import { AdminApi, adminApi } from "@/api/admin";
import Add from "@mui/icons-material/Add";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CardsShowcase } from "../common/CardsShowcase";

export function QABlock() {
  const [totalCount, setTotalCount] = useState<number>(10);
  const navigate = useNavigate();
  const onCreateQAWaveClick = () => {
    navigate("./qa/create");
  };

  useEffect(() => {
    adminApi.getQaWaves().then((v) => {
      setWavesData(v.waves);
      setTotalCount(v.count);
    });
  }, []);

  const [wavesData, setWavesData] =
    useState<Awaited<ReturnType<AdminApi["getQaWaves"]>>["waves"]>();

  return (
    <>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ArrowDropDown />}>
          <Stack direction="row" gap={4}>
            <Typography variant="h4">СОПы</Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              alignContent="center"
            >
              {totalCount}
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
              onClick={onCreateQAWaveClick}
            >
              Создать
            </Button>
          </Stack>
          <CardsShowcase
            size={{ xs: 12, sm: 6, md: 6 }}
            cards={
              wavesData
                ? wavesData.map((v) => <QAWaveCard {...v} />)
                : Array.from({ length: 3 }).map(() => (
                    <Skeleton variant="rounded" sx={{ height: 80 }} />
                  ))
            }
          />
        </AccordionDetails>
      </Accordion>
    </>
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
