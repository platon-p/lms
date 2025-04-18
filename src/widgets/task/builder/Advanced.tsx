import { AdvancedState } from "@/store/unitBuilder";
import Alert from "@mui/material/Alert";
import { StoreApi, UseBoundStore } from "zustand";

export default function AdvancedBuilder(_: {
  store: UseBoundStore<StoreApi<AdvancedState>>;
}) {
  return (
    <Alert severity="warning">
      Ответы на этот вопрос не могут быть обработаны автоматически. Их нужно
      будет проверить в ручном режиме
    </Alert>
  );
}
