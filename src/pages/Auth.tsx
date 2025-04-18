import { useAuthStore } from "@/store/user";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Alert,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Auth() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, role } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    setError(undefined);
    e?.preventDefault();
    signIn(email, password)
      .then(() => navigate(`/${role}`))
      .catch((e) => {
        setError(e.message);
      });
  };
  const onClick = () => {
    onSubmit();
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: "20vh" }}>
      <form onSubmit={onSubmit}>
        <Stack direction="column" spacing={2}>
          <Typography variant="h4" align="center">
            Авторизация
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            required
            type="email"
            label="Почта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            type={isPasswordVisible ? "text" : "password"}
            label="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                      {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Stack direction="row" justifyContent="space-between">
            <Button>Поддержка</Button>
            <Button type="submit" variant="contained" onClick={onClick}>
              Продолжить
            </Button>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
}
