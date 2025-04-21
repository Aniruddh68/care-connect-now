import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { MapPinIcon, Clock, Phone, ArrowRight, Navigation, RefreshCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLocation } from '@/context/LocationContext';
import { useToast } from '@/hooks/use-toast';
import MapMini, { MapHospital } from '@/components/MapMini';

interface Hospital {
  id: string;
  name: string;
  address: string;
  distance: string;
  availableDoctors: number;
  phone: string;
  open: boolean;
  hours: string;
  lat: number;
  lng: number;
}

// Mock data with latitude and longitude
const mockHospitals: Hospital[] = [
  {
    id: '1',
    name: 'Bhopal Medical Center',
    address: '123 M.P. Nagar, Bhopal',
    distance: '1.2 miles',
    availableDoctors: 5,
    phone: '(0755) 123-4567',
    open: true,
    hours: 'Open 24 hours',
    lat: 23.2599,
    lng: 77.4126
  },
  {
    id: '2',
    name: 'AIIMS Bhopal',
    address: 'Saket Nagar, Bhopal',
    distance: '0.8 miles',
    availableDoctors: 3,
    phone: '(0755) 987-6543',
    open: true,
    hours: 'Open 24 hours',
    lat: 23.2067,
    lng: 77.4589
  },
  {
    id: '3',
    name: 'Bhopal University Hospital',
    address: '789 New Market, Bhopal',
    distance: '3.1 miles',
    availableDoctors: 8,
    phone: '(0755) 456-7890',
    open: true,
    hours: 'Open 24 hours',
    lat: 23.2332,
    lng: 77.4029
  },
  {
    id: '4',
    name: 'Bhopal Children\'s Hospital',
    address: '234 TT Nagar, Bhopal',
    distance: '2.4 miles',
    availableDoctors: 4,
    phone: '(0755) 234-5678',
    open: true,
    hours: 'Open 24 hours',
    lat: 23.2431,
    lng: 77.4347
  }
];

const NearbyPage: React.FC = () => {
  const { toast } = useToast();
  const { userLocation, requestLocationPermission, isLocating } = useLocation();
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [tokenTouched, setTokenTouched] = useState(false);

  // Calculate distance between two coordinates in km
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c;
    return distance.toFixed(1);
  };

  // Update hospitals with calculated distances when location changes
  useEffect(() => {
    if (userLocation) {
      const hospitalsWithDistance = mockHospitals.map(hospital => {
        const distanceKm = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          hospital.lat,
          hospital.lng
        );
        return {
          ...hospital,
          distance: `${distanceKm} km`
        };
      });
      
      // Sort by actual distance
      const sortedHospitals = [...hospitalsWithDistance].sort((a, b) => {
        const distanceA = parseFloat(a.distance.split(' ')[0]);
        const distanceB = parseFloat(b.distance.split(' ')[0]);
        return distanceA - distanceB;
      });
      
      setHospitals(sortedHospitals);
      
      toast({
        title: "Hospitals updated",
        description: `Found ${sortedHospitals.length} nearby hospitals in Bhopal`,
      });
    } else {
      // If no location, use the mock data with default sorting
      const sortedHospitals = [...mockHospitals].sort((a, b) => {
        const distanceA = parseFloat(a.distance.split(' ')[0]);
        const distanceB = parseFloat(b.distance.split(' ')[0]);
        return distanceA - distanceB;
      });
      setHospitals(sortedHospitals);
    }
  }, [userLocation, toast]);

  // Prepare hospital points for the map
  const mapHospitals: MapHospital[] = hospitals.map(({ id, name, lat, lng }) => ({
    id,
    name,
    lat,
    lng,
  }));

  return (
    <MainLayout title="Nearby Hospitals in Bhopal">
      <div className="max-w-lg mx-auto px-4 pb-20 pt-4">
        <div className="mb-6 space-y-2">
          {/* ----------- New Map & Token Section ----------- */}
          <div className="aspect-video bg-gray-200 rounded-xl mb-4 flex flex-col items-center justify-center relative w-full">
            {mapboxToken ? (
              <MapMini
                accessToken={mapboxToken}
                userCoords={
                  userLocation
                    ? { latitude: userLocation.latitude, longitude: userLocation.longitude }
                    : null
                }
                hospitals={mapHospitals}
              />
            ) : (
              <div className="w-full h-full flex flex-col justify-center items-center px-4">
                <p className="text-care-muted mb-2 text-sm text-center">
                  To view the map, paste your Mapbox Public Access Token below.{' '}
                  <span className="font-semibold underline decoration-dotted break-all">
                    (Find it at{' '}
                    <a href="https://account.mapbox.com/access-tokens/" target="_blank" className="text-care-primary underline">
                      mapbox.com
                    </a>
                    )
                  </span>
                </p>
                <input
                  type="text"
                  placeholder="Mapbox Public Token (pk. ...)"
                  value={mapboxToken}
                  onChange={e => { setMapboxToken(e.target.value); setTokenTouched(true); }}
                  className="w-full max-w-md px-3 py-2 mb-2 border rounded-lg text-sm focus:ring-2 focus:ring-care-primary"
                  autoFocus={!mapboxToken && !tokenTouched}
                />
                {tokenTouched && !mapboxToken && (
                  <p className="text-xs text-care-error">Please enter your Mapbox public token to load the map.</p>
                )}
              </div>
            )}
            <div className="absolute top-2 right-2 flex gap-2">
              {userLocation && (
                <span className="inline-flex items-center text-xs bg-white/90 px-2 py-1 rounded-md shadow text-care-primary font-semibold">
                  <Navigation className="h-3 w-3 mr-1" /> You
                </span>
              )}
            </div>
          </div>

          <div className="text-care-muted flex flex-col items-center">
            {userLocation ? (
              <>
                <p>
                  Your location: {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
                </p>
                <button
                  onClick={requestLocationPermission}
                  className="mt-2 flex items-center text-care-primary text-sm"
                >
                  <RefreshCcw className="h-3 w-3 mr-1" />
                  Update location
                </button>
              </>
            ) : (
              <>
                <p>Enable your location to get hospital distances</p>
                <button
                  onClick={requestLocationPermission}
                  className="mt-3 px-4 py-2 bg-care-primary text-white rounded-lg flex items-center"
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
              </>
            )}
          </div>
          <p className="text-care-muted text-sm mb-1">
            {userLocation 
              ? "Showing hospitals near your current location" 
              : "Showing hospitals near default location in Bhopal"}
          </p>
          <button 
            onClick={requestLocationPermission} 
            className="text-care-primary text-sm font-medium"
            disabled={isLocating}
          >
            {isLocating ? "Locating..." : "Update location"}
          </button>
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-care-dark mb-4">
            Nearby Hospitals in Bhopal ({hospitals.length})
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
                  onClick={() => {
                    if (userLocation) {
                      // This would use real map navigation in a production app
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
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default NearbyPage;
