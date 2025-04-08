import { TestUnitInfo } from "@/domain/unit";
import QuestionBlock from "@/widgets/QuestionBlock";
import UnitHeader from "@/widgets/UnitHeader";
import { Box, Button, Stack, Typography } from "@mui/material";

export default function TestUnit({ unit }: { unit: TestUnitInfo }) {
  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{ maxWidth: "sm", mx: "auto", px: 2 }}
    >
      {unit.status === "not-started" && <TestNotStarted unit={unit} />}
      {unit.status === "in-progress" && (
        <>
          <UnitHeader unit={unit} />
          {unit.questions!.map((q) => {
            return <QuestionBlock question={q} />;
          })}
          <Stack alignItems="end">
            <Button variant="contained" sx={{ width: "fit-content" }}>
              Отправить
            </Button>
          </Stack>
        </>
      )}
    </Stack>
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
