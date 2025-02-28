"use client"

import * as React from "react"
import { Plus, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

export interface TimeSlot {
  time: string
  capacity: number
}

interface TimeSlotDialogProps {
  mode?: "add" | "edit"
  initialDate?: Date
  initialTimeSlots?: TimeSlot[]
  onSave: (date: Date, timeSlots: TimeSlot[]) => void
  trigger?: React.ReactNode
}

const DEFAULT_TIME_SLOTS: TimeSlot[] = [
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
]

export function TimeSlotDialog({ mode = "add", initialDate, initialTimeSlots, onSave, trigger }: TimeSlotDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(initialDate)

  // Initialize timeSlots based on mode
  const [timeSlots, setTimeSlots] = React.useState<TimeSlot[]>(() => {
    if (mode === "edit" && initialTimeSlots) {
      // Create a new array with all default slots
      const slots = [...DEFAULT_TIME_SLOTS]

      // Update capacities for slots that exist in initialTimeSlots
      initialTimeSlots.forEach((initialSlot) => {
        const index = slots.findIndex((slot) => slot.time === initialSlot.time)
        if (index !== -1) {
          slots[index].capacity = initialSlot.capacity
        }
      })

      return slots
    }
    return DEFAULT_TIME_SLOTS
  })

  // Reset form when dialog closes
  React.useEffect(() => {
    if (!open && mode === "add") {
      setDate(undefined)
      setTimeSlots(DEFAULT_TIME_SLOTS.map((slot) => ({ ...slot, capacity: 0 })))
    }
  }, [open, mode])

  const handleCapacityChange = (index: number, value: string) => {
    const numValue = Number.parseInt(value) || 0
    if (numValue < 0) return

    const updatedTimeSlots = [...timeSlots]
    updatedTimeSlots[index].capacity = numValue
    setTimeSlots(updatedTimeSlots)
  }

  const handleSave = () => {
    if (!date) return

    // Filter only slots with capacity > 0
    const selectedSlots = timeSlots.filter((slot) => slot.capacity > 0)

    // Call the onSave callback with the selected date and time slots
    onSave(date, selectedSlots)

    // Close the dialog
    setOpen(false)
  }

  const defaultTrigger =
    mode === "add" ? (
      <div className="mb-4">
        <div className="flex flex-row items-center p-3 rounded-lg bg-red-100 hover:bg-red-200 text-red-800 border border-red-200 cursor-pointer border-none">
          <Plus className="h-5 w-5 mr-2" />
          Add New Time Slot
        </div>
      </div>
    ) : (
      <Button variant="outline" size="sm" className="flex items-center gap-1">
        <Edit className="h-4 w-4" />
        Edit Slot
      </Button>
    )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>{mode === "add" ? "Add Time Slot" : "Edit Time Slot"}</DialogTitle>
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
                        type="text"
                        min="0"
                        value={slot.capacity || ""}
                        onChange={(e) => handleCapacityChange(index, e.target.value)}
                        className="w-10 h-6 p-1 text-center overflow-hidden appearance-none"
                        disabled={!date}
                      />
                    </div>
                    <span className="text-sm">{slot.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button className="mt-4 bg-pink-200 hover:bg-pink-300 text-black" onClick={handleSave} disabled={!date}>
              {mode === "add" ? "Add Slots" : "Save Changes"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

