"use client"

import { useState } from "react"
import type { ServiceOption } from "@/components/dashboard/dashboard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ServiceNameTab } from "@/components/services/service-name-tab"
import TimeSlotsTab from "./time-slots-tab"
import { Button } from "@/components/ui/button"
import { Calendar, Plus } from "lucide-react"
import { TimeSlot, TimeSlotDialog } from "./add-time-slot-dialog"

interface SlotServiceContentProps {
  service: ServiceOption
}

export function SlotServiceContent({ service }: SlotServiceContentProps) {
  const [dateRange, setDateRange] = useState("17 April 2020 - 21 May 2020")
  const [activeTab, setActiveTab] = useState("service-name")

  const handleSaveNewSlot = (date: Date, timeSlots: TimeSlot[]) => {
    console.log("Adding new slots for date:", date)
    console.log("Time slots:", timeSlots)
    // Here you would typically save the data to your backend
  }

  return (
    <div className="p-6 space-y-6">

      <Tabs defaultValue="service-name" className="w-full" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-6">
          <TabsList className="bg-gray-200">
            <TabsTrigger
              value="service-name"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-6 py-2 cursor-pointer"
            >
              {service.label}
            </TabsTrigger>
            <TabsTrigger
              value="time-slots"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-6 py-2 cursor-pointer"
            >
              Time Slots
            </TabsTrigger>
          </TabsList>

          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Filter Periode</span>
            <span className="text-xs text-gray-500">{dateRange}</span>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Button>
        </div>

        {/* Add New Time Slot button - only visible in time-slots tab */}
        {activeTab === "time-slots" && (
          <TimeSlotDialog mode="add" onSave={handleSaveNewSlot} />
        )}

        <TabsContent value="service-name" className="mt-0">
          <ServiceNameTab service={service} />
        </TabsContent>

        <TabsContent value="time-slots" className="mt-0">
          <TimeSlotsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}

