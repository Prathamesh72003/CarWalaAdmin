"use client"
import type { ServiceOption } from "@/components/dashboard/dashboard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ServiceTable } from "@/components/services/service-table"
import { mockOngoingServices, mockCompletedServices } from "@/data/mock-services"

interface ServiceNameTabProps {
  service: ServiceOption
}

export function ServiceNameTab({ service }: ServiceNameTabProps) {
  return (
    <Tabs defaultValue="ongoing" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="ongoing" data-tab-name="ongoing" className="px-4 cursor-pointer">
          Ongoing Services
        </TabsTrigger>
        <TabsTrigger value="completed" data-tab-name="completed" className="px-4 cursor-pointer">
          Completed Services
        </TabsTrigger>
      </TabsList>

      <TabsContent value="ongoing" className="mt-0">
        <ServiceTable data={mockOngoingServices} isOngoing={true} />
      </TabsContent>

      <TabsContent value="completed" className="mt-0">
        <ServiceTable data={mockCompletedServices} isOngoing={false} />
      </TabsContent>
    </Tabs>
  )
}

