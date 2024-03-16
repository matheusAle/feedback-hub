import { useAuth } from "@/providers/AuthProvider/AuthProvider";
import React from "react";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return children;
};
