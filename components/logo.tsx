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
    <Link href={href} className={cn("group inline-flex items-center gap-2.5", className)} aria-label="intellitrip home">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground soft-shadow transition-all duration-300 group-hover:-rotate-6 group-hover:scale-105">
        <Compass className="h-[1.25rem] w-[1.25rem]" strokeWidth={2.25} />
      </span>
      {showWordmark && (
        <span className="font-instrument text-[1.7rem] leading-none tracking-[-0.03em] font-normal">
          intellitrip<span className="text-primary">.</span>
        </span>
      )}
    </Link>
  )
}
