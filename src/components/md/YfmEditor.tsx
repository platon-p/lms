import "@diplodoc/transform/dist/js/yfm";
import {
  MarkdownEditorView,
  useMarkdownEditor,
  wMathListItem,
  wysiwygToolbarConfigs,
} from "@gravity-ui/markdown-editor";
import "@gravity-ui/uikit/styles/styles.css";
import { Box } from "@mui/material";
import { getEditorConfig } from "./mdPreferences";

export function YfmEditor(props: { label?: string }) {
  const wtcfg = [...wysiwygToolbarConfigs.wToolbarConfig];
  wtcfg.push([wMathListItem]);

  const editor = useMarkdownEditor(getEditorConfig(props.label));
  return (
    <Box
      sx={{
        "& .md-editor": {
          border: "1px solid #ccc",
          borderRadius: "4px",
          minHeight: "10rem",
          boxSizing: "border-box",
          padding: 1,
        },
        "& .md-editor:hover": {
          border: "1px solid #888",
        },
        "& .md-editor:focus-within": {
          border: "2px solid",
          borderColor: (theme) => theme.palette.primary.main,
        },
      }}
    >
      <MarkdownEditorView
        wysiwygToolbarConfig={wtcfg}
        stickyToolbar
        editor={editor}
        className="md-editor"
      />
    </Box>
  );
}
