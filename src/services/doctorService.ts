
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

// Initial doctors data that both admin and patient sides will use
const initialDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Rajesh Sharma',
    specialty: 'Cardiologist',
    imageUrl: 'https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Bhopal Medical Center',
    distance: '1.2 miles',
    availableToday: true,
    rating: 4.8,
    status: 'active',
    email: 'rajesh.sharma@careconnect.com',
    phone: '+91 98765 43210',
    bio: 'Experienced cardiologist with over 10 years of practice.'
  },
  {
    id: '2',
    name: 'Dr. Priya Singh',
    specialty: 'Orthopedic Surgeon',
    imageUrl: 'https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'AIIMS Bhopal',
    distance: '0.8 miles',
    availableToday: true,
    rating: 4.7,
    status: 'active',
    email: 'priya.singh@careconnect.com',
    phone: '+91 87654 32109',
    bio: 'Specialist in orthopedic surgery and sports injuries.'
  },
  {
    id: '3',
    name: 'Dr. Anil Kumar',
    specialty: 'Pediatrician',
    imageUrl: 'https://img.freepik.com/free-photo/front-view-male-doctor-holding-his-head-blue-background_140725-14084.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Bhopal Children\'s Hospital',
    distance: '2.4 miles',
    availableToday: false,
    nextAvailable: 'Next available: Tomorrow',
    rating: 4.9,
    status: 'inactive',
    email: 'anil.kumar@careconnect.com',
    phone: '+91 76543 21098',
    bio: 'Specialized in child healthcare and development.'
  },
  {
    id: '4',
    name: 'Dr. Neha Verma',
    specialty: 'Neurologist',
    imageUrl: 'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Bhopal University Hospital',
    distance: '3.1 miles',
    availableToday: false,
    nextAvailable: 'Next available: Friday',
    rating: 4.6,
    status: 'active',
    email: 'neha.verma@careconnect.com',
    phone: '+91 98765 43211',
    bio: 'Expert in neurological disorders and brain surgery.'
  },
  {
    id: '5',
    name: 'Dr. Suresh Reddy',
    specialty: 'Dermatologist',
    imageUrl: 'https://img.freepik.com/free-photo/doctor-wearing-white-coat-stethoscope_144627-36728.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Bhopal Skin & Care Clinic',
    distance: '1.7 miles',
    availableToday: true,
    rating: 4.9,
    status: 'active',
    email: 'suresh.reddy@careconnect.com',
    phone: '+91 98765 43212',
    bio: 'Specialist in dermatology and cosmetic treatments.'
  }
];

interface DoctorStore {
  doctors: Doctor[];
  isLoading: boolean;
  addDoctor: (doctor: Omit<Doctor, 'id'>) => void;
  updateDoctorStatus: (doctorId: string, status: 'active' | 'inactive') => void;
  updateDoctor: (doctorId: string, updates: Partial<Doctor>) => void;
  deleteDoctor: (doctorId: string) => void;
  getDoctorById: (doctorId: string) => Doctor | undefined;
  getActiveDoctors: () => Doctor[];
  setLoading: (loading: boolean) => void;
}

export const useDoctorStore = create<DoctorStore>()(
  persist(
    (set, get) => ({
      doctors: initialDoctors,
      isLoading: false,

      addDoctor: (doctorData) => {
        set((state) => {
          const newId = `d${state.doctors.length + 1}`;
          const newDoctor: Doctor = {
            ...doctorData,
            id: newId,
          };
          return {
            doctors: [...state.doctors, newDoctor]
          };
        });
      },

      updateDoctorStatus: (doctorId, status) => {
        set((state) => ({
          doctors: state.doctors.map(doctor =>
            doctor.id === doctorId ? { ...doctor, status } : doctor
          )
        }));
      },

      updateDoctor: (doctorId, updates) => {
        set((state) => ({
          doctors: state.doctors.map(doctor =>
            doctor.id === doctorId ? { ...doctor, ...updates } : doctor
          )
        }));
      },

      deleteDoctor: (doctorId) => {
        set((state) => ({
          doctors: state.doctors.filter(doctor => doctor.id !== doctorId)
        }));
      },

      getDoctorById: (doctorId) => {
        return get().doctors.find(doctor => doctor.id === doctorId);
      },

      getActiveDoctors: () => {
        return get().doctors.filter(doctor => doctor.status === 'active');
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      }
    }),
    {
      name: 'doctor-storage'
    }
  )
);
