import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

const coursess = ["aaa", "bbb", "ccc"];
export default function AdminSideBar() {
  const [courses, setCourses] = useState(coursess);
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    setCourses(coursess.filter((v) => v.startsWith(inputValue)));
  }, [inputValue]);

  return (
    <Stack direction="column">
      <TextField
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        sx={{ m: 1 }}
      />
      <List>
        {courses.map((v) => (
          <ListItem disableGutters disablePadding>
            <ListItemButton>
              <ListItemText>{v}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
