
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { MapPinIcon, Clock, Phone, ArrowRight, Navigation, RefreshCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLocation } from '@/context/LocationContext';
import { useToast } from '@/hooks/use-toast';
import HospitalMap from '@/components/map/HospitalMap';

export interface Hospital {
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
  },
  // Adding MIMS Hospital near RGPV
  {
    id: '5',
    name: 'MIMS Hospital',
    address: 'Near RGPV Campus, Airport Road, Bhopal',
    distance: '4.5 miles',
    availableDoctors: 7,
    phone: '(0755) 345-6789',
    open: true,
    hours: 'Open 24 hours',
    lat: 23.2461,
    lng: 77.4846
  },
  // Adding 9 more hospitals across Bhopal
  {
    id: '6',
    name: 'Hamidia Hospital',
    address: 'Royal Market, Hamidia Road, Bhopal',
    distance: '3.2 miles',
    availableDoctors: 10,
    phone: '(0755) 222-3344',
    open: true,
    hours: 'Open 24 hours',
    lat: 23.2599,
    lng: 77.3966
  },
  {
    id: '7',
    name: 'Jawaharlal Nehru Hospital',
    address: 'Kolar Road, Bhopal',
    distance: '5.1 miles',
    availableDoctors: 6,
    phone: '(0755) 555-6677',
    open: true,
    hours: '8:00 AM - 9:00 PM',
    lat: 23.1625,
    lng: 77.4245
  },
  {
    id: '8',
    name: 'Chirayu Medical College & Hospital',
    address: 'Bairagarh, Bhopal',
    distance: '7.2 miles',
    availableDoctors: 12,
    phone: '(0755) 777-8899',
    open: true,
    hours: 'Open 24 hours',
    lat: 23.2861,
    lng: 77.3224
  },
  {
    id: '9',
    name: 'L.N. Medical College & Hospital',
    address: 'Kolar Road, Bhopal',
    distance: '6.3 miles',
    availableDoctors: 8,
    phone: '(0755) 999-0011',
    open: true,
    hours: 'Open 24 hours',
    lat: 23.1753,
    lng: 77.4325
  },
  {
    id: '10',
    name: 'Bhopal Care Hospital',
    address: 'MP Nagar Zone II, Bhopal',
    distance: '2.1 miles',
    availableDoctors: 5,
    phone: '(0755) 444-5566',
    open: true,
    hours: '9:00 AM - 9:00 PM',
    lat: 23.2312,
    lng: 77.4356
  },
  {
    id: '11',
    name: 'People\'s General Hospital',
    address: 'Shahpura, Bhopal',
    distance: '3.4 miles',
    availableDoctors: 6,
    phone: '(0755) 666-7788',
    open: true,
    hours: 'Open 24 hours',
    lat: 23.2131,
    lng: 77.4554
  },
  {
    id: '12',
    name: 'Bansal Hospital',
    address: 'C-Sector, Shahpura, Bhopal',
    distance: '4.2 miles',
    availableDoctors: 9,
    phone: '(0755) 888-9900',
    open: true,
    hours: 'Open 24 hours',
    lat: 23.2023,
    lng: 77.4583
  },
  {
    id: '13',
    name: 'Narmada Hospital',
    address: 'Habibganj, Bhopal',
    distance: '2.9 miles',
    availableDoctors: 4,
    phone: '(0755) 111-2233',
    open: true,
    hours: '8:00 AM - 8:00 PM',
    lat: 23.2336,
    lng: 77.4294
  },
  {
    id: '14',
    name: 'Noble Multispeciality Hospital',
    address: 'Misrod, Bhopal',
    distance: '5.7 miles',
    availableDoctors: 7,
    phone: '(0755) 333-4455',
    open: true,
    hours: 'Open 24 hours',
    lat: 23.1862,
    lng: 77.4732
  }
];

const NearbyPage: React.FC = () => {
  const { toast } = useToast();
  const { userLocation, requestLocationPermission, isLocating } = useLocation();
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  
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
  
  return (
    <MainLayout title="Nearby Hospitals in Bhopal">
      <div className="max-w-lg mx-auto px-4 pb-20 pt-4">
        <div className="mb-6">
          <div className="aspect-video bg-gray-200 rounded-xl mb-4 relative overflow-hidden">
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
