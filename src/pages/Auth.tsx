import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Button,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function Auth() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <Container maxWidth="sm" sx={{ marginTop: "20vh" }}>
      <Stack direction="column" spacing={2}>
        <Typography variant="h4" align="center">
          Заголовок
        </Typography>
        <TextField type="email" label="Почта" />
        <TextField
          type={isPasswordVisible ? "text": "password"}
          label="Пароль"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                    {isPasswordVisible? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <Stack direction="row" justifyContent="space-between">
          <Button>Поддержка</Button>
          <Button variant="contained">Продолжить</Button>
        </Stack>
      </Stack>
    </Container>
  );
}
