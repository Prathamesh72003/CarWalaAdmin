export interface ServiceRecord {
  id: string
  invoiceId: string
  date: string
  userName: string
  phoneNumber: string
  carNumber: string
  location: string
  paidAmount: number
  assignedStaff: string | null
  timeSlot: string
  pickupDropoff: boolean
  status: "ongoing" | "completed"
}

export const mockOngoingServices: ServiceRecord[] = [
  {
    id: "1",
    invoiceId: "#AHGA68",
    date: "23/09/2022",
    userName: "Jacob Marcus",
    phoneNumber: "+1 (555) 123-4567",
    carNumber: "ABC-1234",
    location: "New York, NY",
    paidAmount: 100,
    assignedStaff: "John Doe",
    timeSlot: "10:00 AM",
    pickupDropoff: true,
    status: "ongoing",
  },
  {
    id: "2",
    invoiceId: "#AHGA69",
    date: "23/09/2022",
    userName: "Emma Johnson",
    phoneNumber: "+1 (555) 987-6543",
    carNumber: "XYZ-7890",
    location: "Los Angeles, CA",
    paidAmount: 150,
    assignedStaff: null,
    timeSlot: "2:00 PM",
    pickupDropoff: false,
    status: "ongoing",
  },
  {
    id: "3",
    invoiceId: "#AHGA70",
    date: "24/09/2022",
    userName: "Michael Brown",
    phoneNumber: "+1 (555) 456-7890",
    carNumber: "DEF-5678",
    location: "Chicago, IL",
    paidAmount: 120,
    assignedStaff: "Jane Smith",
    timeSlot: "11:30 AM",
    pickupDropoff: true,
    status: "ongoing",
  },
  {
    id: "4",
    invoiceId: "#AHGA71",
    date: "24/09/2022",
    userName: "Sophia Davis",
    phoneNumber: "+1 (555) 789-0123",
    carNumber: "GHI-9012",
    location: "Houston, TX",
    paidAmount: 85,
    assignedStaff: null,
    timeSlot: "3:30 PM",
    pickupDropoff: false,
    status: "ongoing",
  },
  {
    id: "5",
    invoiceId: "#AHGA72",
    date: "25/09/2022",
    userName: "William Wilson",
    phoneNumber: "+1 (555) 234-5678",
    carNumber: "JKL-3456",
    location: "Phoenix, AZ",
    paidAmount: 200,
    assignedStaff: "Mike Johnson",
    timeSlot: "9:00 AM",
    pickupDropoff: true,
    status: "ongoing",
  },
]

export const mockCompletedServices: ServiceRecord[] = [
  {
    id: "6",
    invoiceId: "#AHGA65",
    date: "20/09/2022",
    userName: "Olivia Martinez",
    phoneNumber: "+1 (555) 345-6789",
    carNumber: "MNO-7890",
    location: "Philadelphia, PA",
    paidAmount: 110,
    assignedStaff: "Sarah Williams",
    timeSlot: "1:00 PM",
    pickupDropoff: true,
    status: "completed",
  },
  {
    id: "7",
    invoiceId: "#AHGA66",
    date: "21/09/2022",
    userName: "James Taylor",
    phoneNumber: "+1 (555) 567-8901",
    carNumber: "PQR-1234",
    location: "San Antonio, TX",
    paidAmount: 95,
    assignedStaff: "John Doe",
    timeSlot: "4:00 PM",
    pickupDropoff: false,
    status: "completed",
  },
  {
    id: "8",
    invoiceId: "#AHGA67",
    date: "22/09/2022",
    userName: "Isabella Anderson",
    phoneNumber: "+1 (555) 678-9012",
    carNumber: "STU-5678",
    location: "San Diego, CA",
    paidAmount: 130,
    assignedStaff: "Jane Smith",
    timeSlot: "11:00 AM",
    pickupDropoff: true,
    status: "completed",
  },
]

