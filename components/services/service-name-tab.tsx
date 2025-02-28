"use client";
import type { ServiceOption } from "@/components/dashboard/dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ServiceTable } from "@/components/services/service-table";
import {
  mockOngoingServices,
  mockCompletedServices,
} from "@/data/mock-services";

interface ServiceNameTabProps {
  service: ServiceOption;
}

export function ServiceNameTab({}: ServiceNameTabProps) {
  return (
    <Tabs defaultValue="ongoing" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger
          value="ongoing"
          data-tab-name="ongoing"
          className="px-4 cursor-pointer"
        >
          Ongoing Services
          <div className="pl-5">
            <span className="flex h-3 w-3 ">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          </div>
        </TabsTrigger>

        <TabsTrigger
          value="completed"
          data-tab-name="completed"
          className="px-4 cursor-pointer"
        >
          Completed Services
          <div className="pl-5">
            <span className="flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
            </span>
          </div>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="ongoing" className="mt-0">
        <ServiceTable data={mockOngoingServices} isOngoing={true} />
      </TabsContent>

      <TabsContent value="completed" className="mt-0">
        <ServiceTable data={mockCompletedServices} isOngoing={false} />
      </TabsContent>
    </Tabs>
  );
}
