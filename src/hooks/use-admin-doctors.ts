import { useState } from 'react';
import { Doctor, DoctorSchedule, TimeSlot, Appointment } from '@/types/doctor';
import { useAdmin } from '@/context/AdminContext';

// Sample data for doctors with updated names
const initialDoctors: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Rajesh Sharma',
    specialty: 'Cardiologist',
    imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    hospital: 'Care Connect Hospital',
    distance: '2.5 km',
    availableToday: true,
    rating: 4.8,
    status: 'active',
    email: 'rajesh.sharma@careconnect.com',
    phone: '+91 98765 43210',
    bio: 'Experienced cardiologist with over 10 years of practice.'
  },
  {
    id: 'd2',
    name: 'Dr. Priya Singh',
    specialty: 'Dermatologist',
    imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    hospital: 'City Medical Center',
    distance: '3.8 km',
    availableToday: false,
    nextAvailable: 'Tomorrow',
    rating: 4.6,
    status: 'active',
    email: 'priya.singh@careconnect.com',
    phone: '+91 87654 32109',
    bio: 'Specialist in skin conditions and cosmetic dermatology.'
  },
  {
    id: 'd3',
    name: 'Dr. Anil Kumar',
    specialty: 'Orthopedic',
    imageUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
    hospital: 'Health First Hospital',
    distance: '1.2 km',
    availableToday: true,
    rating: 4.9,
    status: 'inactive',
    email: 'anil.kumar@careconnect.com',
    phone: '+91 76543 21098',
    bio: 'Specialized in joint replacements and sports injuries.'
  },
  {
    id: 'd4',
    name: 'Dr. Neha Verma',
    specialty: 'Pediatrician',
    imageUrl: 'https://randomuser.me/api/portraits/women/33.jpg',
    hospital: 'Children Medical Center',
    distance: '2.1 km',
    availableToday: true,
    rating: 4.7,
    status: 'active',
    email: 'neha.verma@careconnect.com',
    phone: '+91 98765 43211',
    bio: 'Specialized in child healthcare and development.'
  },
  {
    id: 'd5',
    name: 'Dr. Suresh Reddy',
    specialty: 'Neurologist',
    imageUrl: 'https://randomuser.me/api/portraits/men/55.jpg',
    hospital: 'Neuro Care Hospital',
    distance: '4.2 km',
    availableToday: false,
    nextAvailable: 'Tomorrow',
    rating: 4.8,
    status: 'active',
    email: 'suresh.reddy@careconnect.com',
    phone: '+91 98765 43212',
    bio: 'Expert in neurological disorders and brain surgery.'
  }
];

// Generate time slots for a day
const generateTimeSlots = (date: string, doctorId: string): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  // Generate slots from 9 AM to 5 PM, 30 min each
  for (let i = 9; i < 17; i++) {
    for (let j = 0; j < 60; j += 30) {
      const startHour = i.toString().padStart(2, '0');
      const startMinute = j.toString().padStart(2, '0');
      const endHour = j === 30 ? i.toString().padStart(2, '0') : (i + 1).toString().padStart(2, '0');
      const endMinute = j === 30 ? '00' : '30';

      slots.push({
        id: `slot-${doctorId}-${date}-${startHour}${startMinute}`,
        startTime: `${startHour}:${startMinute}`,
        endTime: `${endHour}:${endMinute}`,
        isBooked: Math.random() > 0.7 // Randomly mark some slots as booked
      });
    }
  }
  return slots;
};

// Generate sample schedules for each doctor
const generateInitialSchedules = (): DoctorSchedule[] => {
  const schedules: DoctorSchedule[] = [];
  const today = new Date();

  initialDoctors.forEach(doctor => {
    // Generate schedules for next 7 days
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];

      schedules.push({
        id: `schedule-${doctor.id}-${dateStr}`,
        doctorId: doctor.id,
        date: dateStr,
        slots: generateTimeSlots(dateStr, doctor.id)
      });
    }
  });

  return schedules;
};

// Generate sample appointments
const generateInitialAppointments = (schedules: DoctorSchedule[]): Appointment[] => {
  const appointments: Appointment[] = [];
  const patientNames = ['Vikram Sharma', 'Neha Gupta', 'Rohan Verma', 'Ananya Patel', 'Kiran Reddy'];

  schedules.forEach(schedule => {
    schedule.slots.forEach(slot => {
      if (slot.isBooked) {
        appointments.push({
          id: `appointment-${slot.id}`,
          doctorId: schedule.doctorId,
          patientId: `patient-${Math.floor(Math.random() * 100)}`,
          patientName: patientNames[Math.floor(Math.random() * patientNames.length)],
          date: schedule.date,
          slotId: slot.id,
          startTime: slot.startTime,
          endTime: slot.endTime,
          status: Math.random() > 0.2 ? 'scheduled' : (Math.random() > 0.5 ? 'completed' : 'cancelled'),
          createdAt: new Date(Date.now() - Math.floor(Math.random() * 10 * 24 * 60 * 60 * 1000)).toISOString()
        });
      }
    });
  });

  return appointments;
};

export const useAdminDoctors = () => {
  const initialSchedules = generateInitialSchedules();
  const initialAppointments = generateInitialAppointments(initialSchedules);

  const { setSystemStatus } = useAdmin();
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [schedules, setSchedules] = useState<DoctorSchedule[]>(initialSchedules);
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [isLoading, setIsLoading] = useState(false);

  const addDoctor = (doctor: Omit<Doctor, 'id'>) => {
    setIsLoading(true);
    setSystemStatus('syncing');
    
    // Simulate API delay
    setTimeout(() => {
      const newId = `d${doctors.length + 1}`;
      const newDoctor: Doctor = {
        ...doctor,
        id: newId,
      };
      
      setDoctors([...doctors, newDoctor]);
      
      // Create initial schedules for the new doctor
      const today = new Date();
      const newSchedules = [];
      
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(today.getDate() + i);
        const dateStr = date.toISOString().split('T')[0];

        newSchedules.push({
          id: `schedule-${newId}-${dateStr}`,
          doctorId: newId,
          date: dateStr,
          slots: generateTimeSlots(dateStr, newId)
        });
      }
      
      setSchedules([...schedules, ...newSchedules]);
      setIsLoading(false);
      setSystemStatus('online');
    }, 1000);
  };

  const updateDoctorStatus = (doctorId: string, status: 'active' | 'inactive') => {
    setIsLoading(true);
    setSystemStatus('syncing');
    
    setTimeout(() => {
      const updatedDoctors = doctors.map(doctor => 
        doctor.id === doctorId ? { ...doctor, status } : doctor
      );
      setDoctors(updatedDoctors);
      setIsLoading(false);
      setSystemStatus('online');
    }, 1000);
  };

  const updateDoctorSchedule = (doctorId: string, date: string, updatedSlots: TimeSlot[]) => {
    setIsLoading(true);
    setSystemStatus('syncing');
    
    setTimeout(() => {
      const updatedSchedules = schedules.map(schedule => {
        if (schedule.doctorId === doctorId && schedule.date === date) {
          return { ...schedule, slots: updatedSlots };
        }
        return schedule;
      });
      
      setSchedules(updatedSchedules);
      setIsLoading(false);
      setSystemStatus('online');
    }, 1000);
  };

  const getDoctorSchedules = (doctorId: string) => {
    return schedules.filter(schedule => schedule.doctorId === doctorId);
  };

  const getDoctorAppointments = (doctorId: string) => {
    return appointments.filter(appointment => appointment.doctorId === doctorId);
  };

  return {
    doctors,
    schedules,
    appointments,
    isLoading,
    addDoctor,
    updateDoctorStatus,
    updateDoctorSchedule,
    getDoctorSchedules,
    getDoctorAppointments
  };
};
