import { Description, PlayCircle, Quiz } from "@mui/icons-material";
import {
  Grid2,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery
} from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router";

function SideBar(props: { chapters: { name: string }[] }) {
  return (
    <List
      sx={{
        width: "100%",
        border: "1px solid",
        borderColor: "#ccc",
        borderRadius: 2,
        maxHeight: "100vh",
        overflow: "scroll",
      }}
    >
      <ListItem>
        <Typography variant="h6">Содержание</Typography>
      </ListItem>
      {props.chapters.map((chapter, i) => (
        <ListItem disablePadding key={i} sx={{
          // backgroundColor: i === 0 ? "primary" : "inherit",
          backgroundColor: ""
        }}>
          <ListItemButton LinkComponent={"a"} href={`#${i}`}>
            <ListItemText primary={chapter.name} secondary="asd" />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

type UnitType = "text" | "video" | "quiz";

interface Unit {
  type: UnitType;
  title: string;
}

interface Chapter {
  name: string;
  units: Unit[];
}

export default function Course() {
  const { id } = useParams();
  const title = "Алгоритмы и структуры данных-2 и еще несколько слов";
  const chapters: { name: string; units: Unit[] }[] = Array.from({
    length: 20,
  }).map((_, i) => ({
    name: `Глава ${i + 1}`,
    units: [
      {
        type: "text",
        title: "Введение",
      },
      {
        type: "video",
        title: "Видео",
      },
      {
        type: "quiz",
        title: "Тест",
      },
    ],
  }));

  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const [showSidebar, setShowSidebar] = useState(matches);

  return (
    <Grid2
      container
      spacing={2}
      sx={{ maxWidth: "lg", marginX: "auto", marginTop: 2 }}
    >
      <Grid2
        size={{ lg: 2.5, md: 3, xs: 4 }}
        sx={{ position: "sticky", alignSelf: "start", top: 0, display: {
          xs: "none", sm: "initial"
        } }}
      >
        <SideBar chapters={chapters} />
      </Grid2>
      <Grid2
        size={{ lg: 9.5, md: 9, sm: 8 }}
        sx={{ backgroundColor: "#ddd", padding: 2, height: "100%"}}
      >
        <Typography variant="h4">{title}</Typography>
        <Stack direction="column" spacing={4}>
          {chapters.map((chapter, i) => (
            <Chapter
              key={i}
              name={chapter.name}
              id={i.toString()}
              units={chapter.units}
            />
          ))}
        </Stack>
      </Grid2>
    </Grid2>
  );
}

function Chapter(props: { name: string; id: string; units: Unit[] }) {
  return (
    <Stack direction="column" gap={1}>
      <Typography variant="h5">{props.name}</Typography>
      {props.units.map((unit, i) => (
        <Stack
          direction="row"
          gap={2}
          key={i}
          sx={{ border: "1px solid #aaa", borderRadius: 2, padding: 2 }}
        >
          <UnitIcon type={unit.type} />
          <Typography>{unit.title}</Typography>
        </Stack>
      ))}
    </Stack>
  );
}
function UnitIcon(props: { type: UnitType | never }) {
  switch (props.type) {
    case "text":
      return <Description />;
    case "video":
      return <PlayCircle />;
    case "quiz":
      return <Quiz />;
    default:
      // eslint-disable-next-line no-case-declarations
      const check: never = props.type;
      throw new Error(`Unknown unit type: ${check}`);
  }
}
