import Image from "next/image"
import Link from "next/link"
import { Logo } from "@/components/logo"

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
  footer: React.ReactNode
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col px-6 py-8 md:px-12">
        <Logo />

        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-12">
          <h1 className="font-serif text-4xl tracking-tight text-balance md:text-5xl">{title}</h1>
          <p className="mt-3 text-pretty text-muted-foreground">{subtitle}</p>

          <div className="mt-8">{children}</div>
        </div>

        <p className="text-center text-sm text-muted-foreground">{footer}</p>
      </div>

      <aside className="relative hidden lg:block">
        <Image
          src="/images/hero-travel.jpg"
          alt="Coastal village at golden hour"
          fill
          sizes="50vw"
          className="object-cover"
          priority
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
        <div className="absolute bottom-10 left-10 right-10 max-w-md rounded-2xl border border-white/15 bg-background/85 p-5 backdrop-blur-md">
          <p className="font-serif text-xl leading-snug">
            &ldquo;Maro planned the most thoughtful 9-day Greece trip I&apos;ve ever taken — and saved me a weekend
            of tabs.&rdquo;
          </p>
          <p className="mt-3 text-xs text-muted-foreground">— Amelia, solo traveler</p>
        </div>
        <Link
          href="/"
          className="absolute right-6 top-6 rounded-full bg-background/85 px-3 py-1.5 text-xs font-medium backdrop-blur hover:bg-background"
        >
          ← Back to home
        </Link>
      </aside>
    </div>
  )
}
