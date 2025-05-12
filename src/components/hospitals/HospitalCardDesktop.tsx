
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, Clock, Phone, ArrowRight } from 'lucide-react';
import { Hospital } from '@/hooks/use-hospitals';
import { useToast } from '@/hooks/use-toast';

interface HospitalCardDesktopProps {
  hospital: Hospital;
  userLocation: GeolocationCoordinates | null;
  requestLocationPermission: () => void;
}

const HospitalCardDesktop: React.FC<HospitalCardDesktopProps> = ({
  hospital,
  userLocation,
  requestLocationPermission,
}) => {
  const { toast } = useToast();

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4 card-hover">
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
          onClick={() => {
            if (userLocation) {
              window.open(`https://www.google.com/maps/dir/${userLocation.latitude},${userLocation.longitude}/${hospital.lat},${hospital.lng}`);
            } else {
              toast({
                title: "Location required",
                description: "Please enable location to get directions",
                variant: "destructive"
              });
              requestLocationPermission();
            }
          }}
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
  );
};

export default HospitalCardDesktop;
