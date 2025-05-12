
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHospitals } from '@/hooks/use-hospitals';
import HospitalMapSection from '@/components/hospitals/HospitalMapSection';
import HospitalList from '@/components/hospitals/HospitalList';

const NearbyPage: React.FC = () => {
  const { 
    hospitals, 
    expandedCard, 
    toggleCardExpansion, 
    userLocation, 
    requestLocationPermission, 
    isLocating 
  } = useHospitals();
  const isMobile = useIsMobile();
  
  return (
    <MainLayout title="Nearby Hospitals in Bhopal">
      <div className="max-w-lg mx-auto px-4 pb-20 pt-4">
        <HospitalMapSection 
          userLocation={userLocation}
          hospitals={hospitals}
          requestLocationPermission={requestLocationPermission}
          isLocating={isLocating}
          isMobile={isMobile}
        />
        
        <HospitalList
          hospitals={hospitals}
          expandedCard={expandedCard}
          toggleCardExpansion={toggleCardExpansion}
          userLocation={userLocation}
          requestLocationPermission={requestLocationPermission}
          isMobile={isMobile}
        />
      </div>
    </MainLayout>
  );
};

export default NearbyPage;
