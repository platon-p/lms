import { mockLoadQAsShowcase } from "@/data/student";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function QAsShowcase() {
  const [showcase, setShowcase] = useState<
    { title: string; beginDate: Date; endDate: Date }[] | undefined
  >();
  useEffect(() => {
    mockLoadQAsShowcase().then(setShowcase);
  }, []);
  return (
    <Stack direction="column" spacing={1}>
      {showcase ? (
        showcase.length === 0 ? (
          <QAEmptyList />
        ) : (
          showcase.map((v) => <QAWave title={v.title} />)
        )
      ) : (
        <QAWaveSkeleton />
      )}
    </Stack>
  );
}

function QAEmptyList() {
  return <Typography>Нет предстоящих волн СОП</Typography>;
}

function QAWaveSkeleton() {
  return <Skeleton variant="rounded" width="100%" height="4rem" />;
}

function QAWave(props: { title: string }) {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("testing");
  };
  return (
    <Tooltip title="Необходимо заполнить анкету">
      <Card>
        <CardActionArea onClick={onClick}>
          <CardContent>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle1">{props.title}</Typography>
              <Button>Пройти</Button>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </Tooltip>
  );
}
