"use client"

import * as React from "react"
import { MoreHorizontal, Search, UserCheck, UserX, Trash2 } from "lucide-react"
import { Topbar } from "@/components/dashboard/topbar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { adminUsers } from "@/lib/dummy-data"
import { toast } from "sonner"

export default function AdminUsersPage() {
  const [query, setQuery] = React.useState("")
  const [users, setUsers] = React.useState(adminUsers)

  const filtered = users.filter(
    (u) => u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase()),
  )

  function suspend(id: string) {
    setUsers((arr) =>
      arr.map((u) => (u.id === id ? { ...u, status: u.status === "active" ? "suspended" : "active" } : u)),
    )
    toast.success("User status updated")
  }

  function remove(id: string) {
    setUsers((arr) => arr.filter((u) => u.id !== id))
    toast.success("User removed")
  }

  return (
    <>
      <Topbar title="Users" subtitle={`${users.length} total · manage accounts and access.`} />

      <div className="flex-1 px-4 py-8 md:px-8">
        <div className="rounded-3xl border border-border bg-card text-card-foreground">
          <div className="flex flex-wrap items-center gap-3 border-b border-border p-4 md:p-5">
            <div className="relative flex-1 md:max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or email…"
                className="rounded-full pl-9"
              />
            </div>
            <Button variant="outline" className="rounded-full bg-transparent">
              Export CSV
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead className="hidden sm:table-cell">Email</TableHead>
                  <TableHead className="hidden md:table-cell">Trips</TableHead>
                  <TableHead className="hidden md:table-cell">Joined</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {u.name
                              .split(" ")
                              .map((n) => n[0])
                              .slice(0, 2)
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium leading-tight">{u.name}</p>
                          <p className="text-xs text-muted-foreground sm:hidden">{u.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden text-sm text-muted-foreground sm:table-cell">{u.email}</TableCell>
                    <TableCell className="hidden md:table-cell">{u.trips}</TableCell>
                    <TableCell className="hidden text-sm text-muted-foreground md:table-cell">{u.joined}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          u.status === "active"
                            ? "border-primary/20 bg-primary/10 text-primary"
                            : "border-destructive/30 bg-destructive/10 text-destructive"
                        }
                      >
                        {u.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" aria-label={`Actions for ${u.name}`}>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => suspend(u.id)}>
                            {u.status === "active" ? (
                              <>
                                <UserX className="h-4 w-4" />
                                Suspend
                              </>
                            ) : (
                              <>
                                <UserCheck className="h-4 w-4" />
                                Reactivate
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => remove(u.id)} className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                            Delete user
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="py-12 text-center text-sm text-muted-foreground">
                      No users match &ldquo;{query}&rdquo;.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}
