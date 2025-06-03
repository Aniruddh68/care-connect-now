
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

  // Emergency tips collection
  const emergencyTips = [
    {
      title: "Heart Attack Signs",
      description: "Call 108 immediately if experiencing chest pain, shortness of breath, nausea, or pain radiating to arms. Time is critical in heart attack situations."
    },
    {
      title: "Choking Emergency",
      description: "Perform the Heimlich maneuver: stand behind the person, place hands above navel, and give quick upward thrusts. Call emergency services if unsuccessful."
    },
    {
      title: "Severe Bleeding",
      description: "Apply direct pressure with clean cloth to the wound. Elevate the injured area above heart level if possible. Call 108 for severe bleeding."
    },
    {
      title: "Unconscious Person",
      description: "Check for breathing and pulse. If absent, start CPR. Place person in recovery position if breathing. Always call emergency services immediately."
    },
    {
      title: "Poisoning Emergency",
      description: "Call poison control immediately. Do not induce vomiting unless instructed. Keep the poison container for information. Get to emergency room fast."
    },
    {
      title: "Stroke Symptoms",
      description: "Remember FAST: Face drooping, Arm weakness, Speech difficulty, Time to call 108. Quick treatment can prevent permanent brain damage."
    },
    {
      title: "Burn Treatment",
      description: "Cool burns with running water for 10-20 minutes. Cover with clean cloth. For severe burns, call 108 immediately and do not remove clothing."
    },
    {
      title: "Allergic Reaction",
      description: "For severe allergic reactions, use epinephrine if available and call 108. Watch for swelling, difficulty breathing, or rapid pulse."
    },
    {
      title: "Seizure Response",
      description: "Clear area around person, place something soft under head, turn to side. Do not put anything in mouth. Call 108 for prolonged seizures."
    },
    {
      title: "Emergency Kit",
      description: "Keep first aid kit with bandages, antiseptic, pain relievers, emergency numbers, and any personal medications easily accessible at home."
    }
  ];

  const navigateTips = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentTipIndex((currentTipIndex + 1) % emergencyTips.length);
    } else {
      setCurrentTipIndex((currentTipIndex - 1 + emergencyTips.length) % emergencyTips.length);
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

        {/* Emergency Tips */}
        <h2 className="text-xl font-semibold mb-4 text-care-dark">Emergency Tips</h2>
        <Card className="mb-8 bg-gradient-to-br from-red-50 to-orange-50 relative">
          <CardContent className="p-4">
            <h3 className="font-medium text-care-dark mb-2">{emergencyTips[currentTipIndex].title}</h3>
            <p className="text-care-muted">
              {emergencyTips[currentTipIndex].description}
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
                {currentTipIndex + 1} of {emergencyTips.length}
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
