"use client"

import type React from "react"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { DashboardContent } from "@/components/dashboard/dashboard-content"
import { MonthlyReports } from "@/components/dashboard/monthly-reports"
import { OncallServiceContent } from "@/components/services/oncall-service-content"
import { SlotServiceContent } from "@/components/services/slot-service-content"

export type NavItem = {
  id: string
  label: string
  icon?: React.ReactNode
  children?: NavItem[]
}

export type ServiceType = "oncall" | "slot" | null
export type ServiceOption = {
  id: string
  label: string
  type: ServiceType
}

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("dashboard")
  const [activeService, setActiveService] = useState<ServiceOption | null>(null)

  const handleNavChange = (navId: string) => {
    setActiveNav(navId)
    setActiveService(null)
  }

  const handleServiceSelect = (service: ServiceOption) => {
    setActiveService(service)
    if (service.type === "oncall") {
      setActiveNav("oncall-services")
    } else if (service.type === "slot") {
      setActiveNav("slot-services")
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        activeNav={activeNav}
        onNavChange={handleNavChange}
        activeService={activeService}
        onServiceSelect={handleServiceSelect}
      />
      <div className="flex-1 overflow-auto">
        {activeNav === "dashboard" && <DashboardContent />}
        {activeNav === "monthly-reports" && <MonthlyReports />}
        {activeNav === "oncall-services" && activeService && <OncallServiceContent service={activeService} />}
        {activeNav === "slot-services" && activeService && <SlotServiceContent service={activeService} />}
      </div>
    </div>
  )
}

