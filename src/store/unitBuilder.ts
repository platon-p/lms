import { QuestionType } from "@/domain/test";
import { create } from "zustand";

export interface TestUnitBuilderProps {
  questions: QuestionType[];
  onAdd: (type: QuestionType) => void;
  onDelete: (id: number) => void;
  onMoveUp: (id: number) => void;
  onMoveDown: (id: number) => void;
}

export const useTestBuilderStore = create<TestUnitBuilderProps>((set, get) => ({
  questions: [],
  onAdd: (type) => {
    set((state) => ({ questions: [...state.questions, type] }));
  },
  onDelete: (id) => {
    set((state) => ({
      questions: state.questions.filter((_, index) => index !== id),
    }));
  },
  onMoveUp: (id) => {
    if (id === 0) return;
    set((state) => ({
      questions: [
        ...state.questions.slice(0, id - 1),
        state.questions[id],
        state.questions[id - 1],
        ...state.questions.slice(id + 1),
      ],
    }));
  },
  onMoveDown: (id) => {
    if (id === get().questions.length - 1) return;
    set((state) => ({
      questions: [
        ...state.questions.slice(0, id),
        state.questions[id + 1],
        state.questions[id],
        ...state.questions.slice(id + 1),
      ],
    }));
  },
}));
