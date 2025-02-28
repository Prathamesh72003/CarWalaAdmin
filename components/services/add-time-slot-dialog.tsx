"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

interface TimeSlot {
  time: string
  capacity: number
}

export function AddTimeSlotDialog() {
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [timeSlots, setTimeSlots] = React.useState<TimeSlot[]>([
    { time: "6:00AM", capacity: 0 },
    { time: "7:00AM", capacity: 0 },
    { time: "8:00AM", capacity: 0 },
    { time: "9:00AM", capacity: 0 },
    { time: "10:00AM", capacity: 0 },
    { time: "11:00AM", capacity: 0 },
    { time: "12:00PM", capacity: 0 },
    { time: "1:00PM", capacity: 0 },
    { time: "2:00PM", capacity: 0 },
    { time: "3:00PM", capacity: 0 },
    { time: "4:00PM", capacity: 0 },
    { time: "5:00PM", capacity: 0 },
    { time: "6:00PM", capacity: 0 },
    { time: "7:00PM", capacity: 0 },
    { time: "8:00PM", capacity: 0 },
    { time: "9:00PM", capacity: 0 },
  ])

  const handleCapacityChange = (index: number, value: string) => {
    const numValue = Number.parseInt(value) || 0
    if (numValue < 0) return

    const updatedTimeSlots = [...timeSlots]
    updatedTimeSlots[index].capacity = numValue
    setTimeSlots(updatedTimeSlots)
  }

  const handleAddSlots = () => {
    if (!date) return

    // Filter only slots with capacity > 0
    const selectedSlots = timeSlots.filter((slot) => slot.capacity > 0)

    // Here you would typically save the data or pass it to a parent component
    console.log("Selected date:", format(date, "yyyy-MM-dd"))
    console.log("Selected time slots:", selectedSlots)

    // Reset the form
    setDate(undefined)
    setTimeSlots(timeSlots.map((slot) => ({ ...slot, capacity: 0 })))
  }

  return (
    <Dialog>
      <DialogTrigger>
      <div className="mb-4">
          <Button
            className="bg-red-100 hover:bg-red-200 text-red-800 border border-red-200"
            variant="ghost"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Time Slot
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Add Time Slot</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          {/* Left side - Calendar */}
          <div className="bg-emerald-100 p-6 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Calendar</h2>
            <div className="bg-white rounded-lg p-2 shadow-md">
              <CalendarComponent mode="single" selected={date} onSelect={setDate} className="border-none" />
            </div>
          </div>

          {/* Right side - Time slots */}
          <div className="bg-emerald-100 p-6 flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Select time slots</h2>

            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-3 gap-3">
                {timeSlots.map((slot, index) => (
                  <div
                    key={index}
                    className={`rounded-md p-2 flex items-center justify-between ${
                      slot.capacity > 0 ? "bg-emerald-200" : "bg-emerald-50"
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="inline-flex items-center mr-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </span>
                      <Input
                        type="number"
                        min="0"
                        value={slot.capacity || ""}
                        onChange={(e) => handleCapacityChange(index, e.target.value)}
                        className="w-10 h-6 p-1 text-center"
                        disabled={!date}
                      />
                    </div>
                    <span className="text-sm">{slot.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button className="mt-4 bg-pink-200 hover:bg-pink-300 text-black" onClick={handleAddSlots} disabled={!date}>
              Add Slots
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

