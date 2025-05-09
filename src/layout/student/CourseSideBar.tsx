import { Chapter } from "@/domain/course";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";
import { useState } from "react";

export interface CourseSideBarProps {
  chapters: Chapter[];
  onUnitClick?: (unitId: string) => void;
  selectedId?: number;
}

export function CourseSideBar(props: CourseSideBarProps) {
  return (
    <List
      sx={{
        width: "100%",
        height: "100%",
        overflow: "scroll",
        boxSizing: "border-box",
      }}
    >
      <ListItem>
        <Typography variant="h6">Содержание</Typography>
      </ListItem>

      {props.chapters.map((chapter, i) => (
        <ChapterListItem
          onUnitClick={props.onUnitClick}
          chapter={chapter}
          isSelected={i === props.selectedId}
        />
      ))}
    </List>
  );
}

function ChapterListItem({
  chapter,
  isSelected,
  onUnitClick,
}: {
  chapter: Chapter;
  isSelected: boolean;
  onUnitClick?: (unitId: string) => void;
}) {
  const [open, setOpen] = useState(true);

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton selected={isSelected}>
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
                  onClick={() => onUnitClick?.(unit.id)}
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

export function CourseSideBarSkeleton() {
  return (
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
      {Array.from({ length: 20 }).map(() => (
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary={<Skeleton variant="text" width="70%" />} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
