import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Hospital } from '@/hooks/use-hospitals';
import { useToast } from '@/hooks/use-toast';

// Fix for default marker icons in Leaflet with Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface HospitalMapProps {
  userLocation: GeolocationCoordinates | null;
  hospitals: Hospital[];
}

// Component to handle map center updates
const MapUpdater: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

const HospitalMap: React.FC<HospitalMapProps> = ({ userLocation, hospitals }) => {
  const { toast } = useToast();
  const mapRef = useRef<L.Map>(null);

  // Default center (Bhopal)
  const defaultCenter: [number, number] = [23.2599, 77.4126];
  const center = userLocation 
    ? [userLocation.latitude, userLocation.longitude] as [number, number]
    : defaultCenter;

  return (
    <div className="w-full h-full rounded-xl overflow-hidden">
      <MapContainer
        center={center}
        zoom={13}
        style={{ width: '100%', height: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Update map center when user location changes */}
        <MapUpdater center={center} />
        
        {/* User location marker */}
        {userLocation && (
          <>
            <Circle
              center={[userLocation.latitude, userLocation.longitude]}
              radius={500}
              pathOptions={{ color: '#4B83FB', fillColor: '#4B83FB', fillOpacity: 0.2 }}
            />
            <Marker position={[userLocation.latitude, userLocation.longitude]}>
              <Popup>Your location</Popup>
            </Marker>
          </>
        )}
        
        {/* Hospital markers */}
        {hospitals.map((hospital) => (
          <Marker
            key={hospital.id}
            position={[hospital.lat, hospital.lng]}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-sm">{hospital.name}</h3>
                <p className="text-xs text-gray-600">{hospital.address}</p>
                <p className="text-xs mt-1">
                  <span className="font-semibold">{hospital.availableDoctors}</span> doctors available
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default HospitalMap;