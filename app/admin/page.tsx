"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { choiceQuestions, judgeQuestions } from "@/lib/questions"
import type { Question } from "@/lib/types"
import { Search, BookOpen, CheckCircle, Home, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState<"choice" | "judge">("choice")
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const questions = activeTab === "choice" ? choiceQuestions : judgeQuestions
  const filteredQuestions = questions.filter((q) =>
    q.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold">
              <BookOpen className="h-6 w-6" />
              题库管理
            </h1>
            <p className="text-muted-foreground">
              查看和管理所有题目（共 {choiceQuestions.length + judgeQuestions.length} 题）
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/" className="gap-2">
              <Home className="h-4 w-4" />
              返回首页
            </Link>
          </Button>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <Card
            className={`cursor-pointer transition-all ${activeTab === "choice" ? "border-primary ring-2 ring-primary/20" : ""}`}
            onClick={() => setActiveTab("choice")}
          >
            <CardContent className="flex items-center gap-4 py-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{choiceQuestions.length}</div>
                <div className="text-sm text-muted-foreground">单选题</div>
              </div>
            </CardContent>
          </Card>
          <Card
            className={`cursor-pointer transition-all ${activeTab === "judge" ? "border-primary ring-2 ring-primary/20" : ""}`}
            onClick={() => setActiveTab("judge")}
          >
            <CardContent className="flex items-center gap-4 py-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{judgeQuestions.length}</div>
                <div className="text-sm text-muted-foreground">判断题</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <CardTitle>{activeTab === "choice" ? "单选题" : "判断题"}列表</CardTitle>
                <CardDescription>
                  共 {filteredQuestions.length} 题
                  {searchTerm && ` (筛选自 ${questions.length} 题)`}
                </CardDescription>
              </div>
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="搜索题目..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredQuestions.map((q, i) => (
                <div
                  key={q.id}
                  className="rounded-lg border bg-card p-4 transition-all hover:bg-muted/50"
                >
                  <div
                    className="flex cursor-pointer items-start gap-3"
                    onClick={() => toggleExpand(q.id)}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <p className="leading-relaxed">{q.content}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="shrink-0">
                      {expandedId === q.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {expandedId === q.id && (
                    <div className="mt-4 border-t pt-4">
                      {q.type === "choice" && q.options && (
                        <div className="mb-4 grid gap-2">
                          {q.options.map((opt) => (
                            <div
                              key={opt.key}
                              className={`flex items-center gap-2 rounded-md p-2 ${opt.key === q.answer ? "bg-green-100 dark:bg-green-900/30" : "bg-muted/50"}`}
                            >
                              <span
                                className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium ${opt.key === q.answer ? "bg-green-500 text-white" : "bg-muted-foreground/20"}`}
                              >
                                {opt.key}
                              </span>
                              <span className={opt.key === q.answer ? "font-medium text-green-700 dark:text-green-400" : ""}>
                                {opt.text}
                              </span>
                              {opt.key === q.answer && (
                                <span className="ml-auto text-xs text-green-600">正确答案</span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      {q.type === "judge" && (
                        <div className="mb-4 grid grid-cols-2 gap-2">
                          <div
                            className={`flex items-center gap-2 rounded-md p-2 ${q.answer === "T" ? "bg-green-100 dark:bg-green-900/30" : "bg-muted/50"}`}
                          >
                            <span
                              className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium ${q.answer === "T" ? "bg-green-500 text-white" : "bg-muted-foreground/20"}`}
                            >
                              T
                            </span>
                            <span className={q.answer === "T" ? "font-medium text-green-700 dark:text-green-400" : ""}>
                              正确
                            </span>
                          </div>
                          <div
                            className={`flex items-center gap-2 rounded-md p-2 ${q.answer === "F" ? "bg-green-100 dark:bg-green-900/30" : "bg-muted/50"}`}
                          >
                            <span
                              className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium ${q.answer === "F" ? "bg-green-500 text-white" : "bg-muted-foreground/20"}`}
                            >
                              F
                            </span>
                            <span className={q.answer === "F" ? "font-medium text-green-700 dark:text-green-400" : ""}>
                              错误
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>题目ID: {q.id}</span>
                        <span>|</span>
                        <span>类型: {q.type === "choice" ? "单选题" : "判断题"}</span>
                        <span>|</span>
                        <span>答案: {q.answer}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
