"use client"

import { Fragment } from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Circle, CircleDot, XCircle } from "lucide-react"
import type { Question } from "@/lib/types"

interface QuestionNavProps {
  questions: Question[]
  answers: Record<number, string>
  currentIndex: number
  showResult: boolean
  onNavigate: (index: number) => void
  /** 在该题号索引之后插入分界（例如 9 表示第 10 题后与第 11 题前显示判断题分界） */
  splitAfterIndex?: number
}

export function QuestionNav({
  questions,
  answers,
  currentIndex,
  showResult,
  onNavigate,
  splitAfterIndex,
}: QuestionNavProps) {
  return (
    <Card className="sticky top-20">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">答题进度</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>
            已答: {Object.keys(answers).length} / {questions.length}
          </span>
          <span>
            {Math.round((Object.keys(answers).length / questions.length) * 100)}%
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{
              width: `${(Object.keys(answers).length / questions.length) * 100}%`,
            }}
          />
        </div>
        <div className="mt-4 grid grid-cols-5 gap-2">
          {questions.map((q, i) => {
            const isAnswered = answers[q.id] !== undefined
            const isCurrent = i === currentIndex
            const isCorrect = showResult && answers[q.id] === q.answer
            const showSplit =
              splitAfterIndex !== undefined && i === splitAfterIndex + 1
            const showChoiceSplit =
              splitAfterIndex !== undefined && i === 0

            return (
              <Fragment key={q.id}>
                {showChoiceSplit && (
                  <div className="col-span-5 flex items-center gap-2 py-1">
                    <div className="h-px flex-1 bg-border" />
                    <span className="shrink-0 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                      单选题
                    </span>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                )}
                {showSplit && (
                  <div className="col-span-5 flex items-center gap-2 py-1">
                    <div className="h-px flex-1 bg-border" />
                    <span className="shrink-0 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                      判断题
                    </span>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                )}
                <button
                  onClick={() => onNavigate(i)}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-md text-xs font-medium transition-all",
                    !showResult && !isAnswered && !isCurrent && "bg-muted text-muted-foreground hover:bg-muted/80",
                    !showResult && isAnswered && !isCurrent && "bg-primary/20 text-primary",
                    !showResult && isCurrent && "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2",
                    showResult && isCorrect && "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
                    showResult && !isCorrect && isAnswered && "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
                    showResult && !isAnswered && "bg-muted text-muted-foreground"
                  )}
                >
                  {i + 1}
                </button>
              </Fragment>
            )
          })}
        </div>
        <div className="mt-4 flex flex-wrap gap-3 border-t pt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Circle className="h-3 w-3" />
            <span>未答</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CircleDot className="h-3 w-3 text-primary" />
            <span>已答</span>
          </div>
          {showResult && (
            <>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3 w-3 text-green-500" />
                <span>正确</span>
              </div>
              <div className="flex items-center gap-1.5">
                <XCircle className="h-3 w-3 text-red-500" />
                <span>错误</span>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
