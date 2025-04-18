import { QuizUnitInfo } from "@/domain/unit";
import UnitHeader from "@/widgets/UnitHeader";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export default function QuizNotStarted({ unit }: { unit: QuizUnitInfo }) {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`../quiz22in-progress`); // FIXME:
  };
  return (
    <Box
      sx={{
        maxWidth: "md",
        mx: "auto",
        px: 2,
      }}
    >
      <UnitHeader unit={unit}>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>Пока вы не приступили к тесту</Typography>
          <Button
            variant="contained"
            sx={{ width: "fit-content", marginLeft: "100%" }}
            onClick={onClick}
          >
            Начать
          </Button>
        </Stack>
      </UnitHeader>
    </Box>
  );
}
