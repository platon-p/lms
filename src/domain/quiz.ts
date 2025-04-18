export type RadioTask = {
  type: "radio";
  options: string[];
};
export type CheckboxTask = {
  type: "checkbox";
  options: string[];
};
export type TextTask = {
  type: "text";
};
export type AdvancedTask = {
  type: "advanced";
};

export type Task = RadioTask | CheckboxTask | TextTask | AdvancedTask;
export type TaskType = Task["type"];
export type RichTask = { title: string } & Task;
