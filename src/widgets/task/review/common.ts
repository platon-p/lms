import { SxProps, Theme } from "@mui/material";

export const incorrectSx: SxProps<Theme> = {
  color: (t) => t.palette.error.main,
  "&.Mui-checked": {
    color: (t) => t.palette.error.main,
  },
};

export const correctSx: SxProps<Theme> = {
  color: (t) => t.palette.success.main,
  "&.Mui-checked": {
    color: (t) => t.palette.success.main,
  },
};
