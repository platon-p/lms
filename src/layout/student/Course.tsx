import { Box, Stack, useMediaQuery } from "@mui/material";
import { ReactNode } from "react";
import {
  CourseSideBar,
  CourseSideBarProps,
  CourseSideBarSkeleton,
} from "./CourseSideBar";
import Header from "./Header";

export default function Course(props: {
  sideBarProps?: CourseSideBarProps;
  children: ReactNode;
}) {
  const lessSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Stack direction="column" gap={2}>
      <Header />
      <Stack direction="row" gap={2} sx={{ minWidth: "sm" }}>
        <Box
          sx={{
            position: "sticky",
            alignSelf: "start",
            top: 0,
            display: lessSm ? "none" : undefined,
          }}
        >
          {props.sideBarProps ? (
            <CourseSideBar {...props.sideBarProps} />
          ) : (
            <CourseSideBarSkeleton />
          )}
        </Box>
        <Box sx={{ width: "100%" }}>{props.children}</Box>
      </Stack>
    </Stack>
  );
}
