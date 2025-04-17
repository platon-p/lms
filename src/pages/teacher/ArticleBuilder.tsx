import { YfmEditor } from "@/components";
import UnitBuilderHeader from "@/widgets/UnitBuilderHeader";
import { Box, Card, CardContent, Container, Stack } from "@mui/material";

export default function ArticleBuilder() {
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <Container maxWidth="lg">
      <form onSubmit={submit}>
        <Stack direction="column" gap={2} py={2}>
          <Card>
            <CardContent>
              <UnitBuilderHeader />
            </CardContent>
          </Card>

          <Box
            sx={{
              "& .asds": {
                backgroundColor: "white",
                minHeight: "50vh !important",
              },
            }}
          >
            <YfmEditor className="asds" />
          </Box>
        </Stack>
      </form>
    </Container>
  );
}
