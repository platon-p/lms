import { Close, Menu } from "@mui/icons-material";
import {
  AppBar,
  Box,
  ClickAwayListener,
  Drawer,
  IconButton,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ReactNode, useState } from "react";
import {
  CourseSideBar,
  CourseSideBarProps,
  CourseSideBarSkeleton,
} from "./CourseSideBar";
import Header from "./Header";

export default function CourseLayout(props: {
  sideBarProps?: CourseSideBarProps;
  children: ReactNode;
}) {
  const lessSm = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const [open, setOpen] = useState(false);
  const backdropClick = () => {
    setOpen(false);
  };
  const sideBar = props.sideBarProps ? (
    <CourseSideBar {...props.sideBarProps} />
  ) : (
    <CourseSideBarSkeleton />
  );
  const toggleSideBar = () => {
    if (lessSm) {
      setOpen(!open);
    }
  };
  const w = useTheme().spacing(35);
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Header>
          {lessSm && (
            <IconButton color="inherit" onClick={toggleSideBar}>
              {open ? <Close /> : <Menu />}
            </IconButton>
          )}
        </Header>
      </AppBar>
      <ClickAwayListener onClickAway={() => backdropClick}>
        <Drawer
          onClose={() => setOpen(false)}
          open={open}
          variant={lessSm ? "temporary" : "permanent"}
          sx={{
            width: !lessSm ? w : 0,
          }}
          PaperProps={{
            sx: {
              width: w,
            },
          }}
        >
          <Toolbar />
          {sideBar}
        </Drawer>
      </ClickAwayListener>
      <Box component="main" sx={{ flexGrow: 1, paddingTop: 2 }}>
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}
