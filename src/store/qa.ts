import { studentApi } from "@/api";
import { QualityAssessmentPage } from "@/domain/qa";
import { create, StoreApi, UseBoundStore } from "zustand";

export const criterias = [
  "Ясность материала",
  "Ясность требований",
  "Коммуникация",
] as const;

export type QAPage = QualityAssessmentPage & {
  validate(): void;
  isCompleted: boolean;
  remark: string;
  setRemark(remark: string): void;
  criteriaValues: Record<(typeof criterias)[number], number | null>;
  setCriteriaValue(key: (typeof criterias)[number], value: number): void;
};

interface QAStore {
  init(): Promise<void>;
  state: "loading" | "loaded";
  pages: UseBoundStore<StoreApi<QAPage>>[];
  activeIndex: number;
  setActiveIndex(index: number): void;
  nextPage(): void;
  isCompleted: boolean;
  validate(): void;
}

const createQAPage = (data: QualityAssessmentPage) =>
  create<QAPage>((set, get) => ({
    name: data.name,
    isCompleted: false,
    teacher: data.teacher,
    remark: "",
    setRemark(remark: string) {
      set({ remark: remark });
    },
    criteriaValues: Object.assign({}, ...criterias.map((k) => ({ [k]: null }))),
    setCriteriaValue(key, value) {
      set((state) => ({
        criteriaValues: { ...state.criteriaValues, [key]: value },
      }));
    },
    validate() {
      const { remark, criteriaValues } = get();
      const valid =
        remark !== "" && Object.values(criteriaValues).every((v) => v !== null);
      set({ isCompleted: valid });
    },
  }));

export const useQAStore = create<QAStore>((set, get) => ({
  async init(): Promise<void> {
    const pages = await studentApi.getQAWaveContent("TODO:");
    set({ state: "loaded", pages: pages.map((v) => createQAPage(v)) });
  },
  state: "loading",
  pages: [],
  activeIndex: 0,
  setActiveIndex(index: number) {
    const { activeIndex } = get();
    if (activeIndex == index) return;
    get().pages[activeIndex].getState().validate();
    set({ activeIndex: index });
  },
  nextPage() {
    if (get().state == "loading") return;
    const statuses = get().pages.map((v) => !v.getState().isCompleted);
    const right = statuses.indexOf(true, get().activeIndex + 1);
    if (right >= 0) {
      get().setActiveIndex(right);
      return;
    }
    const left = statuses.indexOf(true);
    if (left >= 0) {
      get().setActiveIndex(left);
    }
  },
  isCompleted: false,
  validate() {
    if (get().state === "loading") return;
    get().pages[get().activeIndex].getState().validate();
    const isCompleted = get().pages.every((v) => {
      return v.getState().isCompleted === true;
    });
    set({ isCompleted: isCompleted });
  },
}));
