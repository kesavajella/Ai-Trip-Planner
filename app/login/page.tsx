"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { AuthShell } from "@/components/auth/auth-shell"

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    router.prefetch("/dashboard")
  }, [router])

  function signInWithGoogle() {
    if (loading) return
    setLoading(true)
    toast.success("Welcome back!", { description: "Taking you to your dashboard…" })
    router.replace("/dashboard")
  }

  return (
    <AuthShell
      title="Welcome back."
      subtitle="Sign in to keep planning trips you'll actually take."
      footer={
        <>
          New here?{" "}
          <Link href="/signup" className="font-medium text-foreground underline-offset-4 hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <div className="space-y-4">
        <Button
          type="button"
          size="lg"
          className="w-full rounded-full"
          disabled={loading}
          onClick={signInWithGoogle}
        >
          Continue with Google
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          By continuing you agree to our{" "}
          <Link href="#" className="underline-offset-4 hover:underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="#" className="underline-offset-4 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </AuthShell>
  )
}