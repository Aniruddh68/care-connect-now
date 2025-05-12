
import React from 'react';
import { Hospital } from '@/hooks/use-hospitals';
import HospitalCardMobile from './HospitalCardMobile';
import HospitalCardDesktop from './HospitalCardDesktop';

interface HospitalListProps {
  hospitals: Hospital[];
  expandedCard: string | null;
  toggleCardExpansion: (id: string) => void;
  userLocation: GeolocationCoordinates | null;
  requestLocationPermission: () => void;
  isMobile: boolean;
}

const HospitalList: React.FC<HospitalListProps> = ({
  hospitals,
  expandedCard,
  toggleCardExpansion,
  userLocation,
  requestLocationPermission,
  isMobile,
}) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-care-dark mb-4">
        Nearby Hospitals in Bhopal ({hospitals.length})
      </h2>
      
      {isMobile ? (
        <div className="space-y-3">
          {hospitals.map(hospital => (
            <HospitalCardMobile
              key={hospital.id}
              hospital={hospital}
              isExpanded={expandedCard === hospital.id}
              toggleExpansion={toggleCardExpansion}
              userLocation={userLocation}
              requestLocationPermission={requestLocationPermission}
            />
          ))}
        </div>
      ) : (
        <div>
          {hospitals.map(hospital => (
            <HospitalCardDesktop
              key={hospital.id}
              hospital={hospital}
              userLocation={userLocation}
              requestLocationPermission={requestLocationPermission}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HospitalList;
