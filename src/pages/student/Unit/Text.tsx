import { YfmPreview } from "@/components";
import { TextUnitInfo } from "@/domain/unit";
import { Stack, Typography } from "@mui/material";

export default function TextUnit(props: { unit: TextUnitInfo }) {
  return (
    <Stack direction="column" spacing={2}>
      <Typography>{props.unit.title}</Typography>
      <YfmPreview value={props.unit.content} />
    </Stack>
  );
}
