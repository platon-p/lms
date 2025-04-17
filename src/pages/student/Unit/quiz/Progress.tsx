import { QuizUnitInfo } from "@/domain/unit";
import { QuestionBlock } from "@/widgets";
import UnitHeader from "@/widgets/UnitHeader";
import { Button, Container, Stack } from "@mui/material";
import { useEffect } from "react";

export default function QuizInProgress({ unit }: { unit: QuizUnitInfo }) {
  useEffect(() => {
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
        {unit.tasks!.map((q) => (
          <QuestionBlock task={q} />
        ))}
        <Stack alignItems="end">
          <Button variant="contained" sx={{ width: "fit-content" }}>
            Отправить
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
