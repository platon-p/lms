import { TestUnitInfo } from "@/domain/unit";
import QuestionBlock from "@/widgets/QuestionBlock";
import UnitHeader from "@/widgets/UnitHeader";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useEffect } from "react";

export default function TestUnit({ unit }: { unit: TestUnitInfo }) {
  if (unit.status == "not-started") {
    return <TestNotStarted unit={unit} />;
  }
  if (unit.status === "in-progress") {
    return <TestInProgress unit={unit} />;
  }
}

function TestInProgress({ unit }: { unit: TestUnitInfo }) {
  useEffect(() => {
    // alert on leave
    window.addEventListener("beforeunload", () => {
      return "Вы уверены, что хотите покинуть страницу?";
    });
    return () => {
      window.removeEventListener("beforeunload", () => {});
    };
  }, []);
  return (
    <Container maxWidth="md">
      <Stack direction="column" spacing={2}>
        <UnitHeader unit={unit} />
        {unit.questions!.map((q) => {
          return <QuestionBlock question={q} />;
        })}
        <Stack alignItems="end">
          <Button variant="contained" sx={{ width: "fit-content" }}>
            Отправить
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}

function TestNotStarted({ unit }: { unit: TestUnitInfo }) {
  return (
    <Box
      sx={{
        maxWidth: "sm",
        mx: "auto",
        px: 2,
      }}
    >
      <UnitHeader unit={unit}>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>Пока вы не приступили к тесту</Typography>
          <Button
            variant="contained"
            sx={{ width: "fit-content", marginLeft: "100%" }}
          >
            Начать
          </Button>
        </Stack>
      </UnitHeader>
    </Box>
  );
}
