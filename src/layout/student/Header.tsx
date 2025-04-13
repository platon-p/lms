import { Stack, Toolbar, Typography } from "@mui/material";
import { ReactNode } from "react";

export default function Header(props: {
  children: ReactNode;
}) {
  return (
    <Toolbar>
      <Stack direction="row" gap={2} alignItems="center">
        {props.children}
        <Typography variant="h5">header data</Typography>
      </Stack>
    </Toolbar>
  );
}
