import type { ExamMode } from "./types"

/** 与 /api/results 响应一致的记录结构（进程内存储，非持久化） */
export interface StoredExamResult {
  mode: ExamMode
  score: number
  correct: number
  wrong: number
  unanswered: number
  totalQuestions: number
  date: string
}

const MAX_RESULTS = 50
const results: StoredExamResult[] = []

export function listResults(max = MAX_RESULTS): StoredExamResult[] {
  return [...results].slice(0, max)
}

export function pushResult(input: Omit<StoredExamResult, "date"> & { date?: string }): void {
  const row: StoredExamResult = {
    ...input,
    date: input.date ?? new Date().toISOString(),
  }
  results.unshift(row)
  while (results.length > MAX_RESULTS) {
    results.pop()
  }
}

export function clearResults(): void {
  results.length = 0
}
