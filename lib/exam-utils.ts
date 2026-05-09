import type { Question, ExamResult, ScoreResult } from "./types"

// Fisher-Yates 洗牌算法
function shuffle<T>(array: T[]): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/** 模拟考试：10 道单选 + 10 道判断，顺序为先全部单选再全部判断（与正式试卷结构一致） */
export const EXAM_CHOICE_COUNT = 10
export const EXAM_JUDGE_COUNT = 10

/** 模拟考试时长 */
export const EXAM_DURATION_MINUTES = 10
export const EXAM_DURATION_SECONDS = EXAM_DURATION_MINUTES * 60
/** 剩余时间不多于此秒数时，倒计时高亮提示（约占总时长 1/5） */
export const EXAM_TIME_CRITICAL_SECONDS = Math.floor(EXAM_DURATION_SECONDS / 5)

export function generateExam(
  choiceQuestions: Question[],
  judgeQuestions: Question[]
): Question[] {
  const selectedChoice = shuffle(choiceQuestions).slice(0, EXAM_CHOICE_COUNT)
  const selectedJudge = shuffle(judgeQuestions).slice(0, EXAM_JUDGE_COUNT)
  return [...selectedChoice, ...selectedJudge]
}

// 计算得分
export function calculateScore(
  questions: Question[],
  answers: Record<number, string>
): ScoreResult {
  let correct = 0
  let wrong = 0
  let unanswered = 0

  questions.forEach((q) => {
    const userAnswer = answers[q.id]
    if (!userAnswer) {
      unanswered++
    } else if (userAnswer === q.answer) {
      correct++
    } else {
      wrong++
    }
  })

  // 每题分值：100分 / 题目总数
  const scorePerQuestion = 100 / questions.length
  const score = Math.round(correct * scorePerQuestion)

  return { score, correct, wrong, unanswered }
}

// 保存考试结果到 localStorage
export function saveExamResult(result: ExamResult): void {
  try {
    const history = getExamHistory()
    history.unshift(result)
    // 最多保存50条记录
    if (history.length > 50) {
      history.pop()
    }
    localStorage.setItem("exam_history", JSON.stringify(history))
  } catch (e) {
    console.error("Failed to save exam result:", e)
  }
}

// 获取考试历史
export function getExamHistory(): ExamResult[] {
  try {
    const data = localStorage.getItem("exam_history")
    return data ? JSON.parse(data) : []
  } catch (e) {
    console.error("Failed to get exam history:", e)
    return []
  }
}

// 清空考试历史
export function clearExamHistory(): void {
  try {
    localStorage.removeItem("exam_history")
  } catch (e) {
    console.error("Failed to clear exam history:", e)
  }
}

// 格式化时间显示
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
}

// 获取成绩评价
export function getScoreLevel(score: number): {
  level: string
  color: string
  message: string
} {
  if (score >= 90) {
    return {
      level: "优秀",
      color: "text-green-600",
      message: "太棒了！你对体育与健康知识掌握得非常好！",
    }
  } else if (score >= 60) {
    return {
      level: "及格",
      color: "text-primary",
      message: "不错！继续努力，争取更好的成绩！",
    }
  } else {
    return {
      level: "继续努力",
      color: "text-red-600",
      message: "别灰心！多加练习，相信你一定能进步！",
    }
  }
}
