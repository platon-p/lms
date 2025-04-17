import { YfmPreview } from "@/components";
import { RichTask } from "@/domain/quiz";
import TaskInputBody from "@/widgets/task/input/TaskInputBody";
import { Card, CardContent, Stack } from "@mui/material";

export default function QuestionBlock({ task }: { task: RichTask }) {
  return (
    <Card>
      <CardContent>
        <Stack direction="column" gap={2}>
          <YfmPreview value={task.title} />
          <TaskInputBody task={task} />
        </Stack>
      </CardContent>
    </Card>
  );
}
