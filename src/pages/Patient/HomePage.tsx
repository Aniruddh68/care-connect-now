
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useUser } from '@/context/UserContext';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Heart, FileText, MapPin, Clock, ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import EmergencyButton from '@/components/common/EmergencyButton';
import { useAppointmentStore } from '@/services/appointmentService';
import { format } from 'date-fns';

const PatientHomePage: React.FC = () => {
  const { user } = useUser();
  const { appointments } = useAppointmentStore();
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  // Filter for upcoming appointments
  const upcomingAppointments = appointments.filter(
    appointment => appointment.status === 'upcoming'
  );

  const quickActions = [
    {
      icon: <Calendar className="h-6 w-6 text-care-primary" />,
      title: "Book Appointment",
      description: "Schedule a visit with a doctor",
      link: "/find"
    },
    {
      icon: <Heart className="h-6 w-6 text-care-primary" />,
      title: "My Appointments",
      description: "View your upcoming appointments",
      link: "/appointments"
    },
    {
      icon: <FileText className="h-6 w-6 text-care-primary" />,
      title: "Medical Records",
      description: "Access your health documents",
      link: "/profile"
    },
    {
      icon: <MapPin className="h-6 w-6 text-care-primary" />,
      title: "Nearby Hospitals",
      description: "Find healthcare facilities near you",
      link: "/nearby"
    }
  ];

  // Health tips collection
  const healthTips = [
    {
      title: "Stay Hydrated",
      description: "Remember to drink at least 8 glasses of water daily for optimal health. Staying hydrated helps your body maintain energy levels and supports vital functions."
    },
    {
      title: "Balanced Diet",
      description: "Include fruits, vegetables, whole grains, lean proteins, and healthy fats in your meals. A balanced diet provides essential nutrients for overall wellbeing."
    },
    {
      title: "Regular Exercise",
      description: "Aim for at least 30 minutes of moderate physical activity most days. Regular exercise strengthens your heart, improves mood, and helps maintain a healthy weight."
    },
    {
      title: "Quality Sleep",
      description: "Prioritize 7-9 hours of quality sleep each night. Good sleep boosts immune function, enhances memory, and helps regulate metabolism."
    },
    {
      title: "Stress Management",
      description: "Practice mindfulness, deep breathing, or meditation regularly. Managing stress effectively reduces your risk of various health conditions and improves mental wellbeing."
    }
  ];

  const navigateTips = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentTipIndex((currentTipIndex + 1) % healthTips.length);
    } else {
      setCurrentTipIndex((currentTipIndex - 1 + healthTips.length) % healthTips.length);
    }
  };

  return (
    <MainLayout>
      <div className="px-4 py-6 md:px-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-care-dark">
            Welcome, {user?.fullName?.split(' ')[0] || 'Patient'}
          </h1>
          <p className="text-care-muted mt-1">
            What would you like to do today?
          </p>
        </div>

        {/* Emergency Button */}
        <EmergencyButton className="w-full mb-6" />

        {/* Quick Actions */}
        <h2 className="text-xl font-semibold mb-4 text-care-dark">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.link}>
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardContent className="p-4 flex gap-4 items-center">
                  <div className="p-3 rounded-full bg-sky-50">
                    {action.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-care-dark">{action.title}</h3>
                    <p className="text-sm text-care-muted">{action.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Health Tips */}
        <h2 className="text-xl font-semibold mb-4 text-care-dark">Health Tips</h2>
        <Card className="mb-8 bg-gradient-to-br from-sky-50 to-cyan-50 relative">
          <CardContent className="p-4">
            <h3 className="font-medium text-care-dark mb-2">{healthTips[currentTipIndex].title}</h3>
            <p className="text-care-muted">
              {healthTips[currentTipIndex].description}
            </p>
            <div className="flex justify-between mt-4">
              <button 
                onClick={() => navigateTips('prev')} 
                className="p-1 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors"
                aria-label="Previous tip"
              >
                <ChevronLeft className="h-5 w-5 text-care-primary" />
              </button>
              <div className="text-xs text-care-muted">
                {currentTipIndex + 1} of {healthTips.length}
              </div>
              <button 
                onClick={() => navigateTips('next')} 
                className="p-1 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors"
                aria-label="Next tip"
              >
                <ChevronRight className="h-5 w-5 text-care-primary" />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Appointment Preview */}
        <h2 className="text-xl font-semibold mb-4 text-care-dark">Upcoming Appointment</h2>
        <Link to="/appointments">
          <Card className="hover:shadow-md transition-shadow mb-6">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                {upcomingAppointments.length > 0 ? (
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-care-dark">
                        {upcomingAppointments[0].doctorName}
                      </h3>
                      <Calendar className="h-5 w-5 text-care-muted" />
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-care-muted">
                      <Clock className="h-4 w-4" />
                      <span>{format(upcomingAppointments[0].date, 'EEEE, MMMM d, yyyy')} at {upcomingAppointments[0].time}</span>
                    </div>
                    <div className="text-sm text-care-muted">
                      {upcomingAppointments[0].hospital}
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-medium text-care-dark">No upcoming appointments</h3>
                    <p className="text-sm text-care-muted">Book a new appointment to get started</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </MainLayout>
  );
};

export default PatientHomePage;
