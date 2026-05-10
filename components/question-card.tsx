"use client"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { CheckCircle2, XCircle } from "lucide-react"
import type { Question } from "@/lib/types"

interface QuestionCardProps {
  question: Question
  index: number
  selectedAnswer: string | null
  onSelect: (answer: string) => void
  showResult: boolean
}

export function QuestionCard({
  question,
  index,
  selectedAnswer,
  onSelect,
  showResult,
}: QuestionCardProps) {
  const isCorrect = selectedAnswer === question.answer
  const options =
    question.type === "choice"
      ? question.options || []
      : [
          { key: "T", text: "正确" },
          { key: "F", text: "错误" },
        ]

  return (
    <Card className="card-base">
      <CardHeader className="bg-muted/40 pb-3">
        <div className="flex items-start gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground shadow-sm">
            {index + 1}
          </span>
          <div className="flex-1">
            <span className="mr-2 inline-block rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {question.type === "choice" ? "单选题" : "判断题"}
            </span>
            <p className="mt-1 text-base leading-relaxed">{question.content}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid gap-2.5">
          {options.map((option) => {
            const isSelected = selectedAnswer === option.key
            const isCorrectAnswer = question.answer === option.key

            return (
              <button
                key={option.key}
                onClick={() => !showResult && onSelect(option.key)}
                disabled={showResult}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all duration-200",
                  !showResult && !isSelected && "hover:border-primary/50 hover:bg-primary/[0.04] hover:shadow-sm",
                  !showResult && isSelected && "border-primary bg-primary/8 shadow-sm option-selected",
                  showResult && isSelected && isCorrect && "border-green-500/60 bg-green-50/70 dark:bg-green-950/20",
                  showResult && isSelected && !isCorrect && "border-red-500/60 bg-red-50/70 dark:bg-red-950/20",
                  showResult && !isSelected && isCorrectAnswer && "border-green-500/50 bg-green-50/40 dark:bg-green-950/15",
                  showResult && !isSelected && !isCorrectAnswer && "opacity-40"
                )}
              >
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-sm font-bold transition-all duration-200",
                    !showResult && isSelected && "bg-primary text-primary-foreground shadow-sm scale-105",
                    !showResult && !isSelected && "border-2 border-border bg-transparent text-muted-foreground group-hover:border-primary/50 group-hover:text-primary",
                    showResult && isCorrectAnswer && "bg-green-500 text-white shadow-sm",
                    showResult && isSelected && !isCorrect && "bg-red-500 text-white shadow-sm"
                  )}
                >
                  {option.key}
                </span>
                <span className="flex-1 text-sm leading-relaxed">{option.text}</span>
                {showResult && isSelected && (
                  <span className="shrink-0">
                    {isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </span>
                )}
                {showResult && !isSelected && isCorrectAnswer && (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
                )}
              </button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
