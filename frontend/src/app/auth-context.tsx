/* eslint-disable react-refresh/only-export-components */
import type { PropsWithChildren } from "react"
import { createContext, useContext, useMemo, useState } from "react"

export type UserRole =
  | "ceo"
  | "project-manager"
  | "team-lead"
  | "developer"
  | "qa"
  | "admin"

export type AuthUser = {
  id: string
  name: string
  role: UserRole
}

type AuthContextValue = {
  user: AuthUser | null
  setRole: (role: UserRole) => void
}

const STORAGE_KEY = "crm-demo-role"

const AuthContext = createContext<AuthContextValue | null>(null)

function getInitialRole(): UserRole {
  if (typeof window === "undefined") {
    return "ceo"
  }

  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (
    saved === "project-manager" ||
    saved === "team-lead" ||
    saved === "developer" ||
    saved === "qa" ||
    saved === "admin"
  ) {
    return saved
  }

  return "ceo"
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [role, setRoleState] = useState<UserRole>(getInitialRole)

  const value = useMemo<AuthContextValue>(
    () => ({
      user: {
        id: "demo-user",
        name:
          role === "ceo"
            ? "Raghav Khanna"
            : role === "project-manager"
              ? "Kalash Pachauri"
              : role === "team-lead"
                ? "Aashish Kumar"
                : role === "developer"
                  ? "Rohan Patel"
                  : role === "qa"
                    ? "Ritika Joshi"
                    : "Divyanshu Sharma",
        role,
      },
      setRole: (nextRole) => {
        setRoleState(nextRole)
        window.localStorage.setItem(STORAGE_KEY, nextRole)
      },
    }),
    [role]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.")
  }

  return context
}
