
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { MapPinIcon, Clock, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Hospital {
  id: string;
  name: string;
  address: string;
  distance: string;
  availableDoctors: number;
  phone: string;
  open: boolean;
  hours: string;
}

// Mock data
const mockHospitals: Hospital[] = [
  {
    id: '1',
    name: 'City Medical Center',
    address: '123 Main Street, City',
    distance: '1.2 miles',
    availableDoctors: 5,
    phone: '(555) 123-4567',
    open: true,
    hours: 'Open 24 hours'
  },
  {
    id: '2',
    name: 'General Hospital',
    address: '456 Oak Avenue, City',
    distance: '0.8 miles',
    availableDoctors: 3,
    phone: '(555) 987-6543',
    open: true,
    hours: 'Open 24 hours'
  },
  {
    id: '3',
    name: 'University Hospital',
    address: '789 College Blvd, City',
    distance: '3.1 miles',
    availableDoctors: 8,
    phone: '(555) 456-7890',
    open: true,
    hours: 'Open 24 hours'
  },
  {
    id: '4',
    name: 'Children\'s Hospital',
    address: '234 Elm Street, City',
    distance: '2.4 miles',
    availableDoctors: 4,
    phone: '(555) 234-5678',
    open: true,
    hours: 'Open 24 hours'
  }
];

// Sort hospitals by distance
const sortedHospitals = [...mockHospitals].sort((a, b) => {
  const distanceA = parseFloat(a.distance.split(' ')[0]);
  const distanceB = parseFloat(b.distance.split(' ')[0]);
  return distanceA - distanceB;
});

const NearbyPage: React.FC = () => {
  // This would use real location data in a production app
  const [hospitals] = useState<Hospital[]>(sortedHospitals);
  
  return (
    <MainLayout title="Nearby Hospitals">
      <div className="max-w-lg mx-auto px-4 pb-20 pt-4">
        <div className="mb-6">
          <div className="aspect-video bg-gray-200 rounded-xl mb-4 flex items-center justify-center">
            <p className="text-care-muted">Map would appear here</p>
          </div>
          
          <p className="text-care-muted text-sm mb-1">
            Showing hospitals near your current location
          </p>
          <button className="text-care-primary text-sm font-medium">
            Change location
          </button>
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-care-dark mb-4">
            Nearby Hospitals ({hospitals.length})
          </h2>
          
          {hospitals.map(hospital => (
            <div key={hospital.id} className="bg-white rounded-xl shadow p-4 mb-4 card-hover">
              <h3 className="font-bold text-lg">{hospital.name}</h3>
              
              <div className="flex items-center text-sm text-care-muted mt-1 mb-2">
                <MapPinIcon className="h-4 w-4 mr-1" />
                <span>{hospital.address} • {hospital.distance}</span>
              </div>
              
              <div className="flex items-center text-sm mb-2">
                <Clock className="h-4 w-4 mr-2 text-care-muted" />
                {hospital.open ? (
                  <span className="text-care-success">{hospital.hours}</span>
                ) : (
                  <span className="text-care-error">Closed now</span>
                )}
              </div>
              
              <div className="flex items-center text-sm mb-3">
                <span className="text-care-primary font-medium">
                  {hospital.availableDoctors} doctors available
                </span>
              </div>
              
              <div className="flex gap-4 mt-3">
                <button 
                  onClick={() => alert('This would navigate to the hospital')}
                  className="flex-1 primary-button py-2 flex items-center justify-center"
                >
                  <MapPinIcon className="mr-2 h-4 w-4" />
                  Directions
                </button>
                <a 
                  href={`tel:${hospital.phone}`}
                  className="flex-1 secondary-button py-2 flex items-center justify-center"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call
                </a>
              </div>
              
              <Link 
                to={`/find?hospital=${hospital.id}`}
                className="mt-3 w-full py-2 flex justify-center items-center bg-gray-100 text-care-dark rounded-lg"
              >
                View Available Doctors
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default NearbyPage;
