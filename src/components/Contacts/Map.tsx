import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
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
        <object
          type="image/svg+xml"
          data={'marker.svg'}
          className="absolute z-[9999] h-[4rem] w-[4rem] xs:left-[45%] xs:top-[28%] md:left-[46%] md:top-[36%] lg:left-[48%] lg:top-[41%]"
        />
        <Marker position={[48.3302, 28.1315]} opacity={0}></Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
