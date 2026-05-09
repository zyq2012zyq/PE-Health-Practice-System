import { NextResponse } from "next/server"
import { choiceQuestions, judgeQuestions } from "@/lib/questions"
import type { Question } from "@/lib/types"

function getAllQuestions(): Question[] {
  return [...choiceQuestions, ...judgeQuestions]
}

// 获取所有题目（数据源：内置题库）
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") // choice, judge, or all
    const limit = parseInt(searchParams.get("limit") || "0")
    const random = searchParams.get("random") === "true"

    let questions: Question[] =
      type === "choice"
        ? [...choiceQuestions]
        : type === "judge"
          ? [...judgeQuestions]
          : getAllQuestions()

    if (random) {
      questions = [...questions].sort(() => Math.random() - 0.5)
    }

    if (limit > 0) {
      questions = questions.slice(0, limit)
    }

    return NextResponse.json({ success: true, data: questions })
  } catch (error) {
    console.error("Questions API error:", error)
    return NextResponse.json(
      { success: false, error: "获取题目失败" },
      { status: 500 }
    )
  }
}
