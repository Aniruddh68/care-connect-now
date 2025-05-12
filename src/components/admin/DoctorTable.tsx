
import React from 'react';
import { UserPlus, UserMinus, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Doctor } from '@/types/doctor';

interface DoctorTableProps {
  doctors: Doctor[];
  onStatusChange: (doctorId: string, status: 'active' | 'inactive') => void;
  isLoading: boolean;
}

const DoctorTable: React.FC<DoctorTableProps> = ({ doctors, onStatusChange, isLoading }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hospital</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialty</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {doctors.map(doctor => (
            <tr key={doctor.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded-full" src={doctor.imageUrl} alt={doctor.name} />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{doctor.name}</div>
                    <div className="text-sm text-gray-500">Rating: {doctor.rating}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{doctor.email}</div>
                <div className="text-sm text-gray-500">{doctor.phone}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{doctor.hospital}</div>
                <div className="text-sm text-gray-500">Distance: {doctor.distance}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {doctor.specialty}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  doctor.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {doctor.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center space-x-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center"
                    onClick={() => onStatusChange(doctor.id, doctor.status === 'active' ? 'inactive' : 'active')}
                    disabled={isLoading}
                  >
                    {doctor.status === 'active' ? (
                      <UserMinus className="h-4 w-4 mr-2 text-red-500" />
                    ) : (
                      <UserPlus className="h-4 w-4 mr-2 text-green-500" />
                    )}
                    {doctor.status === 'active' ? 'Deactivate' : 'Activate'}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center text-blue-600"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorTable;
