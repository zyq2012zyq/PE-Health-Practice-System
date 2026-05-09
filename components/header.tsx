"use client"

import { Moon, Sun } from "lucide-react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="体育与健康知识在线练习"
            width={36}
            height={36}
            className="h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-border"
            priority
          />
          <span className="text-lg font-semibold">体育健康知识练习</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">切换主题</span>
        </Button>
      </div>
    </header>
  )
}
