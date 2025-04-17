import { UnitInfo } from "@/domain/unit";
import UnitHeader from "@/widgets/UnitHeader";
import { Card, CardContent, Container, Stack, Typography } from "@mui/material";

export default function Reviewing({ unit }: { unit: UnitInfo }) {
  return (
    <Container maxWidth="md">
      <Stack gap={2}>
        <UnitHeader unit={unit} />
        <Card>
          <CardContent>
            <Typography>Статус: ожидает проверки</Typography>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}
