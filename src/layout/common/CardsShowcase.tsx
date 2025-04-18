import { Grid2, Grid2Props, Typography } from "@mui/material";
import { ReactNode } from "react";
export function CardsShowcase(props: {
  size: Grid2Props["size"];
  emptyCaption?: string;
  cards: ReactNode[];
}) {
  return (
    <Grid2
      container
      spacing={2}
      p={{ xs: 2, md: 4 }}
      sx={{ backgroundColor: (t) => t.palette.action.hover }}
    >
      {props.cards.length > 0 ? (
        props.cards.map((v) => {
          return <Grid2 size={props.size}>{v}</Grid2>;
        })
      ) : (
        <Typography variant="body1">{props.emptyCaption ?? "Пусто"}</Typography>
      )}
    </Grid2>
  );
}
