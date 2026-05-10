"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getExamHistory, clearExamHistory } from "@/lib/exam-utils"
import type { ExamResult } from "@/lib/types"
import { History, Trash2, Trophy, Target, BookOpen, Home } from "lucide-react"
import Link from "next/link"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function HistoryPage() {
  const [history, setHistory] = useState<ExamResult[]>([])

  useEffect(() => {
    setHistory(getExamHistory())
  }, [])

  const handleClear = () => {
    clearExamHistory()
    setHistory([])
  }

  const modeLabels = {
    exam: "模拟考试",
    choice: "单选练习",
    judge: "判断练习",
  }

  const stats = {
    total: history.length,
    avgScore: history.length
      ? Math.round(history.reduce((acc, r) => acc + r.score, 0) / history.length)
      : 0,
    bestScore: history.length ? Math.max(...history.map((r) => r.score)) : 0,
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold">
              <History className="h-6 w-6" />
              练习记录
            </h1>
            <p className="text-muted-foreground">查看您的历史成绩和练习统计</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/" className="gap-2">
                <Home className="h-4 w-4" />
                返回首页
              </Link>
            </Button>
            {history.length > 0 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="gap-2">
                    <Trash2 className="h-4 w-4" />
                    清空记录
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>确认清空所有记录？</AlertDialogTitle>
                    <AlertDialogDescription>
                      此操作将删除所有练习记录，且无法恢复。
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>取消</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClear}>确认清空</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>

        {history.length > 0 && (
          <div className="mb-8 grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="flex items-center gap-4 py-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.total}</div>
                  <div className="text-sm text-muted-foreground">练习次数</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 py-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.avgScore}</div>
                  <div className="text-sm text-muted-foreground">平均分数</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 py-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                  <Trophy className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.bestScore}</div>
                  <div className="text-sm text-muted-foreground">最高分数</div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {history.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <History className="mb-4 h-12 w-12 text-muted-foreground/50" />
              <h3 className="mb-2 text-lg font-medium">暂无练习记录</h3>
              <p className="mb-6 text-muted-foreground">开始练习后，您的成绩将显示在这里</p>
              <Button asChild>
                <Link href="/">开始练习</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>历史记录</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left text-sm text-muted-foreground">
                      <th className="pb-3 font-medium">日期</th>
                      <th className="pb-3 font-medium">模式</th>
                      <th className="pb-3 font-medium">题数</th>
                      <th className="pb-3 font-medium">正确</th>
                      <th className="pb-3 font-medium">错误</th>
                      <th className="pb-3 font-medium">得分</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((record, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="py-3 text-sm">
                          {new Date(record.date).toLocaleString("zh-CN")}
                        </td>
                        <td className="py-3">
                          <span className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                            {modeLabels[record.mode]}
                          </span>
                        </td>
                        <td className="py-3">{record.totalQuestions}</td>
                        <td className="py-3 text-green-600">{record.correct}</td>
                        <td className="py-3 text-red-600">{record.wrong}</td>
                        <td className="py-3">
                          <span className={`font-bold ${record.score >= 60 ? "text-green-600" : "text-red-600"}`}>
                            {record.score}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
