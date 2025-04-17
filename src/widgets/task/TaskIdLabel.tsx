import Typography from "@mui/material/Typography";

export default function TaskIdLabel(
  props:
    | { title: string }
    | {
        id: number;
      },
) {
  return (
    <Typography align="center" variant="h5">
      {"title" in props ? props.title : `#${props.id}`}
    </Typography>
  );
}
