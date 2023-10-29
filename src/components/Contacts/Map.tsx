import { Icon } from 'leaflet';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import icon from '@/assets/icons/icon_marker.png';

const Map = () => {
  const customIcon = new Icon({
    iconUrl: icon,
    iconSize: [40, 60]
  });
  return (
    <div className="h-full w-full">
      <MapContainer
        center={[48.3302805, 28.1315992]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '560px', width: '1440px', maxWidth: '100vw' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[48.3302805, 28.1315992]} icon={customIcon} />
      </MapContainer>
    </div>
  );
};

export default Map;
