import { Menu } from "@mui/icons-material";
import { Drawer, IconButton, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { CourseSideBarSkeleton } from "./CourseSideBar";

export default function Header() {
  const [open, setOpen] = useState(false);
  const onMenuClick = () => {
    setOpen(true);
  };
  const backdropClick = () => {
    setOpen(false);
  };
  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Drawer
        open={open}
        sx={{ zIndex: 999 }}
        onClick={backdropClick}
        PaperProps={{
          elevation: 0,
          sx: { width: "18rem" },
        }}
      >
        <CourseSideBarSkeleton paperOff />
      </Drawer>
      <Stack direction="row" alignItems="center" gap={1}>
        <IconButton onClick={onMenuClick}>
          <Menu />
        </IconButton>
        <Typography variant="h5">asds</Typography>
      </Stack>
    </Paper>
  );
}
