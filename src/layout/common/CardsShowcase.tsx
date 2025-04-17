import { Grid2, Grid2Props } from "@mui/material";
import { ReactNode } from "react";
export function CardsShowcase(props: {
  size: Grid2Props["size"];
  cards: ReactNode[];
}) {
  return (
    <Grid2
      container
      spacing={2}
      p={{ xs: 2, md: 4 }}
      sx={{ backgroundColor: (t) => t.palette.action.hover }}
    >
      {props.cards.map((v) => {
        return <Grid2 size={props.size}>{v}</Grid2>;
      })}
    </Grid2>
  );
}
