import { Icon } from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  const customIcon = new Icon({
    iconUrl: '/marker-unscreen.gif',
    iconSize: [52, 48]
  });

  return (
    <div className="relative z-0 xs:h-[210px] md:h-[360px] lg:h-[560px]">
      <MapContainer
        id="map"
        center={[48.3302, 28.1315]}
        zoom={13}
        scrollWheelZoom={false}
        style={{
          width: '100%',
          height: '100%',
          maxWidth: '100vw'
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          detectRetina={true}
        />
        <Marker position={[48.33, 28.13]} icon={customIcon}></Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
