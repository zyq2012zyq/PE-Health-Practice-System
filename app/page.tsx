'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Clock, 
  FileText, 
  CheckCircle, 
  BookOpen, 
  Sun, 
  Moon, 
  ArrowRight, 
  Target,
  Award,
  Sparkles,
  Trophy,
  Heart,
  Zap
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function HomePage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <main className="min-h-screen bg-background">
      {/* 导航栏 */}
      <nav className="sticky top-0 z-50 border-b border-border/50 glass">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg group-hover:blur-xl transition-all" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
            </div>
            <span className="font-bold text-lg text-foreground">体育健康知识</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/history">
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                练习记录
              </Button>
            </Link>
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                后台管理
              </Button>
            </Link>
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="切换主题"
                className="rounded-full"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero 区域：仅用横向裁剪，避免 background-clip 文字与 overflow-hidden 叠加产生整块遮挡 */}
      <section className="relative isolate overflow-x-hidden">
        {/* 装饰背景 */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              <span>北京市初中学业水平考试</span>
            </div>
            <h1 className="mb-6 flex flex-col items-center gap-3 text-balance text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              <span className="text-center">体育与健康知识</span>
              {/* 勿对渐变字使用 block/full-width，否则背景渐变会变成整条色块 */}
              <span className="text-gradient text-center">在线练习系统</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty mb-10">
              轻松掌握健康教育、体育文化、体育精神等知识要点，
              助你从容应对考试挑战
            </p>
            
            {/* 开始考试按钮 */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/exam">
                <Button size="lg" className="h-14 px-8 text-lg font-semibold shadow-lg hover:shadow-xl transition-all rounded-full group">
                  开始模拟考试
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/history">
                <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-medium rounded-full">
                  查看练习记录
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 考试信息卡片 */}
      <section className="py-16 bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">考试规则</h2>
            <p className="text-muted-foreground">了解考试要求，做好充分准备</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* 考试时间 */}
            <Card className="border-0 shadow-soft card-hover bg-card">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="relative mx-auto mb-6">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
                  <div className="relative w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">考试时间</h3>
                <p className="text-4xl font-bold text-primary mb-2">30 分钟</p>
                <p className="text-sm text-muted-foreground">倒计时结束自动交卷</p>
              </CardContent>
            </Card>

            {/* 题目数量 */}
            <Card className="border-0 shadow-soft card-hover bg-card">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="relative mx-auto mb-6">
                  <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl" />
                  <div className="relative w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
                    <FileText className="h-8 w-8 text-accent" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">题目数量</h3>
                <p className="text-4xl font-bold text-accent mb-2">20 题</p>
                <p className="text-sm text-muted-foreground">随机抽取不重复</p>
              </CardContent>
            </Card>

            {/* 满分 */}
            <Card className="border-0 shadow-soft card-hover bg-card">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="relative mx-auto mb-6">
                  <div className="absolute inset-0 bg-success/20 rounded-full blur-xl" />
                  <div className="relative w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-success/20 to-success/10 flex items-center justify-center">
                    <Trophy className="h-8 w-8 text-success" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">满分</h3>
                <p className="text-4xl font-bold text-success mb-2">100 分</p>
                <p className="text-sm text-muted-foreground">每题 5 分</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 题型说明 */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">题型介绍</h2>
            <p className="text-muted-foreground">熟悉题型，提高答题效率</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border border-border/50 shadow-soft overflow-hidden group hover:border-primary/30 transition-colors">
              <div className="h-1.5 bg-gradient-to-r from-primary to-primary/60" />
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">单项选择题</CardTitle>
                    <CardDescription>共 10 道题目</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">A</span>
                    <span>每题包含 A/B/C 三个选项</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">1</span>
                    <span>选择唯一正确答案</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-border/50 shadow-soft overflow-hidden group hover:border-accent/30 transition-colors">
              <div className="h-1.5 bg-gradient-to-r from-accent to-accent/60" />
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <Target className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">判断题</CardTitle>
                    <CardDescription>共 10 道题目</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-xs font-medium text-accent">T</span>
                    <span>判断描述是否正确</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-xs font-medium text-accent">F</span>
                    <span>{"选择\"正确\"或\"错误\""}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 知识分类 */}
      <section className="py-16 bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">知识内容分类</h2>
            <p className="text-muted-foreground">全面覆盖考试知识点</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-soft card-hover">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500/20 to-rose-500/10 mb-4">
                <Heart className="h-6 w-6 text-rose-500" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">健康教育</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                运动损伤预防与处理、传染病预防、安全知识、健康生活方式等
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-soft card-hover">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/10 mb-4">
                <Award className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">体育文化</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                田径、球类运动规则、中华传统体育、观赛礼仪等
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-soft card-hover">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-500/10 mb-4">
                <Zap className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">体育精神</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                奥林匹克精神、公平竞争、团队合作、体育道德等
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="border-t border-border/50 bg-card/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>体育与健康知识在线练习系统</span>
            </div>
            <p className="text-sm text-muted-foreground">
              北京市初中学业水平考试模拟
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
