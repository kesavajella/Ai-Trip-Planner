import type React from "react"
import { SidebarNav } from "@/components/dashboard/sidebar-nav"
import { Chatbot } from "@/components/chatbot"
import { NotificationsProvider } from "@/components/notifications-provider"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <NotificationsProvider>
      <div className="flex min-h-screen bg-background">
        <SidebarNav variant="user" />
        <div className="flex min-h-screen flex-1 flex-col">{children}</div>
        <Chatbot />
      </div>
    </NotificationsProvider>
  )
}
