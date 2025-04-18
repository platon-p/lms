import { teacherApi } from "@/api";
import { Autocomplete, createFilterOptions, TextField } from "@mui/material";
import { useState } from "react";
import CreateChapterDialog from "./CreateChapterDialog";

interface MyType {
  inputValue?: string;
  title: string;
}
const filter = createFilterOptions<MyType>();

const initialChapters: MyType[] = teacherApi
  .getCourseChapters("")
  .map((chapter) => ({
    title: chapter,
  }));

export default function ChapterPicker() {
  const [value, setValue] = useState<MyType | null>(null);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleChapterDialogSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setValue(value);
    handleClose();
  };
  const [tmp, setTmp] = useState<string>("Новая глава"); // FIXME:
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
            setTmp(newValue.inputValue);
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
      <CreateChapterDialog
        open={open}
        initialValue={tmp}
        onClose={handleClose}
        onSubmit={handleChapterDialogSubmit}
      />
    </>
  );
}
