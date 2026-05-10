// 题目类型定义

export interface Option {
  key: string
  text: string
}

export interface Question {
  id: number
  content: string
  type: "choice" | "judge"
  answer: string
  options?: Option[]
}

export type ExamMode = "exam" | "choice" | "judge"

export interface ExamResult {
  mode: ExamMode
  score: number
  correct: number
  wrong: number
  unanswered: number
  totalQuestions: number
  date: string
}

export interface ScoreResult {
  score: number
  correct: number
  wrong: number
  unanswered: number
}
