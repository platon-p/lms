import { Close } from "@mui/icons-material";
import {
  Button,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { YfmEditor } from "../../components/md/YfmEditor";

export function RadioQuestion() {
  const [active, setActive] = useState<number | undefined>(undefined);
  const [texts, setTexts] = useState<string[]>([]);
  const onTextChange = (index: number, text: string) => {
    const newTexts = [...texts];
    newTexts[index] = text;
    setTexts(newTexts);
  };
  const addInput = () => {
    setTexts((prev) => [...prev, ""]);
  };
  const onDelete = (index: number) => {
    const newTexts = [...texts];
    newTexts.splice(index, 1);
    setTexts(newTexts);
    if (active === index) {
      setActive(undefined);
    }
  };

  return (
    <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
      <YfmEditor label="Текст задания" />
      <RadioGroup onChange={(_, value) => setActive(Number(value))}>
        <Stack direction="column" spacing={2}>
          {texts.map((v, i) => (
            <RadioRow
              text={v}
              onTextChange={(text) => onTextChange(i, text)}
              value={i}
              onDelete={() => onDelete(i)}
            />
          ))}
        </Stack>
      </RadioGroup>
      <Button variant="outlined" onClick={() => addInput()}>
        Добавить вариант
      </Button>
    </Stack>
  );
}
function RadioRow(props: {
  text: string;
  onTextChange: (text: string) => void;
  value: number;
  onDelete: () => void;
}) {
  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
      <Radio value={props.value} />
      <TextField
        fullWidth
        value={props.text}
        onChange={(e) => props.onTextChange(e.target.value)}
        label="Вариант ответа"
      />
      <IconButton onClick={() => props.onDelete()}>
        <Close />
      </IconButton>
    </Stack>
  );
}
