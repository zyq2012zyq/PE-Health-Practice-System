'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
  Zap,
  Play,
  History
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { EXAM_DURATION_MINUTES } from '@/lib/exam-utils'
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
            <Image
              src="/logo.png"
              alt="体育与健康知识在线练习"
              width={40}
              height={40}
              className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-primary/20 shadow-lg transition-all group-hover:ring-primary/40 group-hover:scale-105"
              priority
            />
            <span className="font-bold text-lg text-foreground">体育健康知识</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/history">
              <Button variant="ghost" size="sm" className="hidden sm:flex gap-2">
                <History className="h-4 w-4" />
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

      {/* Hero 区域 */}
      <section className="relative isolate overflow-hidden">
        {/* 动态背景装饰 */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-secondary/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[150px]" />
        </div>

        {/* 网格背景 */}
        <div className="absolute inset-0 -z-10 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(to right, oklch(0.145 0.015 285) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.145 0.015 285) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* 标签 */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 animate-fade-in-up">
              <Sparkles className="h-4 w-4" />
              <span>北京市初中学业水平考试</span>
            </div>
            
            {/* 标题 */}
            <h1 className="mb-8 flex flex-col items-center gap-4 text-center text-balance sm:gap-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <span className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
                体育与健康知识
              </span>
              <span className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight gradient-text">
                在线练习系统
              </span>
            </h1>
            
            {/* 描述 */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              轻松掌握健康教育、体育文化、体育精神等知识要点，
              助你从容应对考试挑战
            </p>
            
            {/* 按钮组 */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Link href="/exam">
                <Button size="lg" className="h-14 px-10 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all rounded-full group animate-pulse-glow">
                  <Play className="mr-2 h-5 w-5" />
                  开始模拟考试
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/history">
                <Button variant="outline" size="lg" className="h-14 px-10 text-lg font-medium rounded-full backdrop-blur-sm">
                  <History className="mr-2 h-5 w-5" />
                  查看练习记录
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 考试信息卡片 */}
      <section className="py-20 bg-secondary/30 relative">
        <div className="absolute inset-0 -z-10 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(to right, oklch(0.145 0.015 285) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.145 0.015 285) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">考试规则</h2>
            <p className="text-muted-foreground text-lg">了解考试要求，做好充分准备</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* 考试时间 */}
            <Card className="border-0 shadow-xl card-hover bg-card overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent group-hover:from-primary/10 transition-all" />
              <CardContent className="pt-10 pb-10 text-center relative">
                <div className="relative mx-auto mb-8">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-all" />
                  <div className="relative w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/25 group-hover:scale-110 transition-transform">
                    <Clock className="h-10 w-10 text-primary-foreground" />
                  </div>
                </div>
                <h3 className="font-bold text-xl mb-3 text-foreground">考试时间</h3>
                <p className="text-5xl font-black text-primary mb-3">{EXAM_DURATION_MINUTES} 分钟</p>
                <p className="text-sm text-muted-foreground">倒计时结束自动交卷</p>
              </CardContent>
            </Card>

            {/* 题目数量 */}
            <Card className="border-0 shadow-xl card-hover bg-card overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-chart-2/5 to-transparent group-hover:from-chart-2/10 transition-all" />
              <CardContent className="pt-10 pb-10 text-center relative">
                <div className="relative mx-auto mb-8">
                  <div className="absolute inset-0 bg-chart-2/20 rounded-full blur-2xl group-hover:bg-chart-2/30 transition-all" />
                  <div className="relative w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-chart-2 to-chart-2/60 flex items-center justify-center shadow-lg shadow-chart-2/25 group-hover:scale-110 transition-transform">
                    <FileText className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-xl mb-3 text-foreground">题目数量</h3>
                <p className="text-5xl font-black text-chart-2 mb-3">20 题</p>
                <p className="text-sm text-muted-foreground">随机抽取不重复</p>
              </CardContent>
            </Card>

            {/* 满分 */}
            <Card className="border-0 shadow-xl card-hover bg-card overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent group-hover:from-success/10 transition-all" />
              <CardContent className="pt-10 pb-10 text-center relative">
                <div className="relative mx-auto mb-8">
                  <div className="absolute inset-0 bg-success/20 rounded-full blur-2xl group-hover:bg-success/30 transition-all" />
                  <div className="relative w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-success to-success/60 flex items-center justify-center shadow-lg shadow-success/25 group-hover:scale-110 transition-transform">
                    <Trophy className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-xl mb-3 text-foreground">满分</h3>
                <p className="text-5xl font-black text-success mb-3">100 分</p>
                <p className="text-sm text-muted-foreground">每题 5 分</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 题型说明 */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">题型介绍</h2>
            <p className="text-muted-foreground text-lg">熟悉题型，提高答题效率</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 选择题 */}
            <Card className="border border-border/50 shadow-lg overflow-hidden group hover:shadow-xl hover:border-primary/30 transition-all">
              <div className="h-2 bg-gradient-to-r from-primary to-primary/60" />
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:from-primary/30 group-hover:scale-110 transition-all">
                    <CheckCircle className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">单项选择题</CardTitle>
                    <CardDescription>共 10 道题目</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex items-center gap-4 p-3 rounded-xl bg-muted/50">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 text-sm font-bold text-primary">A</span>
                    <span className="text-base">每题包含 A/B/C 三个选项</span>
                  </li>
                  <li className="flex items-center gap-4 p-3 rounded-xl bg-muted/50">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 text-sm font-bold text-primary">2</span>
                    <span className="text-base">选择唯一正确答案</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* 判断题 */}
            <Card className="border border-border/50 shadow-lg overflow-hidden group hover:shadow-xl hover:border-chart-2/30 transition-all">
              <div className="h-2 bg-gradient-to-r from-chart-2 to-chart-2/60" />
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-chart-2/20 to-chart-2/10 group-hover:from-chart-2/30 group-hover:scale-110 transition-all">
                    <Target className="h-7 w-7 text-chart-2" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">判断题</CardTitle>
                    <CardDescription>共 10 道题目</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex items-center gap-4 p-3 rounded-xl bg-muted/50">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-chart-2/20 to-chart-2/10 text-sm font-bold text-chart-2">T</span>
                    <span className="text-base">判断描述是否正确</span>
                  </li>
                  <li className="flex items-center gap-4 p-3 rounded-xl bg-muted/50">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-chart-2/20 to-chart-2/10 text-sm font-bold text-chart-2">F</span>
                    <span className="text-base">{"选择\"正确\"或\"错误\""}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 知识分类 */}
      <section className="py-20 bg-secondary/30 relative">
        <div className="absolute inset-0 -z-10 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(to right, oklch(0.145 0.015 285) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.145 0.015 285) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">知识内容分类</h2>
            <p className="text-muted-foreground text-lg">全面覆盖考试知识点</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 健康教育 */}
            <div className="p-8 rounded-3xl bg-card border border-border/50 shadow-lg card-hover group">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-500/5 mb-6 group-hover:scale-110 group-hover:from-rose-500/30 transition-all shadow-lg shadow-rose-500/10">
                <Heart className="h-8 w-8 text-rose-500" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-foreground">健康教育</h3>
              <p className="text-muted-foreground leading-relaxed">
                运动损伤预防与处理、传染病预防、安全知识、健康生活方式等
              </p>
            </div>

            {/* 体育文化 */}
            <div className="p-8 rounded-3xl bg-card border border-border/50 shadow-lg card-hover group">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 mb-6 group-hover:scale-110 group-hover:from-blue-500/30 transition-all shadow-lg shadow-blue-500/10">
                <Award className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-foreground">体育文化</h3>
              <p className="text-muted-foreground leading-relaxed">
                田径、球类运动规则、中华传统体育、观赛礼仪等
              </p>
            </div>

            {/* 体育精神 */}
            <div className="p-8 rounded-3xl bg-card border border-border/50 shadow-lg card-hover group">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 mb-6 group-hover:scale-110 group-hover:from-amber-500/30 transition-all shadow-lg shadow-amber-500/10">
                <Zap className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-foreground">体育精神</h3>
              <p className="text-muted-foreground leading-relaxed">
                奥林匹克精神、公平竞争、团队合作、体育道德等
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="border-t border-border/50 bg-card/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 shrink-0" />
                体育与健康知识在线练习系统
              </span>
              <span className="text-muted-foreground/80">作者：张祐齐</span>
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
