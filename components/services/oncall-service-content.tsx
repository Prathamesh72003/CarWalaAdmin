import type { ServiceOption } from "@/components/dashboard/dashboard"

interface OncallServiceContentProps {
  service: ServiceOption
}

export function OncallServiceContent({ service }: OncallServiceContentProps) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">{service.label}</h1>
      <div className="bg-gray-100 p-8 rounded-lg flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500 text-lg">Oncall service content for {service.label} will be added here.</p>
      </div>
    </div>
  )
}

