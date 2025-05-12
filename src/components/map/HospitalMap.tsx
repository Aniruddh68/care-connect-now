
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Hospital } from '@/hooks/use-hospitals';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

// Initial Mapbox token - might be invalid
const DEFAULT_MAPBOX_TOKEN = 'pk.eyJ1IjoiZGVtby1sb3ZhYmxlIiwiYSI6ImNsbWV3a3RxeTBieDUza3BiZWRtN3huZXcifQ.8ZfrwOBnGGO6u3IaLdSdyA';

interface HospitalMapProps {
  userLocation: GeolocationCoordinates | null;
  hospitals: Hospital[];
}

const HospitalMap: React.FC<HospitalMapProps> = ({ userLocation, hospitals }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const { toast } = useToast();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [tokenError, setTokenError] = useState(false);
  const [mapboxToken, setMapboxToken] = useState(DEFAULT_MAPBOX_TOKEN);
  const [customToken, setCustomToken] = useState("");

  const initializeMap = () => {
    if (!mapContainer.current) return;
    
    // Clear existing markers first
    if (markersRef.current.length) {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
    }
    
    // Safely remove existing map if any
    if (map.current) {
      try {
        map.current.remove();
      } catch (error) {
        console.error("Error removing map:", error);
      }
      map.current = null;
    }

    try {
      setMapLoaded(false);
      setTokenError(false);
      
      mapboxgl.accessToken = mapboxToken;
      
      const initialLocation = userLocation ? 
        [userLocation.longitude, userLocation.latitude] : 
        [77.4126, 23.2599]; // Default to Bhopal location
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: initialLocation as [number, number],
        zoom: 12
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      map.current.on('load', () => {
        setMapLoaded(true);
        updateMarkers();
      });
      
      map.current.on('error', (e) => {
        console.error('Mapbox error:', e);
        if (e.error && (e.error.message.includes('401') || e.error.message.includes('access token'))) {
          setTokenError(true);
          toast({
            title: "Invalid Mapbox Token",
            description: "Please enter your own Mapbox token below.",
            variant: "destructive"
          });
        }
      });
    } catch (error) {
      console.error("Map initialization error:", error);
      setTokenError(true);
      toast({
        title: "Map Error",
        description: "There was an error loading the map. Please try again with your own Mapbox token.",
        variant: "destructive"
      });
    }
  };

  const updateMarkers = () => {
    if (!map.current || !mapLoaded) return;
    
    try {
      // Clear existing markers
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      
      // Add user location marker if available
      if (userLocation) {
        const userEl = document.createElement('div');
        userEl.className = 'user-location-marker';
        userEl.style.width = '20px';
        userEl.style.height = '20px';
        userEl.style.borderRadius = '50%';
        userEl.style.backgroundColor = '#4B83FB';
        userEl.style.border = '3px solid #FFFFFF';
        userEl.style.boxShadow = '0 0 0 2px rgba(0,0,0,0.1)';
        
        const userMarker = new mapboxgl.Marker(userEl)
          .setLngLat([userLocation.longitude, userLocation.latitude])
          .addTo(map.current);
          
        markersRef.current.push(userMarker);
        
        // Center map on user location
        map.current.flyTo({
          center: [userLocation.longitude, userLocation.latitude],
          zoom: 13,
          speed: 1.5
        });
      }
      
      // Add hospital markers
      hospitals.forEach(hospital => {
        const el = document.createElement('div');
        el.className = 'hospital-marker';
        el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E63946" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="2" x2="6" y2="4"></line><line x1="10" y1="2" x2="10" y2="4"></line><line x1="14" y1="2" x2="14" y2="4"></line></svg>`;
        
        const popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(
            `<div class="p-2">
              <h3 class="font-bold text-sm">${hospital.name}</h3>
              <p class="text-xs text-gray-600">${hospital.address}</p>
              <p class="text-xs mt-1">
                <span class="font-semibold">${hospital.availableDoctors}</span> doctors available
              </p>
            </div>`
          );
        
        const marker = new mapboxgl.Marker(el)
          .setLngLat([hospital.lng, hospital.lat])
          .setPopup(popup)
          .addTo(map.current);
          
        markersRef.current.push(marker);
      });
    } catch (error) {
      console.error("Error updating markers:", error);
    }
  };

  // Initialize map when component mounts or token changes
  useEffect(() => {
    initializeMap();
    
    // Cleanup function that doesn't try to remove map
    // This avoids the "indoor" property error
    return () => {
      if (markersRef.current.length) {
        markersRef.current.forEach(marker => {
          try {
            marker.remove();
          } catch (e) {
            console.error("Error removing marker:", e);
          }
        });
      }
      // We don't call map.current.remove() here to avoid the error
    };
  }, [mapboxToken]);

  // Update markers when user location or hospitals change
  useEffect(() => {
    updateMarkers();
  }, [userLocation, hospitals, mapLoaded]);

  const handleSubmitToken = () => {
    if (customToken && customToken.trim() !== '') {
      setMapboxToken(customToken.trim());
      toast({
        title: "Token Updated",
        description: "Applying your Mapbox token now."
      });
    } else {
      toast({
        title: "Invalid Token",
        description: "Please enter a valid Mapbox token",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Loading indicator */}
      {!mapLoaded && !tokenError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-care-primary"></div>
        </div>
      )}
      
      {/* Token error UI */}
      {tokenError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 p-4">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex items-center mb-4 text-red-600">
              <AlertCircle className="h-5 w-5 mr-2" />
              <h3 className="font-bold">Mapbox Token Required</h3>
            </div>
            
            <p className="text-sm mb-4">
              To use the map feature, you need to provide your own Mapbox token. 
              Visit <a href="https://account.mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-care-primary underline">
                mapbox.com
              </a> and get your public token from the dashboard.
            </p>
            
            <div className="space-y-3">
              <Input
                placeholder="Enter your Mapbox token here"
                value={customToken}
                onChange={(e) => setCustomToken(e.target.value)}
                className="w-full"
              />
              
              <Button 
                onClick={handleSubmitToken} 
                className="w-full bg-care-primary hover:bg-care-primary/90"
              >
                Apply Token
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalMap;
