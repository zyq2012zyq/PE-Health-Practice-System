/**
 * 从 data/exam-paper.md 解析单选、判断题，生成 lib/exam-paper-questions.ts
 * 运行: node scripts/parse-exam-paper.mjs
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, "..")
const mdPath = path.join(root, "data", "exam-paper.md")
const outPath = path.join(root, "lib", "exam-paper-questions.ts")

const text = fs.readFileSync(mdPath, "utf8")
const lines = text.split(/\r?\n/)

const choiceQuestions = []
const judgeQuestions = []

let mode = "choice"
let i = 0

function skipCategory(line) {
  return line.includes("【知识内容分类】") || line.startsWith("从下面各题") || line.startsWith("请判断以下")
}

while (i < lines.length) {
  let line = lines[i]
  if (line.includes("二、判断题")) {
    mode = "judge"
    i++
    continue
  }
  if (mode === "choice") {
    if (skipCategory(line) || line.trim() === "" || line.startsWith("北京市") || line.startsWith("一、")) {
      i++
      continue
    }
    const qm = line.match(/^(\d+)\\?\.\s+(.+)$/)
    if (!qm) {
      i++
      continue
    }
    const stem = qm[2].trim()
    i++
    const opts = { A: "", B: "", C: "" }
    while (i < lines.length) {
      const L = lines[i]
      const am = L.match(/^A\.\s*(.+)$/)
      const bm = L.match(/^B\.\s*(.+)$/)
      const cm = L.match(/^C\.\s*(.+)$/)
      const ans = L.match(/\*\*正确答案：\s*([ABC])\s*\*\*/)
      if (am) opts.A = am[1].trim()
      else if (bm) opts.B = bm[1].trim()
      else if (cm) opts.C = cm[1].trim()
      else if (ans) {
        const answer = ans[1]
        choiceQuestions.push({ stem, opts, answer })
        i++
        break
      }
      i++
    }
    continue
  }

  // judge
  if (skipCategory(line) || line.trim() === "") {
    i++
    continue
  }
  const jm = line.match(/^(\d+)\\?\.\s+(.+)$/)
  if (!jm) {
    i++
    continue
  }
  let statement = jm[2].trim()
  i++
  let answer = null
  while (i < lines.length) {
    const L = lines[i]
    const tm = L.match(/\*\*正确答案：\s*([√×])\s*\*\*/)
    if (tm) {
      answer = tm[1] === "√" ? "T" : "F"
      break
    }
    i++
  }
  if (answer) {
    statement = statement.replace(/（[√×]）\s*$/, "").trim()
    judgeQuestions.push({ statement, answer })
  }
  i++
}

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${")
}

let idChoice = 1
const choiceTs = choiceQuestions.map((q) => {
  const opts = [
    q.opts.A ? `{ key: "A", text: "${esc(q.opts.A)}" }` : null,
    q.opts.B ? `{ key: "B", text: "${esc(q.opts.B)}" }` : null,
    q.opts.C ? `{ key: "C", text: "${esc(q.opts.C)}" }` : null,
  ].filter(Boolean)
  const obj = `{ id: ${idChoice++}, type: "choice" as const, content: "${esc(q.stem)}", options: [${opts.join(", ")}], answer: "${q.answer}" }`
  return obj
})

let idJudge = 101
const judgeTs = judgeQuestions.map((q) => {
  return `{ id: ${idJudge++}, type: "judge" as const, content: "${esc(q.statement)}", answer: "${q.answer}" }`
})

const header = `import type { Question } from "./types"

/** 由 data/exam-paper.md 自动生成，请勿手改；更新题库请改 md 后运行 node scripts/parse-exam-paper.mjs */

export const examPaperChoiceQuestions: Question[] = [
`

const footer = `]

export const examPaperJudgeQuestions: Question[] = [
${judgeTs.join(",\n")}
]
`

fs.writeFileSync(
  outPath,
  `${header}${choiceTs.join(",\n")}${footer}`,
  "utf8"
)

console.log(
  `Wrote ${choiceQuestions.length} choice, ${judgeQuestions.length} judge -> ${path.relative(root, outPath)}`
)
