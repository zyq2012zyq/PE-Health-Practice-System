"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { QuestionCard } from "@/components/question-card"
import { QuestionNav } from "@/components/question-nav"
import { choiceQuestions, judgeQuestions } from "@/lib/questions"
import { generateExam, calculateScore, saveExamResult } from "@/lib/exam-utils"
import type { Question, ExamMode } from "@/lib/types"
import {
  ChevronLeft,
  ChevronRight,
  Send,
  RotateCcw,
  Home,
  Timer,
  AlertCircle,
  LogOut,
} from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ExamPageClientProps {
  mode: ExamMode
}

export default function ExamPageClient({ mode }: ExamPageClientProps) {
  const router = useRouter()
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResult, setShowResult] = useState(false)
  const [timeLeft, setTimeLeft] = useState(mode === "exam" ? 30 * 60 : 0)
  const [showSubmitDialog, setShowSubmitDialog] = useState(false)
  const [showTimeUpDialog, setShowTimeUpDialog] = useState(false)
  const [showExitDialog, setShowExitDialog] = useState(false)

  useEffect(() => {
    let examQuestions: Question[] = []
    if (mode === "exam") {
      examQuestions = generateExam(choiceQuestions, judgeQuestions)
    } else if (mode === "choice") {
      examQuestions = [...choiceQuestions].sort(() => Math.random() - 0.5)
    } else {
      examQuestions = [...judgeQuestions].sort(() => Math.random() - 0.5)
    }
    setQuestions(examQuestions)
  }, [mode])

  useEffect(() => {
    if (mode !== "exam" || showResult || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setShowTimeUpDialog(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [mode, showResult, timeLeft])

  const handleSelect = useCallback((answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentIndex].id]: answer,
    }))
  }, [questions, currentIndex])

  const handleSubmit = useCallback(() => {
    setShowResult(true)
    setShowSubmitDialog(false)
    setShowTimeUpDialog(false)

    const result = calculateScore(questions, answers)
    saveExamResult({
      mode,
      ...result,
      totalQuestions: questions.length,
      date: new Date().toISOString(),
    })
  }, [questions, answers, mode])

  const handleReset = useCallback(() => {
    let examQuestions: Question[] = []
    if (mode === "exam") {
      examQuestions = generateExam(choiceQuestions, judgeQuestions)
      setTimeLeft(30 * 60)
    } else if (mode === "choice") {
      examQuestions = [...choiceQuestions].sort(() => Math.random() - 0.5)
    } else {
      examQuestions = [...judgeQuestions].sort(() => Math.random() - 0.5)
    }
    setQuestions(examQuestions)
    setAnswers({})
    setShowResult(false)
    setCurrentIndex(0)
  }, [mode])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const currentQuestion = questions[currentIndex]
  const score = showResult ? calculateScore(questions, answers) : null

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex h-[60vh] items-center justify-center">
          <div className="text-muted-foreground">加载中...</div>
        </div>
      </div>
    )
  }

  const modeLabels = {
    exam: "模拟考试",
    choice: "单选题练习",
    judge: "判断题练习",
  }

  const exitButtonLabel = mode === "exam" ? "退出考试" : "退出练习"

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{modeLabels[mode]}</h1>
            <p className="text-muted-foreground">
              共 {questions.length} 题
              {mode === "exam" && "，限时30分钟"}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {mode === "exam" && !showResult && (
              <div className={`flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-lg ${timeLeft <= 300 ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : "bg-muted"}`}>
                <Timer className="h-5 w-5" />
                {formatTime(timeLeft)}
              </div>
            )}
            {!showResult ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => setShowExitDialog(true)}
                  className="gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  {exitButtonLabel}
                </Button>
                <Button
                  onClick={() => setShowSubmitDialog(true)}
                  className="gap-2"
                >
                  <Send className="h-4 w-4" />
                  提交答案
                </Button>
              </>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleReset} className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  重新开始
                </Button>
                <Button variant="outline" onClick={() => router.push("/")} className="gap-2">
                  <Home className="h-4 w-4" />
                  返回首页
                </Button>
              </div>
            )}
          </div>
        </div>

        {showResult && score && (
          <Card className="mb-6 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
            <CardContent className="py-6">
              <div className="grid gap-6 md:grid-cols-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">{score.score}</div>
                  <div className="text-sm text-muted-foreground">总分</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600">{score.correct}</div>
                  <div className="text-sm text-muted-foreground">正确</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-600">{score.wrong}</div>
                  <div className="text-sm text-muted-foreground">错误</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-muted-foreground">{score.unanswered}</div>
                  <div className="text-sm text-muted-foreground">未答</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          <div className="space-y-4">
            <QuestionCard
              question={currentQuestion}
              index={currentIndex}
              selectedAnswer={answers[currentQuestion.id] || null}
              onSelect={handleSelect}
              showResult={showResult}
            />

            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                disabled={currentIndex === 0}
                className="gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                上一题
              </Button>
              <span className="text-sm text-muted-foreground">
                {currentIndex + 1} / {questions.length}
              </span>
              <Button
                variant="outline"
                onClick={() => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))}
                disabled={currentIndex === questions.length - 1}
                className="gap-2"
              >
                下一题
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="hidden lg:block">
            <QuestionNav
              questions={questions}
              answers={answers}
              currentIndex={currentIndex}
              showResult={showResult}
              onNavigate={setCurrentIndex}
            />
          </div>
        </div>
      </main>

      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认提交？</AlertDialogTitle>
            <AlertDialogDescription>
              您已完成 {Object.keys(answers).length} / {questions.length} 题。
              {Object.keys(answers).length < questions.length && (
                <span className="mt-2 block text-yellow-600">
                  还有 {questions.length - Object.keys(answers).length} 题未作答！
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>继续答题</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit}>确认提交</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showTimeUpDialog} onOpenChange={setShowTimeUpDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              时间到！
            </AlertDialogTitle>
            <AlertDialogDescription>
              考试时间已结束，系统将自动提交您的答案。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleSubmit}>查看成绩</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认{exitButtonLabel}？</AlertDialogTitle>
            <AlertDialogDescription>
              {mode === "exam"
                ? "退出后本次答题进度不会保存，也不会生成成绩记录。"
                : "退出后本次答题进度不会保存。"}
              确定要返回首页吗？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>继续答题</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setShowExitDialog(false)
                router.push("/")
              }}
            >
              确认退出
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
