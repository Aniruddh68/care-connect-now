import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from '@/context/LocationContext';
import { Hospital as HospitalType } from '@/types/hospital';

export type Hospital = {
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
};

// Mock data with accurate latitude and longitude
const mockHospitals: Hospital[] = [
  {
    id: '2',
    name: 'AIIMS Bhopal',
    address: 'Saket Nagar, Bhopal',
    distance: '0.8 miles',
    availableDoctors: 3,
    phone: '(0755) 987-6543',
    open: true,
    hours: 'Open 24 hours',
    lat: 23.210628,
    lng: 77.457449
  },
  {
    id: '1',
    name: 'Bhopal Medical Center',
    address: '123 M.P. Nagar, Bhopal',
    distance: '1.2 miles',
    availableDoctors: 5,
    phone: '(0755) 123-4567',
    open: true,
    hours: 'Open 24 hours',
    lat: 23.259933,
    lng: 77.412613
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
    lat: 23.1998,
    lng: 77.4416
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
    lat: 23.302444,
    lng: 77.398321
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
    lat: 23.2166,
    lng: 77.4385
  },
  {
    id: '6',
    name: 'Hamidia Hospital',
    address: 'Royal Market, Hamidia Road, Bhopal',
    distance: '3.2 miles',
    availableDoctors: 10,
    phone: '(0755) 222-3344',
    open: true,
    hours: 'Open 24 hours',
    lat: 23.259779,
    lng: 77.392317
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
    lat: 23.1994, 
    lng: 77.4197
  },
  {
    id: '5',
    name: 'MIMS Hospital',
    address: 'Near RGPV Campus, Airport Road, Bhopal',
    distance: '4.5 miles',
    availableDoctors: 7,
    phone: '(0755) 345-6789',
    open: true,
    hours: 'Open 24 hours',
    lat: 23.2870,
    lng: 77.4120
  },
  {
    id: '15',
    name: 'Jawaharlal Nehru Cancer Hospital',
    address: 'Idgah Hills, Bhopal',
    distance: '5.1 miles',
    availableDoctors: 6,
    phone: '(0755) 555-6677',
    open: true,
    hours: '8:00 AM - 9:00 PM',
    lat: 23.273298,
    lng: 77.380603
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
    lat: 23.1783,
    lng: 77.4289
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
    lat: 23.2683,
    lng: 77.3072
  }
];

export const useHospitals = () => {
  const { toast } = useToast();
  const { userLocation, requestLocationPermission, isLocating } = useLocation();
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  
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
  
  const toggleCardExpansion = (id: string) => {
    setExpandedCard(currentId => currentId === id ? null : id);
  };

  return {
    hospitals,
    expandedCard,
    toggleCardExpansion,
    userLocation,
    requestLocationPermission,
    isLocating,
  };
};
