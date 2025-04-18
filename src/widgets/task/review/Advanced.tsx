import YfmEditor from "@/components/md/YfmEditor";
import YfmPreview from "@/components/md/YfmPreview";
import { Stack } from "@mui/material";

export default function AdvancedReview() {
  return (
    <Stack direction="column" gap={2}>
      <YfmPreview value="Ответ пользователя" />
      <YfmEditor label="Комментарий" />
    </Stack>
  );
}
