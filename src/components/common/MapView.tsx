'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { type Destination } from '@/data/destinations';

// Fix default marker icon broken by webpack
const markerIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface MapViewProps {
  destination: Pick<Destination, 'name' | 'country' | 'coordinates'>;
}

export function MapView({ destination }: MapViewProps) {
  const { lat, lng } = destination.coordinates;
  console.log('DESTINATION >>>',destination);

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={11}
      className="w-full h-120 md:h-96 rounded-xl z-0"
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]} icon={markerIcon}>
        <Popup>
          <span className="font-medium">{destination.name}</span>
          <br />
          {destination.country}
        </Popup>
      </Marker>
    </MapContainer>
  );
}
