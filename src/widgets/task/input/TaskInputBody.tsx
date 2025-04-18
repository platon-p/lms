import { RichTask } from "@/domain/quiz";
import AdvancedInput from "./Advanced";
import CheckboxInput from "./Checkbox";
import RadioInput from "./Radio";
import TextInput from "./Text";

export default function TaskInputBody({
  task,
}: {
  task: RichTask;
}): JSX.Element {
  switch (task.type) {
    case "text":
      return <TextInput />;
    case "radio":
      return <RadioInput options={task.options} />;
    case "checkbox":
      return <CheckboxInput options={task.options} />;
    case "advanced":
      return <AdvancedInput />;
  }
}
