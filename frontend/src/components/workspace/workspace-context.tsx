/* eslint-disable react-refresh/only-export-components */
import type { PropsWithChildren } from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

const STORAGE_KEY = "crm-active-workspace"

export type WorkspaceId =
  | "collab-workspace"
  | "delivery-ops"
  | "executive-reviews"

export type WorkspaceShell = {
  id: WorkspaceId
  name: string
  description: string
  status: string
  footerName: string
  footerRole: string
  footerInitials: string
  reviewBadge: string
  healthBadge: string
  notificationCount: string
  projectLinks: string[]
}

export const workspaces: WorkspaceShell[] = [
  {
    id: "collab-workspace",
    name: "Collab Workspace",
    description: "Executive shell",
    status: "Primary",
    footerName: "Raghav Khanna",
    footerRole: "CEO visibility mode",
    footerInitials: "RK",
    reviewBadge: "Week 15 review",
    healthBadge: "4 healthy releases",
    notificationCount: "12",
    projectLinks: [
      "Northstar Client Portal",
      "Atlas Commerce Refresh",
      "Meridian CRM Rollout",
    ],
  },
  {
    id: "delivery-ops",
    name: "Delivery Ops",
    description: "Operations review",
    status: "Live",
    footerName: "Kalash Pachauri",
    footerRole: "Operations command view",
    footerInitials: "NV",
    reviewBadge: "Daily ops review",
    healthBadge: "2 teams under watch",
    notificationCount: "17",
    projectLinks: [
      "Meridian Data Stabilization",
      "Atlas Checkout Hardening",
      "Northstar QA Recovery",
    ],
  },
  {
    id: "executive-reviews",
    name: "Executive Reviews",
    description: "Leadership checkpoints",
    status: "Weekly",
    footerName: "Raghav Khanna",
    footerRole: "Leadership review mode",
    footerInitials: "RK",
    reviewBadge: "Board review prep",
    healthBadge: "6 approvals waiting",
    notificationCount: "09",
    projectLinks: [
      "Northstar Stakeholder Review",
      "Atlas Release Sign-off",
      "Helix Governance Cleanup",
    ],
  },
]

type WorkspaceContextValue = {
  activeWorkspace: WorkspaceShell
  setActiveWorkspaceId: (workspaceId: WorkspaceId) => void
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null)

export function WorkspaceProvider({ children }: PropsWithChildren) {
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<WorkspaceId>(
    () => {
      if (typeof window === "undefined") {
        return workspaces[0].id
      }

      const saved = window.localStorage.getItem(STORAGE_KEY)
      return workspaces.some((workspace) => workspace.id === saved)
        ? (saved as WorkspaceId)
        : workspaces[0].id
    }
  )

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, activeWorkspaceId)
  }, [activeWorkspaceId])

  const activeWorkspace = useMemo(
    () =>
      workspaces.find((workspace) => workspace.id === activeWorkspaceId) ??
      workspaces[0],
    [activeWorkspaceId]
  )

  const value = useMemo(
    () => ({
      activeWorkspace,
      setActiveWorkspaceId,
    }),
    [activeWorkspace]
  )

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  )
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext)

  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider.")
  }

  return context
}
