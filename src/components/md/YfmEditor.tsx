import "@diplodoc/transform/dist/js/yfm";
import {
  MarkdownEditorView,
  useMarkdownEditor,
  wMathListItem,
  wysiwygToolbarConfigs,
} from "@gravity-ui/markdown-editor";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { getEditorConfig } from "./mdPreferences";

export default function YfmEditor(props: {
  label?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  const wtcfg = [...wysiwygToolbarConfigs.wToolbarConfig];
  wtcfg.push([wMathListItem]);
  const { onChange } = props;

  const editor = useMarkdownEditor(getEditorConfig(props.label));

  useEffect(() => {
    const listener = () => {
      onChange?.(editor.getValue());
    };
    editor.on("change", listener);
    return () => {
      editor.off("change", listener);
    };
  }, [editor, onChange]);

  return (
    <Box
      sx={{
        width: "100%",
        "& .md-editor": {
          padding: 1,
          boxSizing: "border-box",
          minHeight: "10rem",
          border: "1px solid #ccc",
          borderRadius: "4px",
          transitionDuration: "100ms",
        },
        "& .md-editor:hover": {
          border: "1px solid #888",
        },
        "& .md-editor:focus-within": {
          borderColor: (theme) => theme.palette.primary.main,
        },
      }}
    >
      <MarkdownEditorView
        wysiwygToolbarConfig={wtcfg}
        stickyToolbar
        editor={editor}
        className={(props.className || "") + " md-editor"}
      />
    </Box>
  );
}
