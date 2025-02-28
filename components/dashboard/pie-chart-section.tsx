"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { PieChart } from "@/components/charts/pie-chart"

export function PieChartSection() {
  const [viewMode, setViewMode] = useState<"chart" | "value">("chart")

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Pie Chart</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center">
          <PieChart percentage={81} color="#ff6b6b" bgColor="#ffeded" showValue={viewMode === "value"} />
          <p className="mt-4 text-center font-medium">Total Order</p>
        </div>

        <div className="flex flex-col items-center">
          <PieChart percentage={22} color="#00b894" bgColor="#e6f7f2" showValue={viewMode === "value"} />
          <p className="mt-4 text-center font-medium">Customer Growth</p>
        </div>

        <div className="flex flex-col items-center">
          <PieChart percentage={62} color="#3498db" bgColor="#e6f4fb" showValue={viewMode === "value"} />
          <p className="mt-4 text-center font-medium">Total Revenue</p>
        </div>
      </div>
    </Card>
  )
}

