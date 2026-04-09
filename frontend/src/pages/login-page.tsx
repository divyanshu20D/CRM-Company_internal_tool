import { useNavigate } from "react-router-dom";

import { useAuth, type UserRole } from "@/app/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function getRolePath(role: UserRole) {
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

export function LoginPage() {
  const navigate = useNavigate();
  const { setRole } = useAuth();

  const handleRoleLogin = (role: UserRole) => {
    setRole(role);
    navigate(getRolePath(role), { replace: true });
  };

  return (
    <main className="flex min-h-svh items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.08),_transparent_28%),radial-gradient(circle_at_right,_rgba(16,185,129,0.07),_transparent_22%),var(--background)] p-6">
      <Card className="w-full max-w-xl rounded-md border-border/80 shadow-sm">
        <CardHeader>
          <CardTitle>Login Route Ready</CardTitle>
          <CardDescription>
            This is a temporary role picker for the frontend prototype. In the real product, login will come from WorkOS and routing will follow the authenticated user role.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <Button onClick={() => handleRoleLogin("ceo")}>Open CEO Panel</Button>
            <Button variant="outline" onClick={() => handleRoleLogin("project-manager")}>
              Open Project Manager Panel
            </Button>
            <Button variant="outline" onClick={() => handleRoleLogin("team-lead")}>
              Open Team Lead Panel
            </Button>
            <Button variant="outline" onClick={() => handleRoleLogin("developer")}>
              Open Developer Panel
            </Button>
            <Button variant="outline" onClick={() => handleRoleLogin("qa")}>
              Open QA Panel
            </Button>
            <Button variant="outline" onClick={() => handleRoleLogin("admin")}>
              Open Admin Panel
            </Button>
          </div>
          <div className="text-sm leading-6 text-muted-foreground">
            Current routing is now split cleanly:
            <br />
            <code>/ceo/*</code> for executive screens
            <br />
            <code>/project-manager/*</code> for delivery execution screens
            <br />
            <code>/team-lead/*</code> for day-to-day build execution screens
            <br />
            <code>/developer/*</code> for assigned-task and sprint execution screens
            <br />
            <code>/qa/*</code> for validation, retests, sign-off, and bug-tracker workflows
            <br />
            <code>/admin/*</code> for employee onboarding, assignments, roles, and organization structure
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
