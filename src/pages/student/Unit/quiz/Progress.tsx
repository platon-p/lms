import { QuizUnitInfo } from "@/domain/unit";
import { QuestionBlock } from "@/widgets";
import UnitHeader from "@/widgets/UnitHeader";
import { Button, Container, Stack } from "@mui/material";
import { useNavigate } from "react-router";

export default function QuizInProgress({ unit }: { unit: QuizUnitInfo }) {
  const navigate = useNavigate();
  const onSubmit = () => {
    navigate("../quiz32reviewing");
  };
  return (
    <Container maxWidth="md">
      <Stack direction="column" spacing={2}>
        <UnitHeader unit={unit} />
        {unit.tasks!.map((q) => (
          <QuestionBlock task={q} />
        ))}
        <Stack alignItems="end">
          <Button variant="contained" sx={{ width: "fit-content" }} onClick={onSubmit}>
            Отправить
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
