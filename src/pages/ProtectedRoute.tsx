import { useAuthStore } from "@/store/user";
import { ReactNode } from "react";
import { Navigate } from "react-router";

export default function ProtectedRoute(props: {
  role?: string;
  children: ReactNode;
}) {
  const { isAuth } = useAuthStore();
  if (!isAuth) {
    return <Navigate to="/auth" />;
  }
  return props.children;
}
