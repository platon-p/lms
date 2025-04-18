import { QAWaveHeader } from "@/domain/qa";
import AccessTime from "@mui/icons-material/AccessTime";
import Done from "@mui/icons-material/Done";
import {
  Badge,
  Card,
  CardActionArea,
  CardContent,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

export default function QAWaveCard({
  wave,
  onClick,
}: {
  wave: QAWaveHeader;
  onClick?: () => void;
}) {
  return (
    <Card>
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Stack height={70} justifyContent="space-between">
            <Typography display="inline-block" variant="h6">
              {wave.title}
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="caption" color="text.secondary">
                {wave.beginDate.toDateString()} - {wave.endDate.toDateString()}
              </Typography>
              <Badge>
                {wave.status === "finished" ? <Done /> : <AccessTime />}
              </Badge>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export function QAWaveItemSkeleton() {
  const s = useTheme().spacing(4);

  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Stack height={70} justifyContent="space-between">
            <Typography variant="h6">
              <Skeleton width="70%" />
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="caption" width="100%">
                <Skeleton width="70%" />
              </Typography>
              <Skeleton variant="circular" sx={{borderRadius: "100%"}} height={s} width={s} />
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
