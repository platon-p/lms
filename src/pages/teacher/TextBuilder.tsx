import { YfmEditor } from "@/components";
import { Box } from "@mui/material";

export function TextUnitBuilderPage() {
  return (
    <Box
      sx={{
        "& .asds": {
          minHeight: "50vh",
        },
      }}
    >
      <YfmEditor className="asds" />
    </Box>
  );
}
