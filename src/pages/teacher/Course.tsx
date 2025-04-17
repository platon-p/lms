import CourseLayout from "@/layout/student/Course";
import CourseContent from "@/layout/teacher/CourseContent";
import { useNavigate, useParams } from "react-router";

export default function Course() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const onUnitClick = (unitId: string) => {
    navigate(`./review/${unitId}`);
  };

  return (
    <CourseLayout courseId={courseId!}>
      <CourseContent courseId={courseId!} onUnitClick={onUnitClick} />
    </CourseLayout>
  );
}
