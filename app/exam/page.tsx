import ExamPageClient from "@/components/exam-page-client"

export default async function ExamPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>
}) {
  const params = await searchParams
  const mode = (params.mode as "exam" | "choice" | "judge") || "exam"
  
  return <ExamPageClient mode={mode} />
}
