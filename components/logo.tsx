import Link from "next/link"
import { Compass } from "lucide-react"
import { cn } from "@/lib/utils"

export function Logo({
  className,
  href = "/",
  showWordmark = true,
}: {
  className?: string
  href?: string
  showWordmark?: boolean
}) {
  return (
    <Link href={href} className={cn("group inline-flex items-center gap-2", className)} aria-label="Maro home">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground soft-shadow transition-transform group-hover:-rotate-12">
        <Compass className="h-[1.1rem] w-[1.1rem]" strokeWidth={2.25} />
      </span>
      {showWordmark && (
        <span className="font-serif text-2xl leading-none tracking-tight">
          Maro<span className="text-primary">.</span>
        </span>
      )}
    </Link>
  )
}
