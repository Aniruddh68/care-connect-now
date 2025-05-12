
import React from 'react';
import { MapPinIcon, RefreshCcw } from 'lucide-react';
import HospitalMap from '@/components/map/HospitalMap';
import { Hospital } from '@/hooks/use-hospitals';

interface HospitalMapSectionProps {
  userLocation: GeolocationCoordinates | null;
  hospitals: Hospital[];
  requestLocationPermission: () => void;
  isLocating: boolean;
  isMobile: boolean;
}

const HospitalMapSection: React.FC<HospitalMapSectionProps> = ({
  userLocation,
  hospitals,
  requestLocationPermission,
  isLocating,
  isMobile,
}) => {
  return (
    <div className="mb-6">
      <div className={`${isMobile ? 'h-64' : 'aspect-video'} bg-gray-200 rounded-xl mb-4 relative overflow-hidden`}>
        <HospitalMap userLocation={userLocation} hospitals={hospitals} />
        
        {!userLocation && (
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
            <p className="mb-3">Enable location to see nearby hospitals</p>
            <button 
              onClick={requestLocationPermission}
              className="px-4 py-2 bg-care-primary text-white rounded-lg flex items-center"
              disabled={isLocating}
            >
              {isLocating ? (
                <>
                  <div className="h-4 w-4 mr-2 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                  Locating...
                </>
              ) : (
                <>
                  <MapPinIcon className="h-4 w-4 mr-2" />
                  Enable Location
                </>
              )}
            </button>
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-between">
        <p className="text-care-muted text-sm">
          {userLocation 
            ? "Showing hospitals near your current location" 
            : "Showing hospitals near default location in Bhopal"}
        </p>
        <button 
          onClick={requestLocationPermission} 
          className="text-care-primary text-sm font-medium flex items-center gap-1"
          disabled={isLocating}
        >
          {isLocating ? (
            <>
              <div className="h-3 w-3 rounded-full border-2 border-care-primary border-t-transparent animate-spin"></div>
              <span>Locating...</span>
            </>
          ) : (
            <>
              <RefreshCcw className="h-3 w-3" />
              <span>Update</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default HospitalMapSection;
