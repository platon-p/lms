import { UnitHeader } from "@/domain/course";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import UnitIcon from "./UnitIcon";

export default function UnitListItem(props: UnitHeader) {
  const navigate = useNavigate();
  const goToTest = () => {
    if (props.type === "test") {
      navigate(`./${props.id}`);
    }
  };
  return (
    <Button
      onClick={goToTest}
      variant="outlined"
      size="large"
      sx={{ justifyContent: "start", gap: 1, textTransform: "none" }}
      startIcon={<UnitIcon type={props.type} />}
    >
      <Typography>{props.title}</Typography>
    </Button>
  );
}
