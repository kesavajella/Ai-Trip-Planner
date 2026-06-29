"use client"

import * as React from "react"
import type { Notification } from "@/lib/types"

const STORAGE_KEY = "trip-planner-notifications"

function loadNotifications(): Notification[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveNotifications(notifications: Notification[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications))
}

interface NotificationsContextValue {
  notifications: Notification[]
  addNotification: (destination: string, days: number) => void
  clearAll: () => void
}

const NotificationsContext = React.createContext<NotificationsContextValue | undefined>(undefined)

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = React.useState<Notification[]>(loadNotifications)

  React.useEffect(() => {
    saveNotifications(notifications)
  }, [notifications])

  const addNotification = React.useCallback((destination: string, days: number) => {
    const newNotification: Notification = {
      id: crypto.randomUUID(),
      destination,
      generatedAt: new Date().toISOString(),
      days,
    }
    setNotifications((prev) => [newNotification, ...prev].slice(0, 20))
  }, [])

  const clearAll = React.useCallback(() => {
    setNotifications([])
  }, [])

  return (
    <NotificationsContext.Provider value={{ notifications, addNotification, clearAll }}>
      {children}
    </NotificationsContext.Provider>
  )
}

export function useNotifications() {
  const context = React.useContext(NotificationsContext)
  if (!context) {
    return {
      notifications: [],
      addNotification: () => {},
      clearAll: () => {},
    }
  }
  return context
}
