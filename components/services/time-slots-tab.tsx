"use client"

import { useState } from "react"
import { Edit, Trash2, User } from "lucide-react"
import { mockTimeSlots } from "@/data/mock-time-slots"
import { ScrollArea } from "@/components/ui/scroll-area"

type TimeSlot = {
  id: string
  time: string
  capacity: number
}

type DateSlots = {
  date: string
  slots: TimeSlot[]
}

export function TimeSlotsTab() {
  const [dateSlots, setDateSlots] = useState<DateSlots[]>(mockTimeSlots)

  const handleDeleteSlot = (dateIndex: number, slotIndex: number) => {
    const newDateSlots = [...dateSlots]
    newDateSlots[dateIndex].slots.splice(slotIndex, 1)
    setDateSlots(newDateSlots)
  }

  return (
    <div className="space-y-6">
        <div className="min-w-full">
          {/* Sticky Header */}
          <div className="flex border-b-2 border-gray-300 sticky top-0 z-10 bg-white">
            <div className="w-1/4 bg-gray-100 p-4 font-semibold text-gray-700 border-r-2 border-gray-300">Dates</div>
            <div className="w-3/4 bg-gray-100 p-4 font-semibold text-gray-700">Time Slots</div>
          </div>

          {/* Table Body */}
          {dateSlots.map((dateSlot, dateIndex) => (
            <div key={dateSlot.date} className="flex border-b-2 border-gray-300 last:border-b-0 relative">
              <div className="w-1/4 bg-blue-100 p-6 flex items-center justify-center border-r-2 border-gray-300">
                <div className="text-lg font-medium">{dateSlot.date}</div>
              </div>
              <div className="w-3/4 bg-blue-50 p-6">
                <button className="absolute top-2 right-2 text-orange-500 hover:text-orange-600 transition-colors">
                  <Edit className="h-6 w-6" />
                </button>
                {dateSlot.slots.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-gray-500 italic">
                    No slots available for this day
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-4">
                    {dateSlot.slots.map((slot, slotIndex) => (
                      <div
                        key={`${dateSlot.date}-${slot.id}`}
                        className="flex bg-green-200 rounded-full overflow-hidden"
                      >
                        <div className="flex items-center justify-center bg-green-300 px-3 py-2">
                          <User className="h-4 w-4 mr-1" />
                          <span>{slot.capacity}</span>
                        </div>
                        <div className="px-3 py-2">{slot.time}</div>
                        <button
                          className="bg-red-500 text-white p-2"
                          onClick={() => handleDeleteSlot(dateIndex, slotIndex)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

