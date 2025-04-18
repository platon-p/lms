import { teacherApi } from "@/api/teacher";
import { StudentQuizReportPreview } from "@/domain/review";
import { UnitInfo } from "@/domain/unit";
import UnitHeader from "@/widgets/UnitHeader";
import {
  Card,
  CardContent,
  Container,
  Skeleton,
  Stack,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

// TODO: view comments
export default function Finished({ unit }: { unit: UnitInfo }) {
  const { courseId, unitId } = useParams();
  const [report, setReport] = useState<StudentQuizReportPreview>();
  useEffect(() => {
    teacherApi
      .getQuizReportByStudent(courseId!, unitId!, "TODO:") // FIXME: teacherApi -> studentApi
      .then(setReport);
  }, [courseId, unitId]);
  return (
    <Container maxWidth="md">
      <Stack gap={2}>
        <UnitHeader unit={unit} />
        <Card>
          <CardContent>
            <Typography>
              Набрано баллов:{" "}
              {report?.total ?? (
                <Skeleton
                  sx={{
                    display: "inline-block",
                    width: 30,
                  }}
                />
              )}
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}
