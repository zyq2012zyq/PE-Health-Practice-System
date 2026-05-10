"use client"

import { useEffect } from "react"
import confetti from "canvas-confetti"

/** 答题结果评分时的彩纸特效 */
export function triggerConfetti(score: number, totalQuestions: number) {
  const percentage = score / (totalQuestions * 5)

  if (percentage === 1) {
    const colors = ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FF9F1C"]
    const left = confetti.createConfettiAccessor(document.body, { resize: true })
    const right = confetti.createConfettiAccessor(document.body, { resize: true })

    left({ particleCount: 80, spread: 100, origin: { x: 0, y: 0.6 }, colors })
    right({ particleCount: 80, spread: 100, origin: { x: 1, y: 0.6 }, colors })

    setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 120,
        origin: { x: 0.5, y: 0.5 },
        colors,
        ticks: 300,
      })
    }, 400)
  } else if (percentage >= 0.8) {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { x: 0.5, y: 1 },
      colors: ["#4ECDC4", "#45B7D1", "#96CEB4", "#FFD700"],
    })
  } else if (percentage >= 0.6) {
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { x: 0.5, y: 1 },
      colors: ["#45B7D1", "#96CEB4", "#FFD700"],
    })
  }
}

/** Konami Code: ↑↑↓↓←→←→BA */
const KONAMI = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "KeyB", "KeyA",
]

function triggerKonami() {
  const colors = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#8B00FF"]
  const defaults = { origin: { y: 0.7 }, colors }

  confetti({
    ...defaults,
    particleCount: 50,
    spread: 80,
    startVelocity: 45,
    origin: { x: 0.2, y: 0.7 },
  })
  confetti({
    ...defaults,
    particleCount: 50,
    spread: 80,
    startVelocity: 45,
    origin: { x: 0.8, y: 0.7 },
  })
  setTimeout(() => {
    confetti({
      ...defaults,
      particleCount: 80,
      spread: 100,
      startVelocity: 35,
      origin: { x: 0.5, y: 0.6 },
    })
  }, 300)
}

/** 全局彩蛋组件 */
export function EasterEgg() {
  useEffect(() => {
    let konamiIndex = 0
    let konamiTimer: ReturnType<typeof setTimeout> | null = null

    function handleKonamiKey(e: KeyboardEvent) {
      if (e.code === KONAMI[konamiIndex]) {
        konamiIndex++
        if (konamiTimer) clearTimeout(konamiTimer)
        konamiTimer = setTimeout(() => {
          konamiIndex = 0
        }, 2000)

        if (konamiIndex === KONAMI.length) {
          triggerKonami()
          konamiIndex = 0
        }
      } else {
        konamiIndex = 0
      }
    }

    window.addEventListener("keydown", handleKonamiKey)
    return () => {
      window.removeEventListener("keydown", handleKonamiKey)
      if (konamiTimer) clearTimeout(konamiTimer)
    }
  }, [])

  return null
}
