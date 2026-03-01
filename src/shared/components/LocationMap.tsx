import React from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L, { LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ILocation } from '../../core/types/invitation';

// Fix for default marker icon in Leaflet + React
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore - Leaflet icon property management
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface LocationMarkerProps {
  position: ILocation | null;
  setPosition: (pos: LatLng) => void;
}

const LocationMarker: React.FC<LocationMarkerProps> = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={[position.lat, position.lng]}></Marker>
  );
};

interface LocationMapProps {
  position: ILocation | null;
  setPosition?: (pos: LatLng) => void;
  readOnly?: boolean;
}

const LocationMap: React.FC<LocationMapProps> = ({ position, setPosition, readOnly = false }) => {
  const initialPosition: [number, number] = position
    ? [position.lat, position.lng]
    : [-12.046374, -77.042793]; // Default to Lima

  return (
    <div className="location-map">
      <MapContainer
        center={initialPosition}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {!readOnly && setPosition ? (
          <LocationMarker position={position} setPosition={setPosition} />
        ) : (
          position && <Marker position={[position.lat, position.lng]}></Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default LocationMap;
