
import { create } from 'zustand';
import { persist, type PersistStorage, type StorageValue } from 'zustand/middleware';

export interface Appointment {
  id: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorImage: string;
  hospital: string;
  date: Date;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  reason?: string;
}

// Default mock appointments
const defaultAppointments: Appointment[] = [
  {
    id: '1',
    doctorName: 'Dr. Sarah Johnson',
    doctorSpecialty: 'Cardiologist',
    doctorImage: 'https://randomuser.me/api/portraits/women/45.jpg',
    hospital: 'City Medical Center',
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    time: '10:00 AM',
    status: 'upcoming'
  },
  {
    id: '2',
    doctorName: 'Dr. Michael Chen',
    doctorSpecialty: 'Orthopedic Surgeon',
    doctorImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    hospital: 'General Hospital',
    date: new Date(new Date().setDate(new Date().getDate() - 5)),
    time: '2:30 PM',
    status: 'completed'
  },
  {
    id: '3',
    doctorName: 'Dr. Emily Patel',
    doctorSpecialty: 'Dermatologist',
    doctorImage: 'https://randomuser.me/api/portraits/women/37.jpg',
    hospital: 'Skin & Care Clinic',
    date: new Date(new Date().setDate(new Date().getDate() - 12)),
    time: '1:00 PM',
    status: 'cancelled'
  }
];

interface AppointmentState {
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  cancelAppointment: (id: string) => void;
}

// Custom storage with date handling that correctly implements PersistStorage interface
const customStorage: PersistStorage<AppointmentState> = {
  getItem: (name): StorageValue<AppointmentState> | null => {
    const str = localStorage.getItem(name);
    if (!str) return null;
    
    const parsed = JSON.parse(str);
    if (parsed.state?.appointments) {
      parsed.state.appointments = parsed.state.appointments.map((apt: any) => ({
        ...apt,
        date: new Date(apt.date)
      }));
    }
    return parsed;
  },
  setItem: (name, value): void => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name): void => {
    localStorage.removeItem(name);
  }
};

export const useAppointmentStore = create<AppointmentState>()(
  persist(
    (set) => ({
      appointments: defaultAppointments,
      
      addAppointment: (newAppointment) => set((state) => {
        const id = String(Date.now());
        return {
          appointments: [
            { id, ...newAppointment },
            ...state.appointments
          ]
        };
      }),
      
      cancelAppointment: (id) => set((state) => ({
        appointments: state.appointments.map(appointment => 
          appointment.id === id 
            ? { ...appointment, status: 'cancelled' as const } 
            : appointment
        )
      })),
    }),
    {
      name: 'appointments-storage',
      storage: customStorage
    }
  )
);
