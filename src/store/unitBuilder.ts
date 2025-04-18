import { TaskType } from "@/domain/quiz";
import { create, StateCreator, StoreApi, UseBoundStore } from "zustand";

export interface QuizUnitBuilderProps {
  tasks: UseBoundStore<StoreApi<BuilderStatePlus>>[];
  onAdd: (type: TaskType) => void;
  onDelete: (id: number) => void;
  onMoveUp: (id: number) => void;
  onMoveDown: (id: number) => void;
}

type BuilderState = CheckboxState | RadioState | TextState | AdvancedState;
type BuilderStatePlus = BuilderState & {
  title: string;
  setTitle(title: string): void;
};

export interface CheckboxState {
  type: "checkbox";
  options: { name: string; checked: boolean }[];
  add(): void;
  setName(index: number, value: string): void;
  setChecked(index: number, value: boolean): void;
  remove(index: number): void;
}
export interface RadioState {
  type: "radio";
  options: string[];
  activeId: number | null;
  add(): void;
  remove(index: number): void;
  setActive(index: number): void;
  setText(index: number, value: string): void;
}
export interface TextState {
  type: "text";
  value: string;
  setValue(newValue: string): void;
}
export interface AdvancedState {
  type: "advanced";
}

const createAdvancedStore: StateCreator<AdvancedState> = () => ({
  type: "advanced",
});
const createTextStore: StateCreator<TextState> = (set) => ({
  type: "text",
  value: "",
  setValue(newValue: string) {
    set({ value: newValue });
  },
});
const createRadioState: StateCreator<RadioState> = (set, get) => ({
  type: "radio",
  activeId: null,
  options: [],
  add() {
    set({ options: [...get().options, ""] });
  },
  remove(index) {
    const newOptions = [...get().options];
    newOptions.splice(index, 1);
    set({ options: newOptions });
    if (get().activeId === index) {
      set({ activeId: null });
    }
  },
  setActive(index) {
    set({ activeId: index });
  },
  setText(index, value) {
    const newOptions = [...get().options];
    newOptions[index] = value;
    set({ options: newOptions });
  },
});
const createCheckboxState: StateCreator<CheckboxState> = (set, get) => ({
  type: "checkbox",
  options: [],
  add() {
    set({ options: [...get().options, { checked: false, name: "" }] });
  },
  setName(index: number, value: string) {
    const newOptions = [...get().options];
    newOptions[index].name = value;
    set({ options: newOptions });
  },
  setChecked(index, value) {
    const newOptions = [...get().options];
    newOptions[index].checked = value;
    set({ options: newOptions });
  },
  remove(index) {
    const newOptions = [...get().options];
    newOptions.splice(index, 1);
    set({ options: newOptions });
  },
});

const constructors = {
  radio: createRadioState,
  checkbox: createCheckboxState,
  text: createTextStore,
  advanced: createAdvancedStore,
};

const build = (type: TaskType) =>
  create<BuilderStatePlus>((set, get, rest) => ({
    title: "",
    setTitle: (title: string) => set({ title }),
    // @ts-expect-error setter type maybe not match
    ...constructors[type](set, get, rest),
  }));

export const useQuizBuilderStore = create<QuizUnitBuilderProps>((set, get) => ({
  tasks: [],
  onAdd: (type) => {
    set((state) => ({ tasks: [...state.tasks, build(type)] }));
  },
  onDelete: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((_, index) => index !== id),
    }));
  },
  onMoveUp: (id) => {
    if (id === 0) return;
    set((state) => ({
      tasks: [
        ...state.tasks.slice(0, id - 1),
        state.tasks[id],
        state.tasks[id - 1],
        ...state.tasks.slice(id + 1),
      ],
    }));
  },
  onMoveDown: (id) => {
    if (id === get().tasks.length - 1) return;
    set((state) => ({
      tasks: [
        ...state.tasks.slice(0, id),
        state.tasks[id + 1],
        state.tasks[id],
        ...state.tasks.slice(id + 1),
      ],
    }));
  },
}));
