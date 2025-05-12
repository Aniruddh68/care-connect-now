
export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  imageUrl: string;
  hospital: string;
  distance: string;
  availableToday: boolean;
  nextAvailable?: string;
  rating: number;
  status: 'active' | 'inactive';
  email: string;
  phone: string;
  bio: string;
}

export interface DoctorSchedule {
  id: string;
  doctorId: string;
  date: string;
  slots: TimeSlot[];
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  appointmentId?: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  patientName: string;
  date: string;
  slotId: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: string;
}
