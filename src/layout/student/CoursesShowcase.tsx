import { studentApi } from "@/api";
import { CourseHeader } from "@/domain/course";
import { CourseItem, CourseItemSkeleton } from "@/widgets";
import { Stack, TablePagination, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { CardsShowcase } from "../common/CardsShowcase";

export default function CoursesShowcase() {
  const count = 40;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [coursesQuery, setCoursesQuery] = useState("");

  const [cards, setCards] = useState<CourseHeader[] | undefined>();

  const onChangeRowsPerPage = (value: number) => {
    setPage(0);
    setRowsPerPage(value);
  };

  useEffect(() => {
    setCards(undefined);
    studentApi
      .getCourses(coursesQuery, rowsPerPage, rowsPerPage * page)
      .then(setCards);
  }, [coursesQuery, rowsPerPage, page]);

  return (
    <Stack direction="column" spacing={1}>
      <TextField
        value={coursesQuery}
        onChange={(e) => setCoursesQuery(e.target.value)}
        fullWidth
        placeholder="Искать"
      />
      <CardsShowcase
        size={{ xs: 12, sm: 4 }}
        cards={
          cards
            ? cards.map((v) => <CourseItem id={v.id} title={v.title} />)
            : Array.from({ length: 8 }).map(() => <CourseItemSkeleton />)
        }
      />

      <TablePagination
        count={count}
        onPageChange={(_, v) => setPage(v)}
        page={page}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) =>
          onChangeRowsPerPage(Number.parseInt(e.target.value))
        }
        rowsPerPageOptions={[10, 20]}
        component="div"
      />
    </Stack>
  );
}
