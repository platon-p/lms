import { YfmEditor } from "@/components";
import UnitBuilderHeader from "@/widgets/UnitBuilderHeader";
import { Box, Container, Stack } from "@mui/material";

export function TextUnitBuilderPage() {
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(11);
  };
  return (
    <Container maxWidth="lg">
      <form onSubmit={submit}>
        <Stack direction="column" gap={2} py={2}>
          <UnitBuilderHeader />
          <Box
            sx={{
              "& .asds": {
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
