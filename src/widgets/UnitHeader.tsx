import { UnitInfo } from "@/domain/unit";
import AccessTime from "@mui/icons-material/AccessTime";
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
  unit: UnitInfo;
  children?: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent>
        <Stack divider={<Divider />} gap={2}>
          <Stack direction="column" spacing={2}>
            <Typography variant="h5">{unit.title}</Typography>
            {unit.type === "quiz" && (
              <Chip
                sx={{ width: "fit-content" }}
                label={`Дедлайн: ${
                  unit.deadline ? unit.deadline.toString() : "не указан"
                }`}
                icon={<AccessTime />}
              />
            )}
          </Stack>
          {children}
        </Stack>
      </CardContent>
    </Card>
  );
}
