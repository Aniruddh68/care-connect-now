
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { CalendarIcon, MapPinIcon, Clock, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface Appointment {
  id: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorImage: string;
  hospital: string;
  date: Date;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

// Mock data
const mockAppointments: Appointment[] = [
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

const AppointmentsPage: React.FC = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'past'>('upcoming');
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  
  const upcomingAppointments = appointments.filter(
    appointment => appointment.status === 'upcoming'
  );
  
  const pastAppointments = appointments.filter(
    appointment => appointment.status === 'completed' || appointment.status === 'cancelled'
  );
  
  const handleCancelAppointment = (appointmentId: string) => {
    // This would be an API call in a real app
    setAppointments(appointments.map(appointment => 
      appointment.id === appointmentId 
        ? { ...appointment, status: 'cancelled' as const } 
        : appointment
    ));
    
    toast({
      title: "Appointment Cancelled",
      description: "Your appointment has been cancelled successfully.",
      variant: "default"
    });
  };
  
  const getStatusBadge = (status: Appointment['status']) => {
    switch (status) {
      case 'upcoming':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Upcoming</span>;
      case 'completed':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Completed</span>;
      case 'cancelled':
        return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">Cancelled</span>;
    }
  };
  
  return (
    <MainLayout title="My Appointments">
      <div className="max-w-lg mx-auto px-4 pb-20 pt-4">
        <div className="flex mb-6">
          <button
            onClick={() => setSelectedTab('upcoming')}
            className={`flex-1 py-3 text-center font-medium ${
              selectedTab === 'upcoming' 
                ? 'border-b-2 border-care-primary text-care-primary' 
                : 'text-care-muted'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setSelectedTab('past')}
            className={`flex-1 py-3 text-center font-medium ${
              selectedTab === 'past' 
                ? 'border-b-2 border-care-primary text-care-primary' 
                : 'text-care-muted'
            }`}
          >
            Past
          </button>
        </div>
        
        {selectedTab === 'upcoming' ? (
          <>
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map(appointment => (
                <div key={appointment.id} className="bg-white rounded-xl shadow p-4 mb-4 card-hover">
                  <div className="flex mb-3">
                    <img 
                      src={appointment.doctorImage} 
                      alt={appointment.doctorName} 
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-bold">{appointment.doctorName}</h3>
                      <p className="text-care-muted text-sm">{appointment.doctorSpecialty}</p>
                      <div className="mt-1">
                        {getStatusBadge(appointment.status)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-3">
                    <div className="flex items-center mb-2">
                      <CalendarIcon className="h-4 w-4 mr-2 text-care-muted" />
                      <span>{format(appointment.date, 'EEEE, MMMM d, yyyy')}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <Clock className="h-4 w-4 mr-2 text-care-muted" />
                      <span>{appointment.time}</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <MapPinIcon className="h-4 w-4 mr-2 text-care-muted" />
                      <span>{appointment.hospital}</span>
                    </div>
                    
                    <div className="flex gap-2 mt-2">
                      <button className="flex-1 primary-button py-2">
                        Reschedule
                      </button>
                      <button 
                        onClick={() => handleCancelAppointment(appointment.id)}
                        className="flex-1 secondary-button py-2"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl shadow p-6 text-center">
                <p className="text-care-muted mb-4">You don't have any upcoming appointments</p>
                <Link to="/find" className="primary-button inline-block">
                  Book an Appointment
                </Link>
              </div>
            )}
          </>
        ) : (
          <>
            {pastAppointments.length > 0 ? (
              pastAppointments.map(appointment => (
                <div key={appointment.id} className="bg-white rounded-xl shadow p-4 mb-4">
                  <div className="flex mb-3">
                    <img 
                      src={appointment.doctorImage} 
                      alt={appointment.doctorName} 
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-bold">{appointment.doctorName}</h3>
                      <p className="text-care-muted text-sm">{appointment.doctorSpecialty}</p>
                      <div className="mt-1">
                        {getStatusBadge(appointment.status)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-3">
                    <div className="flex items-center mb-2">
                      <CalendarIcon className="h-4 w-4 mr-2 text-care-muted" />
                      <span>{format(appointment.date, 'EEEE, MMMM d, yyyy')}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <Clock className="h-4 w-4 mr-2 text-care-muted" />
                      <span>{appointment.time}</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <MapPinIcon className="h-4 w-4 mr-2 text-care-muted" />
                      <span>{appointment.hospital}</span>
                    </div>
                    
                    {appointment.status === 'completed' && (
                      <button className="w-full primary-button py-2">
                        Book Follow-up
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl shadow p-6 text-center">
                <p className="text-care-muted">You don't have any past appointments</p>
              </div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default AppointmentsPage;
