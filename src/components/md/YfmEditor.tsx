import "@diplodoc/transform/dist/js/yfm";
import {
  MarkdownEditorView,
  useMarkdownEditor,
  wMathListItem,
  wysiwygToolbarConfigs,
} from "@gravity-ui/markdown-editor";
import { Box } from "@mui/material";
import { getEditorConfig } from "./mdPreferences";

export default function YfmEditor(props: {
  label?: string;
  className?: string;
}) {
  const wtcfg = [...wysiwygToolbarConfigs.wToolbarConfig];
  wtcfg.push([wMathListItem]);

  const editor = useMarkdownEditor(getEditorConfig(props.label));
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
