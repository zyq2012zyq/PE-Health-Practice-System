import { NextResponse } from "next/server"
import { clearResults, listResults, pushResult } from "@/lib/results-store"

interface ExamResultBody {
  mode: "exam" | "choice" | "judge"
  score: number
  correct: number
  wrong: number
  unanswered: number
  totalQuestions: number
}

// 获取考试记录
export async function GET() {
  try {
    const rows = listResults(50)

    const results = rows.map((row) => ({
      mode: row.mode,
      score: row.score,
      correct: row.correct,
      wrong: row.wrong,
      unanswered: row.unanswered,
      totalQuestions: row.totalQuestions,
      date: row.date,
    }))

    return NextResponse.json({ success: true, data: results })
  } catch (error) {
    console.error("Results API error:", error)
    return NextResponse.json(
      { success: false, error: "获取记录失败" },
      { status: 500 }
    )
  }
}

// 保存考试结果
export async function POST(request: Request) {
  try {
    const body: ExamResultBody = await request.json()
    const { mode, score, correct, wrong, unanswered, totalQuestions } = body

    pushResult({
      mode,
      score,
      correct,
      wrong,
      unanswered,
      totalQuestions,
    })

    return NextResponse.json({ success: true, message: "保存成功" })
  } catch (error) {
    console.error("Results API error:", error)
    return NextResponse.json(
      { success: false, error: "保存失败" },
      { status: 500 }
    )
  }
}

// 清空考试记录
export async function DELETE() {
  try {
    clearResults()
    return NextResponse.json({ success: true, message: "清空成功" })
  } catch (error) {
    console.error("Results API error:", error)
    return NextResponse.json(
      { success: false, error: "清空失败" },
      { status: 500 }
    )
  }
}
