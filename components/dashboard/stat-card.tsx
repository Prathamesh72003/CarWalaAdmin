import type React from "react"
import { Card } from "@/components/ui/card"
import { TrendingDown, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string
  trend: number
  trendLabel: string
  icon: React.ReactNode
}

export function StatCard({ title, value, trend, trendLabel, icon }: StatCardProps) {
  const isPositive = trend >= 0

  return (
    <Card className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-4xl font-bold">{value}</h3>
          <p className="text-gray-500 mt-1">{title}</p>
        </div>
        {icon}
      </div>
      <div className="mt-4 flex items-center">
        <div className={cn("flex items-center text-sm", isPositive ? "text-green-600" : "text-red-600")}>
          {isPositive ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
          <span>{Math.abs(trend)}%</span>
        </div>
        <span className="text-gray-500 text-sm ml-1">{trendLabel}</span>
      </div>
    </Card>
  )
}

