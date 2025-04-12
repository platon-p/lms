import { Chapter } from "@/domain/course";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import { useState } from "react";

export interface CourseSideBarProps {
  chapters: Chapter[];
  selectedId?: number;
}

export function CourseSideBar(props: CourseSideBarProps) {
  return (
    <Paper
      elevation={2}
      sx={{
        width: "14rem",
      }}
    >
      <List
        sx={{
          width: "100%",
          maxHeight: "100vh",
          overflow: "scroll",
        }}
      >
        <ListItem>
          <Typography variant="h6">Содержание</Typography>
        </ListItem>

        {props.chapters.map((chapter, i) => (
          <ChapterListItem
            chapter={chapter}
            selected={i === props.selectedId}
          />
        ))}
      </List>
    </Paper>
  );
}

function ChapterListItem({
  chapter,
  selected,
}: {
  chapter: Chapter;
  selected: boolean;
}) {
  const [open, setOpen] = useState(true);
  return (
    <>
      <ListItem disablePadding>
        <ListItemButton selected={selected}>
          <ListItemText>{chapter.name}</ListItemText>
        </ListItemButton>
        <IconButton onClick={() => setOpen(!open)}>
          {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </ListItem>
      <Collapse in={open}>
        <List>
          {chapter.units.map((unit, ii) => {
            return (
              <ListItem disablePadding key={ii}>
                <ListItemButton
                  sx={{ pl: 4 }}
                  LinkComponent={"a"}
                  href={`#${ii}`}
                >
                  <ListItemText primary={unit.title} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </>
  );
}

export function CourseSideBarSkeleton(props: { paperOff?: boolean }) {
  const content = (
    <List
      sx={{
        maxHeight: "100%",
        overflow: "scroll",
        boxSizing: "border-box",
      }}
    >
      <ListItem>
        <Typography variant="h6">Содержание</Typography>
      </ListItem>
      {Array.from({ length: 8 }).map(() => (
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary={<Skeleton width="70%" height="1.5rem" />} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
  if (props.paperOff) {
    return content;
  }
  return <Paper elevation={2} sx={{ width: "14rem" }}>{content}</Paper>
  
}
