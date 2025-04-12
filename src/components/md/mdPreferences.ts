import {
  MarkdownEditorMarkupConfig,
  UseMarkdownEditorProps,
} from "@gravity-ui/markdown-editor";
import { Math } from "@gravity-ui/markdown-editor/extensions/additional/Math/index.js";
import { YfmPreview } from "./YfmPreview";
export const Runtimes = {
  latex: "latex",
};

const renderPreview: MarkdownEditorMarkupConfig["renderPreview"] = ({
  getValue,
}) => {
  return YfmPreview({ value: getValue() });
};

export function getEditorConfig(
  label: string | undefined,
): UseMarkdownEditorProps {
  return {
    wysiwygConfig: {
      placeholderOptions: { value: label },
      extensions: (builder) => {
        builder.use(Math, {
          loadRuntimeScript: () => {
            import("@diplodoc/latex-extension/runtime");
          },
        });
      },
    },
    markupConfig: {
      splitMode: "horizontal",
      renderPreview: renderPreview,
    },
  };
}
