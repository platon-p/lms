import { Avatar, Chip } from "@mui/material";

export default function TeacherChip({ name }: { name: string }) {
  return <Chip label={name} avatar={<Avatar>{name.substring(0, 2)}</Avatar>} />;
}
