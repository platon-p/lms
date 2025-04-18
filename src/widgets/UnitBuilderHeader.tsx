import { Button, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router";
import ChapterPicker from "./ChapterPicker";

export default function UnitBuilderHeader(props: {
  onSubmit?: (name: string, chapter: string) => void;
}) {
  const navigate = useNavigate();
  const onClick = () => {
    props.onSubmit ? props.onSubmit?.("TODO:", "") : navigate("../../");
  };

  return (
    <Stack direction="row" gap={2}>
      <TextField required fullWidth label="Название элемента" />
      <ChapterPicker />
      <Button
        variant="contained"
        sx={{ flexShrink: 0 }}
        type="submit"
        onClick={onClick}
      >
        Сохранить
      </Button>
    </Stack>
  );
}
