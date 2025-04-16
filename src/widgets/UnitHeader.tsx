import { TestUnitInfo } from "@/domain/unit";
import { AccessTime } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

export default function UnitHeader({
  unit,
  children,
}: {
  unit: TestUnitInfo;
  children?: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent>
        <Stack divider={<Divider />} gap={2}>
          <Stack direction="column" spacing={2}>
            <Typography variant="h4">{unit.title}</Typography>
            <Chip
              sx={{ width: "fit-content" }}
              label={
                <>
                  Дедлайн:{" "}
                  {unit.deadline ? unit.deadline.toString() : "не указан"}
                </>
              }
              icon={<AccessTime />}
            />
          </Stack>
          {children}
        </Stack>
      </CardContent>
    </Card>
  );
}
