"use client"

import { useEffect, useRef } from "react"

interface PieChartProps {
  percentage: number
  color: string
  bgColor: string
  size?: number
  strokeWidth?: number
  showValue?: boolean
}

export function PieChart({
  percentage,
  color,
  bgColor,
  size = 160,
  strokeWidth = 20,
  showValue = false,
}: PieChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set canvas dimensions with device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    ctx.scale(dpr, dpr)

    const centerX = size / 2
    const centerY = size / 2
    const radius = (size - strokeWidth) / 2

    // Background circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.lineWidth = strokeWidth
    ctx.strokeStyle = bgColor
    ctx.stroke()

    // Foreground circle (percentage)
    const startAngle = -0.5 * Math.PI // Start from top
    const endAngle = startAngle + (percentage / 100) * 2 * Math.PI

    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, startAngle, endAngle)
    ctx.lineWidth = strokeWidth
    ctx.strokeStyle = color
    ctx.stroke()

    // Add percentage text in the center if showValue is true
    if (showValue) {
      ctx.font = "bold 24px Inter, sans-serif"
      ctx.fillStyle = "#333"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(`${percentage}%`, centerX, centerY)
    }
  }, [percentage, color, bgColor, size, strokeWidth, showValue])

  return (
    <div className="relative inline-block">
      <canvas ref={canvasRef} width={size} height={size} />
      {!showValue && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold">{percentage}%</span>
        </div>
      )}
    </div>
  )
}

