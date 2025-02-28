"use client";

import { useState } from "react";
import {
  ChevronDown,
  LayoutDashboard,
  FileBarChart,
  Phone,
  Settings,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ServiceOption } from "@/components/dashboard/dashboard";

interface SidebarProps {
  activeNav: string;
  onNavChange: (navId: string) => void;
  activeService: ServiceOption | null;
  onServiceSelect: (service: ServiceOption) => void;
}

export function Sidebar({
  activeNav,
  onNavChange,
  activeService,
  onServiceSelect,
}: SidebarProps) {
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    "oncall-services": false,
    "slot-services": false,
  });

  const toggleMenu = (menuId: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const oncallServices: ServiceOption[] = [
    { id: "car-consultation", label: "Car Consultation", type: "oncall" },
    { id: "roadside-assistance", label: "Roadside Assistance", type: "oncall" },
    { id: "valet-services", label: "Valet Services", type: "oncall" },
    { id: "rent-a-driver", label: "Rent a driver", type: "oncall" },
    { id: "car-customization", label: "Car Customization", type: "oncall" },
    { id: "car-rental", label: "Car Rental", type: "oncall" },
    { id: "finance-on-wheels", label: "Finance on wheels", type: "oncall" },
    { id: "barter-exchange", label: "Barter & Exchange", type: "oncall" },
  ];

  const slotServices: ServiceOption[] = [
    { id: "interior-cleaning", label: "Interior Cleaning", type: "slot" },
    { id: "wheel-balancing", label: "Wheel Balancing", type: "slot" },
    { id: "car-servicing", label: "Car Servicing", type: "slot" },
    { id: "car-scanning", label: "Car Scanning", type: "slot" },
  ];

  return (
    <div className="w-64 h-full bg-white border-r flex flex-col">
      <nav className="flex-1 overflow-auto py-8 px-4">
        <ul className="space-y-1">
          {/* Dashboard */}
          <li>
            <button
              onClick={() => onNavChange("dashboard")}
              className={cn(
                "flex items-center w-full px-3 py-2 rounded-md text-sm font-medium cursor-pointer",
                activeNav === "dashboard"
                  ? "bg-green-100 text-green-700"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <LayoutDashboard className="mr-2 h-5 w-5" />
              Dashboard
            </button>
          </li>

          {/* Monthly Reports */}
          <li>
            <button
              onClick={() => onNavChange("monthly-reports")}
              className={cn(
                "flex items-center w-full px-3 py-2 rounded-md text-sm font-medium cursor-pointer",
                activeNav === "monthly-reports"
                  ? "bg-green-100 text-green-700"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <FileBarChart className="mr-2 h-5 w-5" />
              Monthly Reports
            </button>
          </li>

          {/* Oncall Services */}
          <li>
            <div className="space-y-1">
              <button
                onClick={() => toggleMenu("oncall-services")}
                className={cn(
                  "flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium cursor-pointer",
                  activeNav === "oncall-services" ||
                    expandedMenus["oncall-services"]
                    ? "bg-green-100 text-green-700"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <div className="flex items-center">
                  <Phone className="mr-2 h-5 w-5" />
                  Oncall Services
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    expandedMenus["oncall-services"]
                      ? "transform rotate-180"
                      : ""
                  )}
                />
              </button>

              {expandedMenus["oncall-services"] && (
                <ul className="pl-8 space-y-1">
                  {oncallServices.map((service) => (
                    <li key={service.id}>
                      <button
                        onClick={() => onServiceSelect(service)}
                        className={cn(
                          "flex items-center w-full px-3 py-1.5 rounded-md text-sm cursor-pointer",
                          activeService?.id === service.id
                            ? "bg-green-50 text-green-700 font-medium"
                            : "text-gray-600 hover:bg-gray-50"
                        )}
                      >
                        <ChevronRight className="mr-1 h-3 w-3" />
                        {service.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>

          {/* Slot Services */}
          <li>
            <div className="space-y-1">
              <button
                onClick={() => toggleMenu("slot-services")}
                className={cn(
                  "flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium cursor-pointer",
                  activeNav === "slot-services" ||
                    expandedMenus["slot-services"]
                    ? "bg-green-100 text-green-700"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <div className="flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  Slot Services
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    expandedMenus["slot-services"] ? "transform rotate-180" : ""
                  )}
                />
              </button>

              {expandedMenus["slot-services"] && (
                <ul className="pl-8 space-y-1">
                  {slotServices.map((service) => (
                    <li key={service.id}>
                      <button
                        onClick={() => onServiceSelect(service)}
                        className={cn(
                          "flex items-center w-full px-3 py-1.5 rounded-md text-sm cursor-pointer",
                          activeService?.id === service.id
                            ? "bg-green-50 text-green-700 font-medium"
                            : "text-gray-600 hover:bg-gray-50"
                        )}
                      >
                        <ChevronRight className="mr-1 h-3 w-3" />
                        {service.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
