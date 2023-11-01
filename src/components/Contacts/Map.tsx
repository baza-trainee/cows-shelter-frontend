import { MapContainer, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  return (
    <div className="h-full w-full">
      <MapContainer
        id="map"
        center={[48.3302805, 28.1315992]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '560px', width: '100%', maxWidth: '100vw' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <object
          type="image/svg+xml"
          data={'/src/assets/icons/marker.svg'}
          className="absolute left-[50%] top-[50%] z-[9999] h-[4rem] w-[4rem]"
        />
      </MapContainer>
    </div>
  );
};

export default Map;
