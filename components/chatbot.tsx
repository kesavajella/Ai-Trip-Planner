"use client"

import * as React from "react"
import { Sparkles, Send, X, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type Msg = { id: string; role: "user" | "ai"; text: string }

const starterReplies: Record<string, string> = {
  beach: "For a beach escape, I'd suggest Tulum, Phú Quốc, or the Algarve coast — all stunning in late spring.",
  budget: "Tell me your total budget and length, and I'll suggest 3 destinations that fit comfortably.",
  food: "Tokyo, Lisbon, and Mexico City are my top picks for food-first trips this year.",
  family: "Iceland, Costa Rica, and Slovenia are all family-friendly with great variety for kids and adults.",
}

function pickReply(input: string) {
  const lower = input.toLowerCase()
  for (const key of Object.keys(starterReplies)) {
    if (lower.includes(key)) return starterReplies[key]
  }
  return "I can suggest destinations based on your vibe, budget, or season. Try: 'beach trip in May under $2k'."
}

export function Chatbot() {
  const [open, setOpen] = React.useState(false)
  const [input, setInput] = React.useState("")
  const [messages, setMessages] = React.useState<Msg[]>([
    {
      id: "m1",
      role: "ai",
      text: "Hey! I'm your travel sidekick. Ask me anything — destinations, packing, pacing, food spots…",
    },
  ])
  const scrollRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, open])

  function handleSend(e: React.FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", text }
    setMessages((m) => [...m, userMsg])
    setInput("")
    setTimeout(() => {
      setMessages((m) => [...m, { id: crypto.randomUUID(), role: "ai", text: pickReply(text) }])
    }, 700)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close trip assistant" : "Open trip assistant"}
        className={cn(
          "fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground soft-shadow-lg transition-transform hover:scale-105",
          !open && "animate-float",
        )}
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Trip assistant chat"
          className="fixed bottom-24 right-5 z-50 flex w-[min(92vw,22rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground soft-shadow-lg animate-fade-up"
        >
          <header className="flex items-center gap-3 border-b border-border bg-gradient-to-br from-primary to-primary/80 p-4 text-primary-foreground">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-primary-foreground/15">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium leading-tight">Trip Assistant</p>
              <p className="text-xs opacity-80">Online · usually replies instantly</p>
            </div>
          </header>

          <div ref={scrollRef} className="h-72 overflow-y-auto">
            <div className="space-y-3 p-4">
              {messages.map((m) => (
                <div key={m.id} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
                      m.role === "user"
                        ? "rounded-br-sm bg-primary text-primary-foreground"
                        : "rounded-bl-sm bg-muted text-foreground",
                    )}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-border bg-background p-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a destination…"
              className="rounded-full"
              aria-label="Chat message"
            />
            <Button type="submit" size="icon" className="shrink-0 rounded-full" aria-label="Send message">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  )
}
