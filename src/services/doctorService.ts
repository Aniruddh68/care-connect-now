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
    specialty: 'Orthopedic',
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
    status: 'active',
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
  },
  {
    id: '6',
    name: 'Dr. Kavya Patel',
    specialty: 'Nephrologist',
    imageUrl: 'https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Bhopal Kidney Care Center',
    distance: '2.1 miles',
    availableToday: true,
    rating: 4.7,
    status: 'active',
    email: 'kavya.patel@careconnect.com',
    phone: '+91 98765 43213',
    bio: 'Expert in kidney diseases and dialysis management.'
  },
  {
    id: '7',
    name: 'Dr. Ravi Gupta',
    specialty: 'General Physician',
    imageUrl: 'https://img.freepik.com/free-photo/doctor-wearing-white-coat-stethoscope_144627-36728.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Bhopal General Hospital',
    distance: '1.5 miles',
    availableToday: true,
    rating: 4.5,
    status: 'active',
    email: 'ravi.gupta@careconnect.com',
    phone: '+91 98765 43214',
    bio: 'General practitioner with expertise in primary healthcare.'
  },
  {
    id: '8',
    name: 'Dr. Meera Singh',
    specialty: 'Pulmonologist',
    imageUrl: 'https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Bhopal Lung Care Institute',
    distance: '2.8 miles',
    availableToday: false,
    nextAvailable: 'Next available: Tomorrow',
    rating: 4.8,
    status: 'active',
    email: 'meera.singh@careconnect.com',
    phone: '+91 98765 43215',
    bio: 'Specialist in respiratory diseases and lung health.'
  },
  {
    id: '9',
    name: 'Dr. Amit Sharma',
    specialty: 'Gastroenterologist',
    imageUrl: 'https://img.freepik.com/free-photo/front-view-male-doctor-holding-his-head-blue-background_140725-14084.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Bhopal Digestive Care Center',
    distance: '3.2 miles',
    availableToday: true,
    rating: 4.6,
    status: 'active',
    email: 'amit.sharma@careconnect.com',
    phone: '+91 98765 43216',
    bio: 'Expert in digestive system disorders and endoscopy.'
  },
  {
    id: '10',
    name: 'Dr. Sunita Jain',
    specialty: 'Ophthalmologist',
    imageUrl: 'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Bhopal Eye Care Hospital',
    distance: '1.9 miles',
    availableToday: true,
    rating: 4.9,
    status: 'active',
    email: 'sunita.jain@careconnect.com',
    phone: '+91 98765 43217',
    bio: 'Specialist in eye diseases and vision correction.'
  },
  {
    id: '11',
    name: 'Dr. Vikram Agarwal',
    specialty: 'Endocrinologist',
    imageUrl: 'https://img.freepik.com/free-photo/doctor-wearing-white-coat-stethoscope_144627-36728.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Bhopal Diabetes & Hormone Center',
    distance: '2.5 miles',
    availableToday: false,
    nextAvailable: 'Next available: Monday',
    rating: 4.7,
    status: 'active',
    email: 'vikram.agarwal@careconnect.com',
    phone: '+91 98765 43218',
    bio: 'Expert in diabetes, thyroid, and hormonal disorders.'
  },
  {
    id: '12',
    name: 'Dr. Anjali Tiwari',
    specialty: 'Psychiatrist',
    imageUrl: 'https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Bhopal Mental Health Center',
    distance: '2.0 miles',
    availableToday: true,
    rating: 4.8,
    status: 'active',
    email: 'anjali.tiwari@careconnect.com',
    phone: '+91 98765 43219',
    bio: 'Specialist in mental health and psychological disorders.'
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
