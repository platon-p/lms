import { createBrowserRouter, Outlet, RouteObject } from "react-router";
import { adminRoutes } from "./pages/admin/routes";
import Auth from "./pages/Auth";
import QAReview from "./pages/QAReview";
import { studentRoutes } from "./pages/student/routes";
import { teacherRoutes } from "./pages/teacher/routes";
import ProtectedRoute from "./pages/ProtectedRoute";

const routes: RouteObject[] = [
  { path: "auth", Component: Auth },
  { index: true, Component: Auth },
  { path: "qa", children: [{ path: ":qaWaveId", Component: QAReview }] },
  {
    path: "admin",
    children: adminRoutes,
    Component: () => ProtectedRoute({ children: Outlet({}) }),
  },
  {
    path: "student",
    children: studentRoutes,
    Component: () => ProtectedRoute({ children: Outlet({}) }),
  },
  {
    path: "teacher",
    children: teacherRoutes,
    Component: () => ProtectedRoute({ children: Outlet({}) }),
  },
];

export const router = createBrowserRouter(routes);
