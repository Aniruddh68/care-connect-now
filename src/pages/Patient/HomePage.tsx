
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useUser } from '@/context/UserContext';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Heart, FileText, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import EmergencyButton from '@/components/common/EmergencyButton';

const PatientHomePage: React.FC = () => {
  const { user } = useUser();

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
        <Card className="mb-8 bg-gradient-to-br from-sky-50 to-cyan-50">
          <CardContent className="p-4">
            <h3 className="font-medium text-care-dark mb-2">Stay Hydrated</h3>
            <p className="text-care-muted">
              Remember to drink at least 8 glasses of water daily for optimal health.
              Staying hydrated helps your body maintain energy levels and supports vital functions.
            </p>
          </CardContent>
        </Card>

        {/* Upcoming Appointment Preview */}
        <h2 className="text-xl font-semibold mb-4 text-care-dark">Upcoming Appointment</h2>
        <Link to="/appointments">
          <Card className="hover:shadow-md transition-shadow mb-6">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-care-dark">No upcoming appointments</h3>
                  <p className="text-sm text-care-muted">Book a new appointment to get started</p>
                </div>
                <Calendar className="h-5 w-5 text-care-muted" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </MainLayout>
  );
};

export default PatientHomePage;
