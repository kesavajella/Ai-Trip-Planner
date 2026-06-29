import type React from "react"
import { SidebarNav } from "@/components/dashboard/sidebar-nav"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav variant="admin" />
      <div className="flex min-h-screen flex-1 flex-col">{children}</div>
    </div>
  )
}
