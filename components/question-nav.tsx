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
    <Card className="card-base sticky top-20">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium">答题进度</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>
            已答: {Object.keys(answers).length} / {questions.length}
          </span>
          <span className="font-medium text-primary">
            {Math.round((Object.keys(answers).length / questions.length) * 100)}%
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500"
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
                  <div className="col-span-5 flex items-center gap-2 py-1.5">
                    <div className="h-px flex-1 bg-border/60" />
                    <span className="shrink-0 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                      选择
                    </span>
                    <div className="h-px flex-1 bg-border/60" />
                  </div>
                )}
                {showSplit && (
                  <div className="col-span-5 flex items-center gap-2 py-1.5">
                    <div className="h-px flex-1 bg-border/60" />
                    <span className="shrink-0 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                      判断
                    </span>
                    <div className="h-px flex-1 bg-border/60" />
                  </div>
                )}
                <button
                  onClick={() => onNavigate(i)}
                  className={cn(
                    "relative flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition-all duration-200",
                    !showResult && !isAnswered && !isCurrent && "bg-muted text-muted-foreground hover:bg-muted/80 hover:scale-110 active:scale-95",
                    !showResult && isAnswered && !isCurrent && "bg-primary/15 text-primary hover:bg-primary/25 hover:scale-110 active:scale-95",
                    !showResult && isCurrent && "bg-primary text-primary-foreground shadow-md shadow-primary/30 ring-2 ring-primary ring-offset-2 ring-offset-background scale-110",
                    showResult && isCorrect && "bg-green-500/15 text-green-600 dark:bg-green-500/20 dark:text-green-400",
                    showResult && !isCorrect && isAnswered && "bg-red-500/15 text-red-600 dark:bg-red-500/20 dark:text-red-400",
                    showResult && !isAnswered && "bg-muted text-muted-foreground/50"
                  )}
                >
                  {i + 1}
                  {isCurrent && (
                    <span className="absolute -inset-0.5 rounded-lg ring-2 ring-primary/40 animate-pulse-soft" />
                  )}
                </button>
              </Fragment>
            )
          })}
        </div>
        <div className="mt-4 flex flex-wrap gap-3 border-t pt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Circle className="h-3.5 w-3.5" />
            <span>未答</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CircleDot className="h-3.5 w-3.5 text-primary" />
            <span>已答</span>
          </div>
          {showResult && (
            <>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                <span>正确</span>
              </div>
              <div className="flex items-center gap-1.5">
                <XCircle className="h-3.5 w-3.5 text-red-500" />
                <span>错误</span>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
