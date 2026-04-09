import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuth, type UserRole } from "@/app/auth-context";

function getDefaultRolePath(role: UserRole) {
  if (role === "ceo") {
    return "/ceo";
  }

  if (role === "team-lead") {
    return "/team-lead";
  }

  if (role === "developer") {
    return "/developer";
  }

  if (role === "qa") {
    return "/qa";
  }

  if (role === "admin") {
    return "/admin";
  }

  return "/project-manager";
}

export function RoleLandingRedirect() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={getDefaultRolePath(user.role)} replace />;
}

export function ProtectedRoleRoute({ allowedRoles }: { allowedRoles: UserRole[] }) {
  const { user, setRole } = useAuth();
  const targetRole = allowedRoles[0];

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <PrototypeRoleSwitch currentRole={user.role} targetRole={targetRole} setRole={setRole} />;
  }

  return <Outlet />;
}

function PrototypeRoleSwitch({
  currentRole,
  targetRole,
  setRole,
}: {
  currentRole: UserRole;
  targetRole: UserRole;
  setRole: (role: UserRole) => void;
}) {
  useEffect(() => {
    if (currentRole !== targetRole) {
      setRole(targetRole);
    }
  }, [currentRole, targetRole, setRole]);

  return null;
}
