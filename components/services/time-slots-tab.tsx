"use client";

import { useState } from "react";
import { Edit, Trash2, User } from "lucide-react";
import { mockTimeSlots } from "@/data/mock-time-slots";
import { TimeSlotDialog, type TimeSlot as DialogTimeSlot } from "@/components/services/add-time-slot-dialog";

type TimeSlot = {
  id: string;
  time: string;
  capacity: number;
};

type DateSlots = {
  date: string;
  slots: TimeSlot[];
};

export default function TimeSlotsTab() {
  const [dateSlots, setDateSlots] = useState<DateSlots[]>(mockTimeSlots);
  const [editingDateIndex, setEditingDateIndex] = useState<number | null>(null);

  const handleDeleteSlot = (dateIndex: number, slotIndex: number) => {
    const newDateSlots = [...dateSlots];
    newDateSlots[dateIndex].slots.splice(slotIndex, 1);
    setDateSlots(newDateSlots);
  };

  const handleSaveEdit = (date: Date, timeSlots: DialogTimeSlot[], dateIndex: number) => {
    const newDateSlots = [...dateSlots];
    newDateSlots[dateIndex].date = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
    newDateSlots[dateIndex].slots = timeSlots.map((slot, index) => ({
      id: `slot-${index}`,
      time: slot.time,
      capacity: slot.capacity,
    }));
    setDateSlots(newDateSlots);
    setEditingDateIndex(null);
  };

  return (
    <div className="space-y-6 p-4">
      <div className="min-w-full">
        <div className="flex border-b-2 border-gray-300 sticky top-0 z-10 bg-white">
          <div className="w-1/4 bg-gray-100 p-4 font-semibold text-gray-700 border-r-2 border-gray-300">
            Dates
          </div>
          <div className="w-3/4 bg-gray-100 p-4 font-semibold text-gray-700">
            Time Slots
          </div>
        </div>
        {dateSlots.map((dateSlot, dateIndex) => (
          <div key={dateSlot.date} className="flex border-b-2 border-gray-300 last:border-b-0 relative">
            <div className="w-1/4 bg-blue-100 p-6 flex items-center justify-center border-r-2 border-gray-300">
              <div className="text-lg font-medium">{dateSlot.date}</div>
            </div>
            <div className="w-3/4 bg-blue-50 p-6">
              <TimeSlotDialog
                mode="edit"
                initialDate={new Date(dateSlot.date)}
                initialTimeSlots={dateSlot.slots.map((slot) => ({
                  id: slot.id,
                  time: slot.time,
                  capacity: slot.capacity,
                }))}
                onSave={(date, timeSlots) => handleSaveEdit(date, timeSlots, dateIndex)}
                trigger={
                  <button className="absolute top-2 right-2 text-orange-500 hover:text-orange-600 transition-colors">
                    <Edit className="h-6 w-6" />
                  </button>
                }
              />
              {dateSlot.slots.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500 italic">
                  No slots available for this day
                </div>
              ) : (
                <div className="flex flex-wrap gap-4">
                  {dateSlot.slots.map((slot, slotIndex) => (
                    <div key={slot.id} className="flex bg-green-200 rounded-full overflow-hidden">
                      <div className="flex items-center justify-center bg-green-300 px-3 py-2">
                        <User className="h-4 w-4 mr-1" />
                        <span>{slot.capacity}</span>
                      </div>
                      <div className="px-3 py-2">{slot.time}</div>
                      <button className="bg-red-500 text-white p-2" onClick={() => handleDeleteSlot(dateIndex, slotIndex)}>
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
  );
}