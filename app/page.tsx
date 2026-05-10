'use client'

import { useState, useEffect, useRef } from 'react'
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
  const [scrollY, setScrollY] = useState(0)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])
  const ticking = useRef(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking.current = false
        })
        ticking.current = true
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    )
    
    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  const parallaxY1 = scrollY * 0.25
  const parallaxY2 = scrollY * 0.12
  const heroOpacity = Math.max(0, 1 - scrollY / 500)

  return (
    <main className="min-h-screen bg-background">
      {/* 导航栏 */}
      <nav className="sticky top-0 z-50 border-b glass hover-glow">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.png"
              alt="体育与健康知识在线练习"
              width={40}
              height={40}
              className="h-10 w-10 shrink-0 rounded-full object-cover shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl"
              priority
            />
            <span className="font-bold text-lg text-foreground transition-colors duration-200 group-hover:text-primary">
              体育健康知识
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/history">
              <Button variant="ghost" size="sm" className="hidden sm:flex gap-2 hover:bg-primary/10 hover:scale-105 active:scale-95 transition-all duration-200">
                <History className="h-4 w-4" />
                练习记录
              </Button>
            </Link>
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="hidden sm:flex hover:bg-primary/10 hover:scale-105 active:scale-95 transition-all duration-200">
                后台管理
              </Button>
            </Link>
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="切换主题"
                className="rounded-full hover:bg-primary/10 hover:scale-110 active:scale-95 transition-all duration-200"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero 区域 */}
      <section className="relative overflow-hidden min-h-[88vh] flex items-center">
        {/* 动态背景装饰 */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div 
            className="absolute -top-[100px] left-[10%] w-[600px] h-[600px] bg-primary/12 dark:bg-primary/8 rounded-full blur-[120px] gpu-accelerated dark:grid-bg"
            style={{ transform: `translate3d(0, ${parallaxY1}px, 0)` }}
          />
          <div 
            className="absolute -bottom-[200px] right-[5%] w-[700px] h-[700px] bg-secondary/20 dark:bg-accent/8 rounded-full blur-[140px] gpu-accelerated"
            style={{ transform: `translate3d(0, ${parallaxY2}px, 0)` }}
          />
          <div 
            className="absolute top-[30%] left-[60%] w-[400px] h-[400px] bg-accent/8 dark:bg-primary/5 rounded-full blur-[100px] gpu-accelerated"
            style={{ transform: `translate3d(0, ${parallaxY1 * 0.5}px, 0)` }}
          />
          {/* 装饰性浮动圆点 */}
          <div className="absolute top-[20%] right-[15%] w-2 h-2 bg-primary/30 dark:bg-primary/50 rounded-full animate-float gpu-accelerated" />
          <div className="absolute top-[55%] left-[8%] w-3 h-3 bg-accent/25 dark:bg-accent/40 rounded-full animate-float-slow gpu-accelerated" />
          <div className="absolute bottom-[30%] right-[25%] w-1.5 h-1.5 bg-primary/40 dark:bg-primary/60 rounded-full animate-float gpu-accelerated" style={{ animationDelay: '1s' }} />
        </div>

        {/* 网格背景 */}
        <div className="absolute inset-0 -z-10 opacity-[0.015] dark:opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(to right, oklch(0.145 0.015 285) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.145 0.015 285) 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }} />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-32 w-full gpu-accelerated" style={{ opacity: heroOpacity }}>
          <div className="text-center max-w-4xl mx-auto">
            {/* 标签 */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-10 animate-fade-in-up shadow-sm">
              <Sparkles className="h-4 w-4 animate-pulse-soft" />
              <span>北京市初中学业水平考试</span>
            </div>
            
            {/* 标题 */}
            <h1 className="mb-10 flex flex-col items-center gap-5 text-center text-balance sm:gap-6 animate-fade-in-up" style={{ animationDelay: '0.08s' }}>
              <span className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
                体育与健康知识
              </span>
              <span className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight gradient-text neon-text">
                在线练习系统
              </span>
            </h1>
            
            {/* 描述 */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-14 animate-fade-in-up leading-relaxed" style={{ animationDelay: '0.16s' }}>
              轻松掌握健康教育、体育文化、体育精神等知识要点，
              助你从容应对考试挑战
            </p>
            
            {/* 按钮组 */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-in-up" style={{ animationDelay: '0.24s' }}>
              <Link href="/exam">
                <Button size="lg" className="h-14 px-12 text-lg font-semibold shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 rounded-full group animate-glow-pulse">
                  <Play className="mr-2 h-5 w-5" />
                  开始模拟考试
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/history">
                <Button variant="outline" size="lg" className="h-14 px-10 text-lg font-medium rounded-full hover:bg-primary/5 hover:border-primary/40 hover:scale-105 active:scale-95 transition-all duration-200">
                  <History className="mr-2 h-5 w-5" />
                  查看练习记录
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 考试信息卡片 */}
      <section 
        ref={(el) => (sectionRefs.current[0] = el)}
        className="py-24 bg-secondary/15 dark:bg-secondary/10 scroll-fade-in"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight">考试规则</h2>
            <p className="text-muted-foreground text-lg">了解考试要求，做好充分准备</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* 考试时间 */}
            <Card className="card-base border-0 overflow-hidden">
              <CardContent className="pt-12 pb-12 text-center">
                <div className="relative mx-auto mb-6">
                  <div className="absolute inset-0 bg-primary/10 dark:bg-primary/15 rounded-full blur-2xl" />
                  <div className="relative w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/20">
                    <Clock className="h-10 w-10 text-primary-foreground" />
                  </div>
                </div>
                <h3 className="font-bold text-xl mb-3 text-foreground">考试时间</h3>
                <p className="text-5xl font-black text-primary mb-2">{EXAM_DURATION_MINUTES} 分钟</p>
                <p className="text-sm text-muted-foreground">倒计时结束自动交卷</p>
              </CardContent>
            </Card>

            {/* 题目数量 */}
            <Card className="card-base border-0 overflow-hidden">
              <CardContent className="pt-12 pb-12 text-center">
                <div className="relative mx-auto mb-6">
                  <div className="absolute inset-0 bg-chart-2/10 dark:bg-chart-2/15 rounded-full blur-2xl" />
                  <div className="relative w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-chart-2 to-chart-2/70 flex items-center justify-center shadow-lg shadow-chart-2/20">
                    <FileText className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-xl mb-3 text-foreground">题目数量</h3>
                <p className="text-5xl font-black text-chart-2 mb-2">20 题</p>
                <p className="text-sm text-muted-foreground">随机抽取不重复</p>
              </CardContent>
            </Card>

            {/* 满分 */}
            <Card className="card-base border-0 overflow-hidden">
              <CardContent className="pt-12 pb-12 text-center">
                <div className="relative mx-auto mb-6">
                  <div className="absolute inset-0 bg-success/10 dark:bg-success/15 rounded-full blur-2xl" />
                  <div className="relative w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-success to-success/70 flex items-center justify-center shadow-lg shadow-success/20">
                    <Trophy className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-xl mb-3 text-foreground">满分</h3>
                <p className="text-5xl font-black text-success mb-2">100 分</p>
                <p className="text-sm text-muted-foreground">每题 5 分</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 题型说明 */}
      <section 
        ref={(el) => (sectionRefs.current[1] = el)}
        className="py-24 scroll-fade-in"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight">题型介绍</h2>
            <p className="text-muted-foreground text-lg">熟悉题型，提高答题效率</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 选择题 */}
            <Card className="card-base border-0 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-primary via-primary/70 to-primary/40" />
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 shadow-sm">
                    <CheckCircle className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">单项选择题</CardTitle>
                    <CardDescription>共 10 道题目</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-4 p-3.5 rounded-xl bg-muted/50 hover:bg-muted/70 transition-colors duration-200">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary shadow-sm">A</span>
                    <span className="text-base">每题包含 A/B/C 三个选项</span>
                  </li>
                  <li className="flex items-center gap-4 p-3.5 rounded-xl bg-muted/50 hover:bg-muted/70 transition-colors duration-200">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary shadow-sm">2</span>
                    <span className="text-base">选择唯一正确答案</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* 判断题 */}
            <Card className="card-base border-0 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-chart-2 via-chart-2/70 to-chart-2/40" />
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-chart-2/15 to-chart-2/5 shadow-sm">
                    <Target className="h-7 w-7 text-chart-2" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">判断题</CardTitle>
                    <CardDescription>共 10 道题目</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-4 p-3.5 rounded-xl bg-muted/50 hover:bg-muted/70 transition-colors duration-200">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-chart-2/10 text-sm font-bold text-chart-2 shadow-sm">T</span>
                    <span className="text-base">判断描述是否正确</span>
                  </li>
                  <li className="flex items-center gap-4 p-3.5 rounded-xl bg-muted/50 hover:bg-muted/70 transition-colors duration-200">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-chart-2/10 text-sm font-bold text-chart-2 shadow-sm">F</span>
                    <span className="text-base">{"选择\"正确\"或\"错误\""}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 知识分类 */}
      <section 
        ref={(el) => (sectionRefs.current[2] = el)}
        className="py-24 bg-secondary/15 dark:bg-secondary/10 scroll-fade-in"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight">知识内容分类</h2>
            <p className="text-muted-foreground text-lg">全面覆盖考试知识点</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 健康教育 */}
            <div className="card-base p-8 rounded-3xl bg-card border border-border/50">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500/12 to-rose-500/5 mb-6 shadow-sm">
                <Heart className="h-8 w-8 text-rose-500" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-foreground">健康教育</h3>
              <p className="text-muted-foreground leading-relaxed">
                运动损伤预防与处理、传染病预防、安全知识、健康生活方式等
              </p>
            </div>

            {/* 体育文化 */}
            <div className="card-base p-8 rounded-3xl bg-card border border-border/50">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/12 to-blue-500/5 mb-6 shadow-sm">
                <Award className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-foreground">体育文化</h3>
              <p className="text-muted-foreground leading-relaxed">
                田径、球类运动规则、中华传统体育、观赛礼仪等
              </p>
            </div>

            {/* 体育精神 */}
            <div className="card-base p-8 rounded-3xl bg-card border border-border/50">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500/12 to-amber-500/5 mb-6 shadow-sm">
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
      <footer className="border-t border-border/40 bg-card/50">
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
