import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import { mockVessels, mockRoutes, mockPorts, mockWeatherData } from '../mockData';
import { Layers, Wind, Droplets, Thermometer } from 'lucide-react';

// Custom control component for map layers
const MapControls: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<string>('standard');
  const map = useMap();

  const handleLayerChange = (layer: string) => {
    setActiveLayer(layer);
    // In a real app, you would change the map layer here
    console.log(`Changing to ${layer} layer`);
  };

  return (
    <div className="absolute top-2 right-2 z-[1000] bg-white rounded-md shadow-md p-2">
      <div className="flex flex-col space-y-2">
        <button 
          className={`p-2 rounded-md ${activeLayer === 'standard' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          onClick={() => handleLayerChange('standard')}
          title="Standard Map"
        >
          <Layers size={20} />
        </button>
        <button 
          className={`p-2 rounded-md ${activeLayer === 'weather' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          onClick={() => handleLayerChange('weather')}
          title="Weather Layer"
        >
          <Wind size={20} />
        </button>
        <button 
          className={`p-2 rounded-md ${activeLayer === 'ocean' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          onClick={() => handleLayerChange('ocean')}
          title="Ocean Currents"
        >
          <Droplets size={20} />
        </button>
        <button 
          className={`p-2 rounded-md ${activeLayer === 'temperature' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          onClick={() => handleLayerChange('temperature')}
          title="Sea Temperature"
        >
          <Thermometer size={20} />
        </button>
      </div>
    </div>
  );
};

const MapView: React.FC = () => {
  const [selectedVessel, setSelectedVessel] = useState<string | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  // Create custom ship icon
  const shipIcon = new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3410/3410476.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });

  // Create custom port icon
  const portIcon = new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2271/2271068.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });

  // Find the selected route
  const route = mockRoutes.find(r => r.id === (selectedRoute || mockRoutes[0].id));
  
  // Create route line
  const routePositions: LatLngExpression[] = route 
    ? route.waypoints.map(wp => [wp.lat, wp.lng] as LatLngExpression)
    : [];

  return (
    <div className="h-[calc(100vh-4rem)] w-full relative">
      <MapContainer 
        center={[20, 0]} 
        zoom={3} 
        style={{ height: '100%', width: '100%' }}
        attributionControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Add vessels to map */}
        {mockVessels.map(vessel => (
          <Marker 
            key={vessel.id}
            position={[vessel.position.lat, vessel.position.lng]}
            icon={shipIcon}
            eventHandlers={{
              click: () => {
                setSelectedVessel(vessel.id);
                const route = mockRoutes.find(r => r.vesselId === vessel.id);
                if (route) setSelectedRoute(route.id);
              }
            }}
          >
            <Popup>
              <div className="p-1">
                <h3 className="font-bold text-lg">{vessel.name}</h3>
                <p className="text-sm">Type: {vessel.type}</p>
                <p className="text-sm">IMO: {vessel.imo}</p>
                <p className="text-sm">Destination: {vessel.destination}</p>
                <p className="text-sm">ETA: {vessel.eta}</p>
                <p className="text-sm">Speed: {vessel.speed} knots</p>
                <button 
                  className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  onClick={() => {
                    const route = mockRoutes.find(r => r.vesselId === vessel.id);
                    if (route) setSelectedRoute(route.id);
                  }}
                >
                  View Route
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Add ports to map */}
        {mockPorts.map(port => (
          <Marker 
            key={port.id}
            position={[port.position.lat, port.position.lng]}
            icon={portIcon}
          >
            <Popup>
              <div className="p-1">
                <h3 className="font-bold">{port.name}</h3>
                <p className="text-sm">Country: {port.country}</p>
                <p className="text-sm">UNLOCODE: {port.unlocode}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Display route if selected */}
        {route && (
          <Polyline 
            positions={routePositions}
            color="#3b82f6"
            weight={4}
            opacity={0.7}
            dashArray="10, 10"
          />
        )}

        {/* Add weather data markers */}
        {mockWeatherData.map((weather, index) => (
          <Marker 
            key={index}
            position={[weather.position.lat, weather.position.lng]}
            icon={new Icon({
              iconUrl: 'https://cdn-icons-png.flaticon.com/512/1779/1779940.png',
              iconSize: [24, 24],
              iconAnchor: [12, 12],
              popupAnchor: [0, -12]
            })}
          >
            <Popup>
              <div className="p-1">
                <h3 className="font-bold">Weather Conditions</h3>
                <p className="text-sm">Wind: {weather.windSpeed} knots, {weather.windDirection}°</p>
                <p className="text-sm">Wave Height: {weather.waveHeight} m</p>
                <p className="text-sm">Temperature: {weather.temperature}°C</p>
                <p className="text-sm">Visibility: {weather.visibility} km</p>
                <p className="text-sm">Pressure: {weather.pressure} hPa</p>
                <p className="text-sm text-gray-500">Updated: {new Date(weather.timestamp).toLocaleString()}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Map Controls */}
        <MapControls />
      </MapContainer>

      {/* Route Information Panel */}
      {route && (
        <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white rounded-lg shadow-lg p-4 z-[1000] max-h-[40vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-lg">Route Details</h3>
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedRoute(null)}
            >
              ×
            </button>
          </div>
          <div className="space-y-2">
            <div>
              <p className="text-sm font-semibold">Vessel</p>
              <p className="text-sm">{mockVessels.find(v => v.id === route.vesselId)?.name}</p>
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <p className="text-sm font-semibold">Origin</p>
                <p className="text-sm">{route.origin.name}</p>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">Destination</p>
                <p className="text-sm">{route.destination.name}</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <p className="text-sm font-semibold">Distance</p>
                <p className="text-sm">{route.distance} nm</p>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">Duration</p>
                <p className="text-sm">{Math.floor(route.duration / 24)}d {route.duration % 24}h</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <p className="text-sm font-semibold">Fuel Consumption</p>
                <p className="text-sm">{route.fuelConsumption} tons</p>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">CO2 Emission</p>
                <p className="text-sm">{route.co2Emission} tons</p>
              </div>
            </div>
            <div className="mt-2">
              <button className="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
                Optimize Route
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;