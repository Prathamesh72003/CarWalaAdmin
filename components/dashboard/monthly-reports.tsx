import CarNumberSearch from "../monthly-report/car-search";

export function MonthlyReports() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Monthly Reports</h1>
      <div className="bg-gray-100 p-8 rounded-lg flex items-center justify-center min-h-[400px]">
        <CarNumberSearch isAdmin={true} />
      </div>
    </div>
  )
}

