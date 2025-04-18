import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

export default function CreateChapterDialog(props: {
  open: boolean;
  initialValue?: string; // FIXME:
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}) {
  const [value, setValue] = useState<string>(() => props.initialValue ?? "");

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <form onSubmit={props.onSubmit}>
        <DialogTitle>Создание главы</DialogTitle>
        <DialogContent>
          <TextField
            label="Название главы"
            sx={{ my: 1 }}
            fullWidth
            required
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Alert severity="info">
            Глава будет добавлена в конец списка глав текущего курса
          </Alert>
          <DialogActions>
            <Button onClick={props.onClose}>Отмена</Button>
            <Button variant="contained" type="submit">
              Создать
            </Button>
          </DialogActions>
        </DialogContent>
      </form>
    </Dialog>
  );
}
