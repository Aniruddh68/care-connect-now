
import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { useAdminDoctors } from '@/hooks/use-admin-doctors';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, UserMinus, Calendar, List } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { doctors, appointments } = useAdminDoctors();
  const location = useLocation();
  
  const activeDoctors = doctors.filter(doctor => doctor.status === 'active').length;
  const inactiveDoctors = doctors.filter(doctor => doctor.status === 'inactive').length;
  const totalAppointments = appointments.length;
  const completedAppointments = appointments.filter(app => app.status === 'completed').length;
  const scheduledAppointments = appointments.filter(app => app.status === 'scheduled').length;
  const cancelledAppointments = appointments.filter(app => app.status === 'cancelled').length;

  return (
    <AdminLayout title="Dashboard" currentPath={location.pathname}>
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Doctors</CardTitle>
            <UserPlus className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeDoctors}</div>
            <p className="text-xs text-muted-foreground">
              {inactiveDoctors > 0 ? `${inactiveDoctors} inactive doctors` : 'All doctors active'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAppointments}</div>
            <p className="text-xs text-muted-foreground">
              {completedAppointments} completed
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Today</CardTitle>
            <List className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scheduledAppointments}</div>
            <p className="text-xs text-muted-foreground">
              {cancelledAppointments} cancelled
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Inactive Doctors</CardTitle>
            <UserMinus className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inactiveDoctors}</div>
            <p className="text-xs text-muted-foreground">
              {activeDoctors} active doctors
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <h2 className="text-xl font-bold mb-4">Recent Appointments</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Doctor
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {appointments.slice(0, 5).map(appointment => {
              const doctor = doctors.find(d => d.id === appointment.doctorId);
              return (
                <tr key={appointment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{appointment.patientName}</div>
                    <div className="text-sm text-gray-500">ID: {appointment.patientId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{doctor?.name}</div>
                    <div className="text-sm text-gray-500">{doctor?.specialty}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{new Date(appointment.date).toLocaleDateString()}</div>
                    <div className="text-sm text-gray-500">{appointment.startTime} - {appointment.endTime}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${appointment.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' : 
                        appointment.status === 'completed' ? 'bg-green-100 text-green-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {appointment.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
