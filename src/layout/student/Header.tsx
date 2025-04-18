import { useAuthStore } from "@/store/user";
import {
  Button,
  Container,
  ContainerProps,
  Toolbar,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";

export default function Header(props: {
  maxWidth?: ContainerProps["maxWidth"];
  children?: ReactNode;
}) {
  const { logout } = useAuthStore();
  const onLogout = () => {
    logout().then(console.log);
  };
  return (
    <Container maxWidth={props.maxWidth} disableGutters>
      <Toolbar>
        {props.children}
        <Typography component="div" sx={{ flexGrow: 1 }} variant="h5">
          LMS
        </Typography>
        <Button color="inherit" onClick={onLogout}>
          выйти
        </Button>
      </Toolbar>
    </Container>
  );
}
