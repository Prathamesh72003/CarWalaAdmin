"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ServiceRecord } from "@/data/mock-services"
import { Check, X } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ServiceTableProps {
  data: ServiceRecord[]
  isOngoing: boolean
}

export function ServiceTable({ data, isOngoing }: ServiceTableProps) {
  const [services, setServices] = useState<ServiceRecord[]>(data)

  const handleStatusChange = (id: string) => {
    // In a real app, this would call an API to update the status
    // For now, we'll just remove it from the current list
    setServices(services.filter((service) => service.id !== id))
  }

  const handleStaffAssignment = (id: string, staffName: string) => {
    setServices(services.map((service) => (service.id === id ? { ...service, assignedStaff: staffName } : service)))
  }

  return (
    <div className="rounded-md border relative">
      {/* <ScrollArea className="h-[600px] overflow-auto"> */}
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-white border-b">
            <TableRow>
              <TableHead className="bg-white">Invoice ID</TableHead>
              <TableHead className="bg-white">Date</TableHead>
              <TableHead className="bg-white">User's Name</TableHead>
              <TableHead className="bg-white">Phone Number</TableHead>
              <TableHead className="bg-white">Car Number</TableHead>
              <TableHead className="bg-white">Location</TableHead>
              <TableHead className="bg-white">Paid Amount</TableHead>
              <TableHead className="bg-white">Assigned Staff</TableHead>
              <TableHead className="bg-white">Time Slot</TableHead>
              <TableHead className="bg-white">Pickup & Drop-off</TableHead>
              <TableHead className="bg-white">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {services.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12} className="text-center py-6 text-gray-500">
                  No {isOngoing ? "ongoing" : "completed"} services found
                </TableCell>
              </TableRow>
            ) : (
              services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium text-blue-600">{service.invoiceId}</TableCell>
                  <TableCell>{service.date}</TableCell>
                  <TableCell>{service.userName}</TableCell>
                  <TableCell>{service.phoneNumber}</TableCell>
                  <TableCell>{service.carNumber}</TableCell>
                  <TableCell>{service.location}</TableCell>
                  <TableCell>${service.paidAmount}</TableCell>
                  <TableCell>
                    {isOngoing ? (
                      <div className="flex items-center gap-2">
                        <Select
                          defaultValue={service.assignedStaff || ""}
                          onValueChange={(value) => handleStaffAssignment(service.id, value)}
                        >
                          <SelectTrigger className="w-32 cursor-pointer">
                            <SelectValue placeholder="Assign Staff">
                              {service.assignedStaff || "Assign Staff"}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem  className="cursor-pointer" value="John Doe">John Doe</SelectItem>
                            <SelectItem  className="cursor-pointer" value="Jane Smith">Jane Smith</SelectItem>
                            <SelectItem  className="cursor-pointer" value="Mike Johnson">Mike Johnson</SelectItem>
                            <SelectItem  className="cursor-pointer" value="Sarah Williams">Sarah Williams</SelectItem>
                          </SelectContent>
                        </Select>
                        {service.assignedStaff && (
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={() => {
                              // Backend update logic will go here
                              console.log("Confirming staff assignment:", service.assignedStaff)
                            }}
                          >
                            <Check className="h-4 w-4" />
                            <span className="sr-only">Confirm staff assignment</span>
                          </Button>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-700">{service.assignedStaff}</span>
                    )}
                  </TableCell>
                  <TableCell>{service.timeSlot}</TableCell>
                  <TableCell className="text-center">
                    {service.pickupDropoff ? (
                      <Check className="h-5 w-5 text-green-600 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-red-600 mx-auto" />
                    )}
                  </TableCell>
                  <TableCell>
                    {isOngoing ? (
                      <Button size="sm" onClick={() => handleStatusChange(service.id)}>
                        Complete
                      </Button>
                    ) : (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Completed</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      {/* </ScrollArea> */}
    </div>
  )
}

