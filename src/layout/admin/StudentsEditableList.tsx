import { adminApi } from "@/api/admin";
import { Student } from "@/domain/profiles";
import AddCircle from "@mui/icons-material/AddCircle";
import {
  Autocomplete,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function StudentsEditableList({
  studentsInitial,
  onSubmit,
}: {
  studentsInitial: Student[];
  onSubmit?: (created: Student[], deleted: Student[]) => Promise<Student[]>;
}) {
  const [currentStudents, setCurrentStudents] =
    useState<Student[]>(studentsInitial);
  const [addedStudents, setAddedStudents] = useState<Student[]>([]);
  const [removedStudents, setRemovedStudents] = useState<Student[]>([]);

  const [completionValue, setCompletionValue] = useState<Student | null>(null);
  const [inputValue, setInputValue] = useState("");

  const onAddStudent = (value: Student) => {
    setTimeout(() => {
      setCompletionValue(null);
      setInputValue("");
    });
    if (removedStudents.includes(value)) {
      onRemovedDelete(value);
      return;
    }

    if (currentStudents.includes(value)) return;
    if (addedStudents.includes(value)) return;
    setAddedStudents((v) => [...v, value]);
  };

  const onCurrentDelete = (value: Student) => {
    setCurrentStudents((v) => v.filter((s) => s !== value));
    setRemovedStudents((v) => [...v, value]);
  };

  const onAddedDelete = (value: Student) => {
    setAddedStudents((v) => v.filter((s) => s !== value));
  };

  const onRemovedDelete = (value: Student) => {
    setRemovedStudents((v) => v.filter((s) => s !== value));
    setCurrentStudents((v) => [...v, value]);
  };

  const [searchResults, setSearchResults] = useState<Student[]>();
  useEffect(() => {
    setSearchResults(undefined);
    adminApi.searchStudents(inputValue).then(setSearchResults);
  }, [inputValue]);

  const [buttonLoading, setButtonLoading] = useState(false);
  const onSubmitClick = () => {
    if (!onSubmit) return;
    setButtonLoading(true);
    onSubmit(addedStudents, removedStudents).then((v) => {
      setButtonLoading(false);
      setAddedStudents([]);
      setRemovedStudents([]);
      setCurrentStudents(v);
    });
  };

  return (
    <Stack gap={2}>
      <Autocomplete
        renderOption={(props, option) => <li {...props}>{option.name}</li>}
        getOptionLabel={(v) => v.name}
        loading={searchResults === undefined}
        autoHighlight
        inputValue={inputValue}
        onInputChange={(e, v) => setInputValue(v)}
        value={completionValue}
        onChange={(e, v) => {
          if (!v) return;
          onAddStudent(v);
        }}
        options={searchResults ?? []}
        renderInput={(params) => <TextField {...params} label="Студент" />}
      />
      <Stack
        direction="row"
        gap={2}
        sx={{ p: 2, flexWrap: "wrap", rowGap: 1 }}
        component={(props) => <Paper {...props} variant="outlined" />}
        alignItems="center"
      >
        {currentStudents.map((v) => (
          <Chip
            label={v.name}
            onDelete={() => {
              onCurrentDelete(v);
            }}
          />
        ))}
        {addedStudents.map((v) => (
          <Chip
            label={v.name}
            color="success"
            onDelete={() => {
              onAddedDelete(v);
            }}
          />
        ))}
        {removedStudents.map((v) => (
          <Chip
            label={v.name}
            color="error"
            deleteIcon={<AddCircle />}
            onDelete={() => {
              onRemovedDelete(v);
            }}
          />
        ))}
        {buttonLoading && <CircularProgress size={28} />}
      </Stack>
      <Stack direction="row" gap={2} justifyContent="end">
        <Button
          variant="contained"
          loading={buttonLoading}
          loadingPosition="end"
          onClick={onSubmitClick}
        >
          Сохранить
        </Button>
      </Stack>
    </Stack>
  );
}
