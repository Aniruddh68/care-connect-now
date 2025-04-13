
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface LocationContextType {
  userLocation: GeolocationCoordinates | null;
  isLocating: boolean;
  locationError: string | null;
  requestLocationPermission: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userLocation, setUserLocation] = useState<GeolocationCoordinates | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSuccess = (position: GeolocationPosition) => {
    setUserLocation(position.coords);
    setIsLocating(false);
    setLocationError(null);
    toast({
      title: "Location updated",
      description: "Your current location has been updated.",
    });
  };

  const handleError = (error: GeolocationPositionError) => {
    setIsLocating(false);
    let errorMessage = "Unable to retrieve your location";
    
    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorMessage = "Location permission denied. Please enable location services in your browser settings.";
        break;
      case error.POSITION_UNAVAILABLE:
        errorMessage = "Location information is unavailable.";
        break;
      case error.TIMEOUT:
        errorMessage = "The request to get your location timed out.";
        break;
    }
    
    setLocationError(errorMessage);
    toast({
      title: "Location error",
      description: errorMessage,
      variant: "destructive",
    });
  };

  const requestLocationPermission = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      toast({
        title: "Not supported",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      });
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });
  };

  return (
    <LocationContext.Provider
      value={{
        userLocation,
        isLocating,
        locationError,
        requestLocationPermission
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
