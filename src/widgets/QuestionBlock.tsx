import { YfmPreview } from "@/components";
import { RichTask } from "@/domain/quiz";
import TaskInputBody from "@/widgets/task/input/TaskInputBody";
import { Card, CardContent, Stack } from "@mui/material";

export default function QuestionBlock({ task }: { task: RichTask }) {
  const selection = false;

  return (
    <Card>
      <CardContent>
        <Stack
          direction="column"
          gap={2}
          sx={{
            // 1st child's user-select: "none",
            "& > :first-of-type": {
              userSelect: selection ? undefined : "none",
            },
          }}
        >
          <YfmPreview value={task.title} />
          <TaskInputBody task={task} />
        </Stack>
      </CardContent>
    </Card>
  );
}
