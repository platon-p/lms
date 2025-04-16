import { mockLoadUnit } from "@/data/mock";
import { TestUnitInfo, UnitInfo } from "@/domain/unit";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Chip,
  ChipOwnProps,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function UnitReview() {
  const [unit, setUnit] = useState<UnitInfo | undefined>();
  useEffect(() => {
    mockLoadUnit("text").then(setUnit);
  }, []);
  return <TestUnitReview unit={unit as TestUnitInfo} />;
}

function TestUnitReview({ unit }: { unit: TestUnitInfo }) {
  return (
    <Container maxWidth="lg">
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ArrowDropDown />}>
          Отчет по студентам
        </AccordionSummary>
        <AccordionDetails>
          <StudentsReport />
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}

const statusToString: Record<TestUnitInfo["status"], string> = {
  finished: "завершён",
  "in-progress": "в процессе",
  "not-started": "не начат",
};

const statusToColor: Record<TestUnitInfo["status"], ChipOwnProps["color"]> = {
  finished: "success",
  "in-progress": "info",
  "not-started": "default",
};

function StudentsReport() {
  const [students, setStudents] = useState<string[]>(
    Array.from({ length: 50 }).map((_, i) => `Student ${i}`)
  );
  const row = (val: string) => {
    return (
      <TableRow hover>
        <TableCell>
          <Student name={val} />
        </TableCell>
        <TableCell>
          <Chip
            label={statusToString["finished"]}
            color={statusToColor["finished"]}
            variant="outlined"
            size="medium"
          />
        </TableCell>
        <TableCell>10</TableCell>
      </TableRow>
    );
  };
  return (
    <Box>
      <TextField fullWidth />
      <TableContainer sx={{ height: "40vh" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Студент</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Результат</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((v) => {
              return row(v);
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

function Student(props: { name: string }) {
  return (
    <Chip
      avatar={
        <Avatar sx={{ width: 24, height: 24 }}>
          {props.name.substring(0, 1)}
        </Avatar>
      }
      label={props.name}
    />
  );
}
