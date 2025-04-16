import {
  Autocomplete,
  Button,
  createFilterOptions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface MyType {
  inputValue?: string;
  title: string;
}
const filter = createFilterOptions<MyType>();

const initialChapters: MyType[] = ["Функции", "Множества", "Логика"].map(
  (chapter) => ({
    title: chapter,
  })
);

export default function ChapterPicker() {
  const [value, setValue] = useState<MyType | null>(null);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleChapterDialogSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    // setValue(value);
    handleClose();
  };
  return (
    <>
      <Autocomplete
        value={value}
        freeSolo
        autoHighlight
        onChange={(e, newValue) => {
          if (!newValue || typeof newValue === "string") {
            return;
          }
          if (newValue.inputValue) {
            setTimeout(() => {
              setOpen(true);
            });
          } else {
            setValue(newValue);
          }
        }}
        filterOptions={(opts, params) => {
          const z = filter(opts, params);
          if (params.inputValue != "") {
            z.push({
              inputValue: params.inputValue,
              title: "Добавить " + params.inputValue,
            });
          }
          return z;
        }}
        getOptionLabel={(option) => {
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.title;
        }}
        renderOption={(props, option) => <li {...props}>{option.title}</li>}
        options={initialChapters}
        renderInput={(props) => (
          <TextField {...props} sx={{ minWidth: "14rem" }} label="Глава" />
        )}
      />
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleChapterDialogSubmit}>
          <DialogTitle>Создание главы</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Глава с именем "имя" будет добавлена в конец списка глав текущего
              курса
            </DialogContentText>
            <DialogActions>
              <Button>Отмена</Button>
              <Button variant="contained" type="submit">
                Создать
              </Button>
            </DialogActions>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}
