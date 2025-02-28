"use client";

import { useState } from "react";
import { Calendar, ChevronDown, TrendingDown, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatCard } from "@/components/dashboard/stat-card";
import { PieChartSection } from "@/components/dashboard/pie-chart-section";

export function DashboardContent() {
  const [dateRange, setDateRange] = useState("17 April 2020 - 21 May 2020");

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Hi, Welcome back to Dr. CarWala Admin!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Orders"
          value="75"
          trend={4} 
          trendLabel="(30 days)"
          icon={
            <div className="bg-green-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          }
        />
        <StatCard
          title="Total Delivered"
          value="357"
          trend={4}
          trendLabel="(30 days)"
          icon={
            <div className="bg-green-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          }
        />
        <StatCard
          title="Total Canceled"
          value="65"
          trend={-25}
          trendLabel="(30 days)"
          icon={
            <div className="bg-red-100 p-3 rounded-full">
              <TrendingDown className="h-6 w-6 text-red-600" />
            </div>
          }
        />
        <StatCard
          title="Total Revenue"
          value="$128"
          trend={-12}
          trendLabel="(30 days)"
          icon={
            <div className="bg-red-100 p-3 rounded-full">
              <TrendingDown className="h-6 w-6 text-red-600" />
            </div>
          }
        />
      </div>

      <PieChartSection />
    </div>
  );
}
