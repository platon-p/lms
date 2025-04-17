import { createBrowserRouter, RouteObject } from "react-router";
import { adminRoutes } from "./pages/admin/routes";
import Auth from "./pages/Auth";
import QAReview from "./pages/QAReview";
import { studentRoutes } from "./pages/student/routes";
import { teacherRoutes } from "./pages/teacher/routes";

const routes: RouteObject[] = [
  { path: "auth", Component: Auth },
  { path: "qa", children: [{ path: ":qaWaveId", Component: QAReview }] },
  { path: "admin", children: adminRoutes },
  {
    path: "student",
    children: studentRoutes,
    // Component: () => ProtectedRoute({ children: Outlet({}) }),
  },
  { path: "teacher", children: teacherRoutes },
];

export const router = createBrowserRouter(routes);
