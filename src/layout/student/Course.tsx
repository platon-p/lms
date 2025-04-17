import { useCourse } from "@/store/unit";
import Close from "@mui/icons-material/Close";
import Menu from "@mui/icons-material/Menu";
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
import { CourseSideBar, CourseSideBarSkeleton } from "./CourseSideBar";
import Header from "./Header";

export default function CourseLayout(props: {
  children?: ReactNode;
  courseId: string;
  onUnitClick?: (unitId: string) => void;
}) {
  const course = useCourse(props.courseId);
  const [open, setOpen] = useState(false);

  const lessSm = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const backdropClick = () => {
    setOpen(false);
  };
  const toggleSideBar = () => {
    if (lessSm) {
      setOpen(!open);
    }
  };
  const sideBar = course ? (
    <CourseSideBar onUnitClick={props.onUnitClick} chapters={course.chapters} />
  ) : (
    <CourseSideBarSkeleton />
  );

  const w = useTheme().spacing(35);
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Header maxWidth={false}>
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
