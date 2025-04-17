import { YfmPreview } from "@/components";
import { ArticleUnitInfo } from "@/domain/unit";
import UnitHeader from "@/widgets/UnitHeader";
import { Card, CardContent, Container, Stack } from "@mui/material";

export default function ArticleUnit(props: { unit: ArticleUnitInfo }) {
  return (
    <Container maxWidth="md">
      <Stack direction="column" spacing={2}>
        <UnitHeader unit={props.unit} />
        <Card>
          <CardContent sx={{ m: 2 }}>
            <YfmPreview value={props.unit.content} />
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}
