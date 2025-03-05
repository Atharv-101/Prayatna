export interface Vessel {
  id: string;
  name: string;
  type: string;
  imo: string;
  mmsi: string;
  callSign: string;
  flag: string;
  position: {
    lat: number;
    lng: number;
  };
  speed: number;
  heading: number;
  destination: string;
  eta: string;
  status: string;
}

export interface WeatherData {
  position: {
    lat: number;
    lng: number;
  };
  windSpeed: number;
  windDirection: number;
  waveHeight: number;
  temperature: number;
  visibility: number;
  precipitation: number;
  pressure: number;
  timestamp: string;
}

export interface RoutePoint {
  lat: number;
  lng: number;
  timestamp: string;
  weather?: WeatherData;
}

export interface Route {
  id: string;
  vesselId: string;
  origin: {
    name: string;
    position: {
      lat: number;
      lng: number;
    }
  };
  destination: {
    name: string;
    position: {
      lat: number;
      lng: number;
    }
  };
  waypoints: RoutePoint[];
  distance: number;
  duration: number;
  fuelConsumption: number;
  co2Emission: number;
  status: 'planned' | 'active' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface Port {
  id: string;
  name: string;
  country: string;
  position: {
    lat: number;
    lng: number;
  };
  unlocode: string;
}

export interface Alert {
  id: string;
  type: 'weather' | 'traffic' | 'security' | 'technical';
  severity: 'low' | 'medium' | 'high';
  message: string;
  position?: {
    lat: number;
    lng: number;
  };
  timestamp: string;
  acknowledged: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'operator' | 'captain';
  company: string;
}