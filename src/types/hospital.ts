
export interface Hospital {
  id: string;
  name: string;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
  distance?: number;
  specialties: string[];
  openingHours: string;
  imageUrl: string;
  rating: number;
  facilities: string[];
  isOpen: boolean;
  emergencyServices: boolean;
  cardExpanded?: boolean;
}
