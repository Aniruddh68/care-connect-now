
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, Clock, Phone, ArrowRight, Navigation } from 'lucide-react';
import { Hospital } from '@/hooks/use-hospitals';
import { useToast } from '@/hooks/use-toast';

interface HospitalCardMobileProps {
  hospital: Hospital;
  isExpanded: boolean;
  toggleExpansion: (id: string) => void;
  userLocation: GeolocationCoordinates | null;
  requestLocationPermission: () => void;
}

const HospitalCardMobile: React.FC<HospitalCardMobileProps> = ({
  hospital,
  isExpanded,
  toggleExpansion,
  userLocation,
  requestLocationPermission,
}) => {
  const { toast } = useToast();

  return (
    <div 
      className={`bg-white rounded-xl shadow p-3 card-hover transition-all ${
        isExpanded ? 'ring-2 ring-care-primary' : ''
      }`}
    >
      <div 
        className="flex justify-between items-start cursor-pointer"
        onClick={() => toggleExpansion(hospital.id)}
      >
        <div>
          <h3 className="font-bold">{hospital.name}</h3>
          <div className="flex items-center text-xs text-care-muted mt-0.5">
            <MapPinIcon className="h-3 w-3 mr-1 flex-shrink-0" />
            <span className="truncate">{hospital.address}</span>
          </div>
        </div>
        <span className="bg-gray-100 text-care-dark text-xs font-medium px-2 py-1 rounded-full">
          {hospital.distance}
        </span>
      </div>
      
      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-gray-100 space-y-3 animate-fade-in">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-care-muted" />
              {hospital.open ? (
                <span className="text-care-success">{hospital.hours}</span>
              ) : (
                <span className="text-care-error">Closed now</span>
              )}
            </div>
            <span className="text-care-primary font-medium">
              {hospital.availableDoctors} doctors
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
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
              className="flex-1 primary-button py-2 flex items-center justify-center text-sm"
            >
              <Navigation className="mr-1 h-4 w-4" />
              Directions
            </button>
            <a 
              href={`tel:${hospital.phone}`}
              className="flex-1 secondary-button py-2 flex items-center justify-center text-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <Phone className="mr-1 h-4 w-4" />
              Call
            </a>
          </div>
          
          <Link 
            to={`/find?hospital=${hospital.id}`}
            className="w-full py-2 flex justify-center items-center bg-gray-100 text-care-dark rounded-lg text-sm"
            onClick={(e) => e.stopPropagation()}
          >
            View Available Doctors
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default HospitalCardMobile;
