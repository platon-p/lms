import { adminApi } from "@/api/admin";
import { QAWaveHeader } from "@/domain/qa";
import QAWaveCard from "@/widgets/QAWaveCard";
import Add from "@mui/icons-material/Add";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
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
  const [wavesData, setWavesData] = useState<QAWaveHeader[]>();
  const [query, setQuery] = useState<string>("");

  const navigate = useNavigate();
  const onCreateQAWaveClick = () => navigate("./qa/create");
  const onWaveClick = (id: string) => navigate(`./qa/${id}`);

  useEffect(() => {
    adminApi.findQaWaves(query).then((v) => {
      setWavesData(v.waves);
      setTotalCount(v.count);
    });
  }, [query]);

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
            <TextField
              fullWidth
              label="Найти волну"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
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
                ? wavesData.map((v) => (
                    <QAWaveCard wave={v} onClick={() => onWaveClick(v.id)} />
                  ))
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
