import React, { useEffect, useRef } from "react";

// Import Mapbox dependencies
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Hospital and user type
export interface MapHospital {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

interface MapMiniProps {
  accessToken: string;
  userCoords?: { latitude: number; longitude: number } | null;
  hospitals: MapHospital[];
}

const MapMini: React.FC<MapMiniProps> = ({ accessToken, userCoords, hospitals }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;
    if (!accessToken) return;

    mapboxgl.accessToken = accessToken;

    // Center on user or Bhopal fallback
    const center = userCoords
      ? [userCoords.longitude, userCoords.latitude]
      : [77.4126, 23.2599]; // Bhopal default

    // Clean up prior maps before creating new
    if (map.current) {
      map.current.remove();
      map.current = null;
    }

    // Create map instance
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center,
      zoom: 12.5,
      attributionControl: false,
    });

    // Add controls
    map.current.addControl(new mapboxgl.NavigationControl({ visualizePitch: false }), "top-right");

    // Add user marker if available
    if (userCoords) {
      const userMarker = document.createElement("div");
      userMarker.style.width = "28px";
      userMarker.style.height = "28px";
      userMarker.style.background = "#0EA5E9"; // care-primary
      userMarker.style.border = "3px solid #fff";
      userMarker.style.borderRadius = "50%";
      userMarker.style.boxShadow = "0 2px 8px #0EA5E966";
      userMarker.style.display = "flex";
      userMarker.style.justifyContent = "center";
      userMarker.style.alignItems = "center";
      userMarker.title = "You are here";
      map.current.addMarker = new mapboxgl.Marker(userMarker)
        .setLngLat([userCoords.longitude, userCoords.latitude])
        .addTo(map.current);
    }

    // Add hospital markers
    for (const hosp of hospitals) {
      const hospEl = document.createElement("div");
      hospEl.style.width = "24px";
      hospEl.style.height = "24px";
      hospEl.style.background = "#F97316"; // care-accent (orange)
      hospEl.style.border = "2px solid #fff";
      hospEl.style.borderRadius = "50%";
      hospEl.style.display = "flex";
      hospEl.style.justifyContent = "center";
      hospEl.style.alignItems = "center";
      hospEl.style.boxShadow = "0 2px 6px #cbd5e166";
      hospEl.title = hosp.name;
      // Optionally add an inner dot or icon here - keep simple for now

      new mapboxgl.Marker(hospEl)
        .setLngLat([hosp.lng, hosp.lat])
        .setPopup(new mapboxgl.Popup({ offset: 16 }).setText(hosp.name))
        .addTo(map.current!);
    }

    // Responsive cleanup
    return () => {
      map.current?.remove();
    };
  }, [accessToken, userCoords, hospitals]);

  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden shadow ring-1 ring-gray-200 relative">
      <div ref={mapContainer} className="absolute inset-0" />
      {/* gradient overlay for polish */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-white/30" />
    </div>
  );
};

export default MapMini;
