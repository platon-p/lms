import { UnitHeader } from "@/domain/course";
import { Button, Typography } from "@mui/material";
import UnitIcon from "./UnitIcon";

export default function UnitListItem({
  unitHeader,
  onClick,
}: {
  unitHeader: UnitHeader;
  onClick: () => void;
}) {
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      size="large"
      sx={{ justifyContent: "start", gap: 1, textTransform: "none" }}
      startIcon={<UnitIcon type={unitHeader.type} />}
    >
      <Typography>{unitHeader.title}</Typography>
    </Button>
  );
}
