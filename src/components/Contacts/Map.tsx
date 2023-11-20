import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  return (
    <div className="h-full w-full">
      <MapContainer
        id="map"
        center={[48.3302805, 28.1315992]}
        zoom={13}
        scrollWheelZoom={false}
        style={{
          width: '100%',
          maxWidth: '100vw'
        }}
        className="xs:h-[210px] md:h-[360px] lg:h-[560px]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <object
          type="image/svg+xml"
          data={'marker.svg'}
          className="absolute z-[9999] h-[4rem] w-[4rem] xs:left-[45%] xs:top-[28%] md:left-[46%] md:top-[36%] lg:left-[48%] lg:top-[41%]"
        />
      </MapContainer>
    </div>
  );
};

export default Map;
