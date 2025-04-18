import { YfmEditor } from "@/components";
import UnitBuilderHeader from "@/widgets/UnitBuilderHeader";
import { Box, Container, Stack } from "@mui/material";
import { useState } from "react";

export default function ArticleBuilder() {
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const [articleText, setAticleText] = useState<string>("");
  console.log(articleText);

  return (
    <Container maxWidth="lg">
      <form onSubmit={submit}>
        <Stack direction="column" gap={2} py={2}>
          <UnitBuilderHeader />

          <Box
            sx={{
              "& .my-md-editor": {
                backgroundColor: "white",
                minHeight: "50vh !important",
              },
            }}
          >
            <YfmEditor
              value={articleText}
              onChange={(v) => setAticleText(v)}
              className="my-md-editor"
            />
          </Box>
        </Stack>
      </form>
    </Container>
  );
}
