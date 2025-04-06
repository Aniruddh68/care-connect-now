
import React from 'react';
import { MapPinIcon, ClockIcon, CalendarIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

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
}

interface DoctorCardProps {
  doctor: Doctor;
  showBookButton?: boolean;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ 
  doctor,
  showBookButton = true
}) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4 card-hover">
      <div className="flex">
        <div className="flex-shrink-0 mr-4">
          <img 
            src={doctor.imageUrl} 
            alt={doctor.name} 
            className="w-20 h-20 rounded-full object-cover border-2 border-care-primary"
          />
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg text-care-dark">{doctor.name}</h3>
              <p className="text-care-muted text-sm">{doctor.specialty}</p>
            </div>
            <div className="flex items-center px-2 py-1 rounded bg-sky-50">
              <span className="text-care-primary font-medium">★ {doctor.rating}</span>
            </div>
          </div>
          
          <div className="mt-2 flex items-center text-sm text-care-muted">
            <MapPinIcon className="h-4 w-4 mr-1" />
            <span>{doctor.hospital} • {doctor.distance}</span>
          </div>
          
          <div className="mt-2 flex justify-between items-center">
            <div className="flex items-center">
              <ClockIcon className="h-4 w-4 mr-1 text-care-muted" />
              {doctor.availableToday ? (
                <span className="text-care-success font-medium">Available today</span>
              ) : (
                <span className="text-care-muted">{doctor.nextAvailable}</span>
              )}
            </div>
            
            {showBookButton && (
              <Link 
                to={`/book/${doctor.id}`}
                className="primary-button text-sm py-2 px-4"
              >
                Book Now
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
