"use client"

import { Moon, Sun, BookOpen, Shield } from "lucide-react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b glass hover-glow">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logo.png"
            alt="体育与健康知识在线练习"
            width={36}
            height={36}
            className="h-9 w-9 shrink-0 rounded-full object-cover shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
            priority
          />
          <span className="text-lg font-semibold text-foreground transition-colors duration-200 group-hover:text-primary">
            体育健康知识练习
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/history">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:scale-110 active:scale-95 transition-all duration-200"
              title="练习记录"
            >
              <BookOpen className="h-5 w-5 transition-transform duration-200 group-hover:rotate-[-8deg]" />
            </Button>
          </Link>
          <Link href="/admin">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:scale-110 active:scale-95 transition-all duration-200"
              title="后台管理"
            >
              <Shield className="h-5 w-5" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:scale-110 active:scale-95 transition-all duration-200"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
            <span className="sr-only">切换主题</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
