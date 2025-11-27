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

// Comprehensive list of doctors with 5 doctors per specialty
const initialDoctors: Doctor[] = [
  // Cardiologists
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
    name: 'Dr. Priya Agarwal',
    specialty: 'Cardiologist',
    imageUrl: 'https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'AIIMS Bhopal',
    distance: '0.8 miles',
    availableToday: true,
    rating: 4.9,
    status: 'active',
    email: 'priya.agarwal@careconnect.com',
    phone: '+91 98765 43211',
    bio: 'Specialist in interventional cardiology and heart surgeries.'
  },
  {
    id: '3',
    name: 'Dr. Vikram Gupta',
    specialty: 'Cardiologist',
    imageUrl: 'https://img.freepik.com/free-photo/front-view-male-doctor-holding-his-head-blue-background_140725-14084.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Hamidia Hospital',
    distance: '2.1 miles',
    availableToday: false,
    nextAvailable: 'Tomorrow',
    rating: 4.7,
    status: 'active',
    email: 'vikram.gupta@careconnect.com',
    phone: '+91 98765 43212',
    bio: 'Expert in cardiac catheterization and angioplasty procedures.'
  },
  {
    id: '4',
    name: 'Dr. Sunita Joshi',
    specialty: 'Cardiologist',
    imageUrl: 'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Bansal Hospital',
    distance: '1.8 miles',
    availableToday: true,
    rating: 4.6,
    status: 'active',
    email: 'sunita.joshi@careconnect.com',
    phone: '+91 98765 43213',
    bio: 'Pediatric cardiologist specializing in congenital heart diseases.'
  },
  {
    id: '5',
    name: 'Dr. Arjun Malhotra',
    specialty: 'Cardiologist',
    imageUrl: 'https://img.freepik.com/free-photo/doctor-wearing-white-coat-stethoscope_144627-36728.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Chirayu Medical College',
    distance: '3.2 miles',
    availableToday: true,
    rating: 4.8,
    status: 'active',
    email: 'arjun.malhotra@careconnect.com',
    phone: '+91 98765 43214',
    bio: 'Cardiac surgeon with expertise in bypass surgeries.'
  },

  // Dermatologists
  {
    id: '6',
    name: 'Dr. Kavya Patel',
    specialty: 'Dermatologist',
    imageUrl: 'https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Bhopal Skin Care Center',
    distance: '1.5 miles',
    availableToday: true,
    rating: 4.7,
    status: 'active',
    email: 'kavya.patel@careconnect.com',
    phone: '+91 98765 43215',
    bio: 'Expert in cosmetic dermatology and laser treatments.'
  },
  {
    id: '7',
    name: 'Dr. Rohit Mehta',
    specialty: 'Dermatologist',
    imageUrl: 'https://img.freepik.com/free-photo/doctor-wearing-white-coat-stethoscope_144627-36728.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'City Medical Center',
    distance: '2.3 miles',
    availableToday: false,
    nextAvailable: 'Tomorrow',
    rating: 4.5,
    status: 'active',
    email: 'rohit.mehta@careconnect.com',
    phone: '+91 98765 43216',
    bio: 'Specialist in treating skin allergies and chronic conditions.'
  },
  {
    id: '8',
    name: 'Dr. Neha Sinha',
    specialty: 'Dermatologist',
    imageUrl: 'https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'AIIMS Bhopal',
    distance: '0.9 miles',
    availableToday: true,
    rating: 4.8,
    status: 'active',
    email: 'neha.sinha@careconnect.com',
    phone: '+91 98765 43217',
    bio: 'Dermatopathologist with expertise in skin cancer diagnosis.'
  },
  {
    id: '9',
    name: 'Dr. Amit Khanna',
    specialty: 'Dermatologist',
    imageUrl: 'https://img.freepik.com/free-photo/front-view-male-doctor-holding-his-head-blue-background_140725-14084.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Bansal Hospital',
    distance: '1.9 miles',
    availableToday: true,
    rating: 4.6,
    status: 'active',
    email: 'amit.khanna@careconnect.com',
    phone: '+91 98765 43218',
    bio: 'Pediatric dermatologist specializing in childhood skin disorders.'
  },
  {
    id: '10',
    name: 'Dr. Pooja Sharma',
    specialty: 'Dermatologist',
    imageUrl: 'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Hamidia Hospital',
    distance: '2.7 miles',
    availableToday: false,
    nextAvailable: 'Monday',
    rating: 4.9,
    status: 'active',
    email: 'pooja.sharma@careconnect.com',
    phone: '+91 98765 43219',
    bio: 'Expert in acne treatment and anti-aging procedures.'
  },

  // Orthopedic Surgeons
  {
    id: '11',
    name: 'Dr. Suresh Kumar',
    specialty: 'Orthopedic',
    imageUrl: 'https://img.freepik.com/free-photo/doctor-wearing-white-coat-stethoscope_144627-36728.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Bhopal Orthopedic Center',
    distance: '1.4 miles',
    availableToday: true,
    rating: 4.8,
    status: 'active',
    email: 'suresh.kumar@careconnect.com',
    phone: '+91 98765 43220',
    bio: 'Joint replacement specialist with 15 years experience.'
  },
  {
    id: '12',
    name: 'Dr. Ravi Tiwari',
    specialty: 'Orthopedic',
    imageUrl: 'https://img.freepik.com/free-photo/front-view-male-doctor-holding-his-head-blue-background_140725-14084.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'AIIMS Bhopal',
    distance: '0.8 miles',
    availableToday: true,
    rating: 4.9,
    status: 'active',
    email: 'ravi.tiwari@careconnect.com',
    phone: '+91 98765 43221',
    bio: 'Sports medicine specialist and arthroscopic surgeon.'
  },
  {
    id: '13',
    name: 'Dr. Meera Jain',
    specialty: 'Orthopedic',
    imageUrl: 'https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Chirayu Medical College',
    distance: '3.1 miles',
    availableToday: false,
    nextAvailable: 'Tomorrow',
    rating: 4.7,
    status: 'active',
    email: 'meera.jain@careconnect.com',
    phone: '+91 98765 43222',
    bio: 'Pediatric orthopedic surgeon specializing in spine disorders.'
  },
  {
    id: '14',
    name: 'Dr. Anil Verma',
    specialty: 'Orthopedic',
    imageUrl: 'https://img.freepik.com/free-photo/doctor-wearing-white-coat-stethoscope_144627-36728.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Bansal Hospital',
    distance: '1.8 miles',
    availableToday: true,
    rating: 4.6,
    status: 'active',
    email: 'anil.verma@careconnect.com',
    phone: '+91 98765 43223',
    bio: 'Trauma surgeon with expertise in fracture management.'
  },
  {
    id: '15',
    name: 'Dr. Deepika Singh',
    specialty: 'Orthopedic',
    imageUrl: 'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Hamidia Hospital',
    distance: '2.5 miles',
    availableToday: true,
    rating: 4.8,
    status: 'active',
    email: 'deepika.singh@careconnect.com',
    phone: '+91 98765 43224',
    bio: 'Hand and wrist surgery specialist.'
  },

  // Neurologists
  {
    id: '16',
    name: 'Dr. Ashok Pandey',
    specialty: 'Neurologist',
    imageUrl: 'https://img.freepik.com/free-photo/front-view-male-doctor-holding-his-head-blue-background_140725-14084.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Bhopal Neuro Center',
    distance: '2.2 miles',
    availableToday: true,
    rating: 4.9,
    status: 'active',
    email: 'ashok.pandey@careconnect.com',
    phone: '+91 98765 43225',
    bio: 'Epilepsy specialist and EEG expert.'
  },
  {
    id: '17',
    name: 'Dr. Sanjana Rao',
    specialty: 'Neurologist',
    imageUrl: 'https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'AIIMS Bhopal',
    distance: '0.9 miles',
    availableToday: false,
    nextAvailable: 'Friday',
    rating: 4.8,
    status: 'active',
    email: 'sanjana.rao@careconnect.com',
    phone: '+91 98765 43226',
    bio: 'Movement disorders specialist, Parkinson\'s disease expert.'
  },
  {
    id: '18',
    name: 'Dr. Manoj Agrawal',
    specialty: 'Neurologist',
    imageUrl: 'https://img.freepik.com/free-photo/doctor-wearing-white-coat-stethoscope_144627-36728.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Chirayu Medical College',
    distance: '3.0 miles',
    availableToday: true,
    rating: 4.7,
    status: 'active',
    email: 'manoj.agrawal@careconnect.com',
    phone: '+91 98765 43227',
    bio: 'Stroke specialist and interventional neurologist.'
  },
  {
    id: '19',
    name: 'Dr. Priyanka Dubey',
    specialty: 'Neurologist',
    imageUrl: 'https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Bansal Hospital',
    distance: '1.7 miles',
    availableToday: true,
    rating: 4.6,
    status: 'active',
    email: 'priyanka.dubey@careconnect.com',
    phone: '+91 98765 43228',
    bio: 'Pediatric neurologist specializing in childhood epilepsy.'
  },
  {
    id: '20',
    name: 'Dr. Kiran Mishra',
    specialty: 'Neurologist',
    imageUrl: 'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Hamidia Hospital',
    distance: '2.8 miles',
    availableToday: false,
    nextAvailable: 'Monday',
    rating: 4.8,
    status: 'active',
    email: 'kiran.mishra@careconnect.com',
    phone: '+91 98765 43229',
    bio: 'Headache and migraine specialist.'
  },

  // Pediatricians
  {
    id: '21',
    name: 'Dr. Rekha Gupta',
    specialty: 'Pediatrician',
    imageUrl: 'https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Bhopal Children\'s Hospital',
    distance: '1.6 miles',
    availableToday: true,
    rating: 4.9,
    status: 'active',
    email: 'rekha.gupta@careconnect.com',
    phone: '+91 98765 43230',
    bio: 'Neonatal intensive care specialist.'
  },
  {
    id: '22',
    name: 'Dr. Vinod Sharma',
    specialty: 'Pediatrician',
    imageUrl: 'https://img.freepik.com/free-photo/doctor-wearing-white-coat-stethoscope_144627-36728.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'AIIMS Bhopal',
    distance: '0.8 miles',
    availableToday: true,
    rating: 4.8,
    status: 'active',
    email: 'vinod.sharma@careconnect.com',
    phone: '+91 98765 43231',
    bio: 'Pediatric infectious disease specialist.'
  },
  {
    id: '23',
    name: 'Dr. Anita Joshi',
    specialty: 'Pediatrician',
    imageUrl: 'https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Bansal Hospital',
    distance: '1.9 miles',
    availableToday: false,
    nextAvailable: 'Tomorrow',
    rating: 4.7,
    status: 'active',
    email: 'anita.joshi@careconnect.com',
    phone: '+91 98765 43232',
    bio: 'Developmental pediatrician and autism specialist.'
  },
  {
    id: '24',
    name: 'Dr. Ramesh Patel',
    specialty: 'Pediatrician',
    imageUrl: 'https://img.freepik.com/free-photo/front-view-male-doctor-holding-his-head-blue-background_140725-14084.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Chirayu Medical College',
    distance: '3.2 miles',
    availableToday: true,
    rating: 4.6,
    status: 'active',
    email: 'ramesh.patel@careconnect.com',
    phone: '+91 98765 43233',
    bio: 'Pediatric emergency medicine specialist.'
  },
  {
    id: '25',
    name: 'Dr. Shweta Malhotra',
    specialty: 'Pediatrician',
    imageUrl: 'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Hamidia Hospital',
    distance: '2.4 miles',
    availableToday: true,
    rating: 4.8,
    status: 'active',
    email: 'shweta.malhotra@careconnect.com',
    phone: '+91 98765 43234',
    bio: 'Pediatric pulmonologist specializing in asthma.'
  },

  // General Physicians
  {
    id: '26',
    name: 'Dr. Mukesh Singh',
    specialty: 'General Physician',
    imageUrl: 'https://img.freepik.com/free-photo/doctor-wearing-white-coat-stethoscope_144627-36728.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Bhopal General Hospital',
    distance: '1.3 miles',
    availableToday: true,
    rating: 4.5,
    status: 'active',
    email: 'mukesh.singh@careconnect.com',
    phone: '+91 98765 43235',
    bio: 'Family medicine practitioner with 20 years experience.'
  },
  {
    id: '27',
    name: 'Dr. Sunita Agarwal',
    specialty: 'General Physician',
    imageUrl: 'https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'City Medical Center',
    distance: '2.1 miles',
    availableToday: true,
    rating: 4.6,
    status: 'active',
    email: 'sunita.agarwal@careconnect.com',
    phone: '+91 98765 43236',
    bio: 'Preventive medicine specialist and health consultant.'
  },
  {
    id: '28',
    name: 'Dr. Ajay Kumar',
    specialty: 'General Physician',
    imageUrl: 'https://img.freepik.com/free-photo/front-view-male-doctor-holding-his-head-blue-background_140725-14084.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'AIIMS Bhopal',
    distance: '0.9 miles',
    availableToday: false,
    nextAvailable: 'Tomorrow',
    rating: 4.7,
    status: 'active',
    email: 'ajay.kumar@careconnect.com',
    phone: '+91 98765 43237',
    bio: 'Internal medicine specialist with diabetes expertise.'
  },
  {
    id: '29',
    name: 'Dr. Geeta Yadav',
    specialty: 'General Physician',
    imageUrl: 'https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Bansal Hospital',
    distance: '1.8 miles',
    availableToday: true,
    rating: 4.4,
    status: 'active',
    email: 'geeta.yadav@careconnect.com',
    phone: '+91 98765 43238',
    bio: 'Geriatric medicine specialist for elderly care.'
  },
  {
    id: '30',
    name: 'Dr. Sanjay Tiwari',
    specialty: 'General Physician',
    imageUrl: 'https://img.freepik.com/free-photo/doctor-wearing-white-coat-stethoscope_144627-36728.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Hamidia Hospital',
    distance: '2.6 miles',
    availableToday: true,
    rating: 4.5,
    status: 'active',
    email: 'sanjay.tiwari@careconnect.com',
    phone: '+91 98765 43239',
    bio: 'Occupational health and wellness specialist.'
  },

  // Pulmonologists
  {
    id: '31',
    name: 'Dr. Raman Khanna',
    specialty: 'Pulmonologist',
    imageUrl: 'https://img.freepik.com/free-photo/front-view-male-doctor-holding-his-head-blue-background_140725-14084.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Bhopal Lung Care Institute',
    distance: '2.0 miles',
    availableToday: true,
    rating: 4.8,
    status: 'active',
    email: 'raman.khanna@careconnect.com',
    phone: '+91 98765 43240',
    bio: 'COPD and asthma specialist with pulmonary function expertise.'
  },
  {
    id: '32',
    name: 'Dr. Nisha Bansal',
    specialty: 'Pulmonologist',
    imageUrl: 'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'AIIMS Bhopal',
    distance: '0.8 miles',
    availableToday: false,
    nextAvailable: 'Friday',
    rating: 4.9,
    status: 'active',
    email: 'nisha.bansal@careconnect.com',
    phone: '+91 98765 43241',
    bio: 'Interventional pulmonologist and bronchoscopy expert.'
  },
  {
    id: '33',
    name: 'Dr. Harish Jain',
    specialty: 'Pulmonologist',
    imageUrl: 'https://img.freepik.com/free-photo/doctor-wearing-white-coat-stethoscope_144627-36728.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Chirayu Medical College',
    distance: '3.1 miles',
    availableToday: true,
    rating: 4.7,
    status: 'active',
    email: 'harish.jain@careconnect.com',
    phone: '+91 98765 43242',
    bio: 'Sleep medicine specialist and respiratory therapist.'
  },
  {
    id: '34',
    name: 'Dr. Kavita Soni',
    specialty: 'Pulmonologist',
    imageUrl: 'https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Bansal Hospital',
    distance: '1.9 miles',
    availableToday: true,
    rating: 4.6,
    status: 'active',
    email: 'kavita.soni@careconnect.com',
    phone: '+91 98765 43243',
    bio: 'Tuberculosis specialist and infection control expert.'
  },
  {
    id: '35',
    name: 'Dr. Prakash Rao',
    specialty: 'Pulmonologist',
    imageUrl: 'https://img.freepik.com/free-photo/front-view-male-doctor-holding-his-head-blue-background_140725-14084.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Hamidia Hospital',
    distance: '2.7 miles',
    availableToday: false,
    nextAvailable: 'Monday',
    rating: 4.8,
    status: 'active',
    email: 'prakash.rao@careconnect.com',
    phone: '+91 98765 43244',
    bio: 'Critical care pulmonologist and ventilator specialist.'
  },

  // Gastroenterologists
  {
    id: '36',
    name: 'Dr. Mohan Gupta',
    specialty: 'Gastroenterologist',
    imageUrl: 'https://img.freepik.com/free-photo/doctor-wearing-white-coat-stethoscope_144627-36728.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Bhopal Digestive Care Center',
    distance: '2.3 miles',
    availableToday: true,
    rating: 4.7,
    status: 'active',
    email: 'mohan.gupta@careconnect.com',
    phone: '+91 98765 43245',
    bio: 'Endoscopy specialist and liver disease expert.'
  },
  {
    id: '37',
    name: 'Dr. Seema Agarwal',
    specialty: 'Gastroenterologist',
    imageUrl: 'https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'AIIMS Bhopal',
    distance: '0.9 miles',
    availableToday: true,
    rating: 4.8,
    status: 'active',
    email: 'seema.agarwal@careconnect.com',
    phone: '+91 98765 43246',
    bio: 'Inflammatory bowel disease specialist.'
  },
  {
    id: '38',
    name: 'Dr. Rajesh Malhotra',
    specialty: 'Gastroenterologist',
    imageUrl: 'https://img.freepik.com/free-photo/front-view-male-doctor-holding-his-head-blue-background_140725-14084.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Bansal Hospital',
    distance: '1.8 miles',
    availableToday: false,
    nextAvailable: 'Tomorrow',
    rating: 4.6,
    status: 'active',
    email: 'rajesh.malhotra@careconnect.com',
    phone: '+91 98765 43247',
    bio: 'Pancreatic and biliary disorders specialist.'
  },
  {
    id: '39',
    name: 'Dr. Usha Sharma',
    specialty: 'Gastroenterologist',
    imageUrl: 'https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Chirayu Medical College',
    distance: '3.0 miles',
    availableToday: true,
    rating: 4.5,
    status: 'active',
    email: 'usha.sharma@careconnect.com',
    phone: '+91 98765 43248',
    bio: 'Pediatric gastroenterologist specializing in childhood digestive disorders.'
  },
  {
    id: '40',
    name: 'Dr. Dinesh Patel',
    specialty: 'Gastroenterologist',
    imageUrl: 'https://img.freepik.com/free-photo/doctor-wearing-white-coat-stethoscope_144627-36728.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Hamidia Hospital',
    distance: '2.5 miles',
    availableToday: true,
    rating: 4.7,
    status: 'active',
    email: 'dinesh.patel@careconnect.com',
    phone: '+91 98765 43249',
    bio: 'Colorectal surgery and cancer screening specialist.'
  },

  // Ophthalmologists
  {
    id: '41',
    name: 'Dr. Vinay Joshi',
    specialty: 'Ophthalmologist',
    imageUrl: 'https://img.freepik.com/free-photo/front-view-male-doctor-holding-his-head-blue-background_140725-14084.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Bhopal Eye Care Hospital',
    distance: '1.7 miles',
    availableToday: true,
    rating: 4.9,
    status: 'active',
    email: 'vinay.joshi@careconnect.com',
    phone: '+91 98765 43250',
    bio: 'Cataract and refractive surgery specialist.'
  },
  {
    id: '42',
    name: 'Dr. Rashmi Singh',
    specialty: 'Ophthalmologist',
    imageUrl: 'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'AIIMS Bhopal',
    distance: '0.8 miles',
    availableToday: true,
    rating: 4.8,
    status: 'active',
    email: 'rashmi.singh@careconnect.com',
    phone: '+91 98765 43251',
    bio: 'Retinal specialist and diabetic eye care expert.'
  },
  {
    id: '43',
    name: 'Dr. Sunil Verma',
    specialty: 'Ophthalmologist',
    imageUrl: 'https://img.freepik.com/free-photo/doctor-wearing-white-coat-stethoscope_144627-36728.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Bansal Hospital',
    distance: '1.9 miles',
    availableToday: false,
    nextAvailable: 'Friday',
    rating: 4.7,
    status: 'active',
    email: 'sunil.verma@careconnect.com',
    phone: '+91 98765 43252',
    bio: 'Glaucoma specialist and laser surgery expert.'
  },
  {
    id: '44',
    name: 'Dr. Madhuri Rao',
    specialty: 'Ophthalmologist',
    imageUrl: 'https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Chirayu Medical College',
    distance: '3.1 miles',
    availableToday: true,
    rating: 4.6,
    status: 'active',
    email: 'madhuri.rao@careconnect.com',
    phone: '+91 98765 43253',
    bio: 'Pediatric ophthalmologist and squint specialist.'
  },
  {
    id: '45',
    name: 'Dr. Arun Khanna',
    specialty: 'Ophthalmologist',
    imageUrl: 'https://img.freepik.com/free-photo/front-view-male-doctor-holding-his-head-blue-background_140725-14084.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Hamidia Hospital',
    distance: '2.4 miles',
    availableToday: true,
    rating: 4.8,
    status: 'active',
    email: 'arun.khanna@careconnect.com',
    phone: '+91 98765 43254',
    bio: 'Corneal transplant and external eye disease specialist.'
  },

  // Endocrinologists
  {
    id: '46',
    name: 'Dr. Shashi Agarwal',
    specialty: 'Endocrinologist',
    imageUrl: 'https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Bhopal Diabetes & Hormone Center',
    distance: '2.1 miles',
    availableToday: true,
    rating: 4.8,
    status: 'active',
    email: 'shashi.agarwal@careconnect.com',
    phone: '+91 98765 43255',
    bio: 'Diabetes specialist and insulin pump expert.'
  },
  {
    id: '47',
    name: 'Dr. Rakesh Tiwari',
    specialty: 'Endocrinologist',
    imageUrl: 'https://img.freepik.com/free-photo/doctor-wearing-white-coat-stethoscope_144627-36728.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'AIIMS Bhopal',
    distance: '0.9 miles',
    availableToday: false,
    nextAvailable: 'Monday',
    rating: 4.7,
    status: 'active',
    email: 'rakesh.tiwari@careconnect.com',
    phone: '+91 98765 43256',
    bio: 'Thyroid disorders and metabolic syndrome specialist.'
  },
  {
    id: '48',
    name: 'Dr. Preeti Malhotra',
    specialty: 'Endocrinologist',
    imageUrl: 'https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Bansal Hospital',
    distance: '1.8 miles',
    availableToday: true,
    rating: 4.6,
    status: 'active',
    email: 'preeti.malhotra@careconnect.com',
    phone: '+91 98765 43257',
    bio: 'PCOS and reproductive endocrinology specialist.'
  },
  {
    id: '49',
    name: 'Dr. Gopal Sharma',
    specialty: 'Endocrinologist',
    imageUrl: 'https://img.freepik.com/free-photo/front-view-male-doctor-holding-his-head-blue-background_140725-14084.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Chirayu Medical College',
    distance: '3.0 miles',
    availableToday: true,
    rating: 4.5,
    status: 'active',
    email: 'gopal.sharma@careconnect.com',
    phone: '+91 98765 43258',
    bio: 'Pediatric endocrinologist and growth disorders specialist.'
  },
  {
    id: '50',
    name: 'Dr. Lata Jain',
    specialty: 'Endocrinologist',
    imageUrl: 'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Hamidia Hospital',
    distance: '2.6 miles',
    availableToday: false,
    nextAvailable: 'Tomorrow',
    rating: 4.7,
    status: 'active',
    email: 'lata.jain@careconnect.com',
    phone: '+91 98765 43259',
    bio: 'Osteoporosis and bone metabolism specialist.'
  },

  // Psychiatrists
  {
    id: '51',
    name: 'Dr. Manish Dubey',
    specialty: 'Psychiatrist',
    imageUrl: 'https://img.freepik.com/free-photo/doctor-wearing-white-coat-stethoscope_144627-36728.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Bhopal Mental Health Center',
    distance: '1.9 miles',
    availableToday: true,
    rating: 4.8,
    status: 'active',
    email: 'manish.dubey@careconnect.com',
    phone: '+91 98765 43260',
    bio: 'Depression and anxiety disorders specialist.'
  },
  {
    id: '52',
    name: 'Dr. Anjali Mishra',
    specialty: 'Psychiatrist',
    imageUrl: 'https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'AIIMS Bhopal',
    distance: '0.8 miles',
    availableToday: true,
    rating: 4.9,
    status: 'active',
    email: 'anjali.mishra@careconnect.com',
    phone: '+91 98765 43261',
    bio: 'Child and adolescent psychiatrist.'
  },
  {
    id: '53',
    name: 'Dr. Sanjiv Rao',
    specialty: 'Psychiatrist',
    imageUrl: 'https://img.freepik.com/free-photo/front-view-male-doctor-holding-his-head-blue-background_140725-14084.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Bansal Hospital',
    distance: '1.8 miles',
    availableToday: false,
    nextAvailable: 'Friday',
    rating: 4.7,
    status: 'active',
    email: 'sanjiv.rao@careconnect.com',
    phone: '+91 98765 43262',
    bio: 'Addiction medicine and rehabilitation specialist.'
  },
  {
    id: '54',
    name: 'Dr. Renu Gupta',
    specialty: 'Psychiatrist',
    imageUrl: 'https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Chirayu Medical College',
    distance: '3.1 miles',
    availableToday: true,
    rating: 4.6,
    status: 'active',
    email: 'renu.gupta@careconnect.com',
    phone: '+91 98765 43263',
    bio: 'Geriatric psychiatrist and dementia specialist.'
  },
  {
    id: '55',
    name: 'Dr. Vivek Pandey',
    specialty: 'Psychiatrist',
    imageUrl: 'https://img.freepik.com/free-photo/doctor-wearing-white-coat-stethoscope_144627-36728.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Hamidia Hospital',
    distance: '2.5 miles',
    availableToday: true,
    rating: 4.8,
    status: 'active',
    email: 'vivek.pandey@careconnect.com',
    phone: '+91 98765 43264',
    bio: 'Bipolar disorder and mood disorders specialist.'
  },

  // Nephrologists
  {
    id: '56',
    name: 'Dr. Ramesh Agarwal',
    specialty: 'Nephrologist',
    imageUrl: 'https://img.freepik.com/free-photo/front-view-male-doctor-holding-his-head-blue-background_140725-14084.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Bhopal Kidney Care Center',
    distance: '2.2 miles',
    availableToday: true,
    rating: 4.8,
    status: 'active',
    email: 'ramesh.agarwal@careconnect.com',
    phone: '+91 98765 43265',
    bio: 'Dialysis specialist and kidney transplant expert.'
  },
  {
    id: '57',
    name: 'Dr. Sushma Joshi',
    specialty: 'Nephrologist',
    imageUrl: 'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'AIIMS Bhopal',
    distance: '0.9 miles',
    availableToday: false,
    nextAvailable: 'Monday',
    rating: 4.9,
    status: 'active',
    email: 'sushma.joshi@careconnect.com',
    phone: '+91 98765 43266',
    bio: 'Pediatric nephrologist and genetic kidney disease specialist.'
  },
  {
    id: '58',
    name: 'Dr. Ashish Verma',
    specialty: 'Nephrologist',
    imageUrl: 'https://img.freepik.com/free-photo/doctor-wearing-white-coat-stethoscope_144627-36728.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Bansal Hospital',
    distance: '1.7 miles',
    availableToday: true,
    rating: 4.7,
    status: 'active',
    email: 'ashish.verma@careconnect.com',
    phone: '+91 98765 43267',
    bio: 'Hypertension and chronic kidney disease specialist.'
  },
  {
    id: '59',
    name: 'Dr. Kavita Malhotra',
    specialty: 'Nephrologist',
    imageUrl: 'https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Chirayu Medical College',
    distance: '3.0 miles',
    availableToday: true,
    rating: 4.6,
    status: 'active',
    email: 'kavita.malhotra@careconnect.com',
    phone: '+91 98765 43268',
    bio: 'Glomerular diseases and lupus nephritis specialist.'
  },
  {
    id: '60',
    name: 'Dr. Yogesh Patel',
    specialty: 'Nephrologist',
    imageUrl: 'https://img.freepik.com/free-photo/front-view-male-doctor-holding-his-head-blue-background_140725-14084.jpg?w=996&t=st=1699234567~exp=1699235167~hmac=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    hospital: 'Hamidia Hospital',
    distance: '2.8 miles',
    availableToday: false,
    nextAvailable: 'Tomorrow',
    rating: 4.8,
    status: 'active',
    email: 'yogesh.patel@careconnect.com',
    phone: '+91 98765 43269',
    bio: 'Interventional nephrology and vascular access specialist.'
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
      name: 'doctor-storage',
      version: 2,
      migrate: () => {
        // Reset to initial doctors on version change
        return { doctors: initialDoctors, isLoading: false };
      }
    }
  )
);