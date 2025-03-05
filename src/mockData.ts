import { Vessel, Route, Port, WeatherData, Alert } from './types';

export const mockVessels: Vessel[] = [
  {
    id: '1',
    name: 'FLOATEL RELIANCE',
    type: 'Cargo',
    imo: '9123456',
    mmsi: '123456789',
    callSign: 'ABCD',
    flag: 'Panama',
    position: {
      lat: 28.4,
      lng: -16.3
    },
    speed: 14.5,
    heading: 270,
    destination: 'SANTA CRUZ TENERIFE',
    eta: '2025-04-17 15:00 (UTC)',
    status: 'Underway'
  },
  {
    id: '2',
    name: 'MAERSK SELETAR',
    type: 'Container Ship',
    imo: '9234567',
    mmsi: '234567890',
    callSign: 'EFGH',
    flag: 'Denmark',
    position: {
      lat: 35.6,
      lng: -10.2
    },
    speed: 18.2,
    heading: 90,
    destination: 'ROTTERDAM',
    eta: '2025-04-20 08:30 (UTC)',
    status: 'Underway'
  },
  {
    id: '3',
    name: 'EVER GIVEN',
    type: 'Container Ship',
    imo: '9811000',
    mmsi: '353136000',
    callSign: 'H3RC',
    flag: 'Panama',
    position: {
      lat: 31.2,
      lng: 32.3
    },
    speed: 12.8,
    heading: 180,
    destination: 'SINGAPORE',
    eta: '2025-04-25 14:15 (UTC)',
    status: 'Underway'
  }
];

export const mockPorts: Port[] = [
  {
    id: '1',
    name: 'Rotterdam',
    country: 'Netherlands',
    position: {
      lat: 51.9,
      lng: 4.5
    },
    unlocode: 'NLRTM'
  },
  {
    id: '2',
    name: 'Singapore',
    country: 'Singapore',
    position: {
      lat: 1.3,
      lng: 103.8
    },
    unlocode: 'SGSIN'
  },
  {
    id: '3',
    name: 'Shanghai',
    country: 'China',
    position: {
      lat: 31.2,
      lng: 121.5
    },
    unlocode: 'CNSHA'
  },
  {
    id: '4',
    name: 'Santa Cruz de Tenerife',
    country: 'Spain',
    position: {
      lat: 28.4,
      lng: -16.3
    },
    unlocode: 'ESSCT'
  }
];

export const mockWeatherData: WeatherData[] = [
  {
    position: {
      lat: 35.6,
      lng: -10.2
    },
    windSpeed: 15,
    windDirection: 270,
    waveHeight: 2.5,
    temperature: 18,
    visibility: 10,
    precipitation: 0,
    pressure: 1013,
    timestamp: '2025-04-15T12:00:00Z'
  },
  {
    position: {
      lat: 31.2,
      lng: 32.3
    },
    windSpeed: 8,
    windDirection: 180,
    waveHeight: 1.2,
    temperature: 24,
    visibility: 15,
    precipitation: 0,
    pressure: 1015,
    timestamp: '2025-04-15T12:00:00Z'
  },
  {
    position: {
      lat: 28.4,
      lng: -16.3
    },
    windSpeed: 12,
    windDirection: 90,
    waveHeight: 1.8,
    temperature: 22,
    visibility: 12,
    precipitation: 0,
    pressure: 1010,
    timestamp: '2025-04-15T12:00:00Z'
  }
];

export const mockRoutes: Route[] = [
  {
    id: '1',
    vesselId: '1',
    origin: {
      name: 'Rotterdam',
      position: {
        lat: 51.9,
        lng: 4.5
      }
    },
    destination: {
      name: 'Santa Cruz de Tenerife',
      position: {
        lat: 28.4,
        lng: -16.3
      }
    },
    waypoints: [
      {
        lat: 51.9,
        lng: 4.5,
        timestamp: '2025-04-10T08:00:00Z'
      },
      {
        lat: 50.1,
        lng: 1.8,
        timestamp: '2025-04-11T10:30:00Z'
      },
      {
        lat: 48.5,
        lng: -1.2,
        timestamp: '2025-04-12T14:15:00Z'
      },
      {
        lat: 43.4,
        lng: -8.4,
        timestamp: '2025-04-14T09:45:00Z'
      },
      {
        lat: 36.1,
        lng: -12.3,
        timestamp: '2025-04-16T11:20:00Z'
      },
      {
        lat: 28.4,
        lng: -16.3,
        timestamp: '2025-04-17T15:00:00Z'
      }
    ],
    distance: 2345,
    duration: 175,
    fuelConsumption: 320,
    co2Emission: 980,
    status: 'active',
    createdAt: '2025-04-09T14:30:00Z',
    updatedAt: '2025-04-15T08:45:00Z'
  },
  {
    id: '2',
    vesselId: '2',
    origin: {
      name: 'Singapore',
      position: {
        lat: 1.3,
        lng: 103.8
      }
    },
    destination: {
      name: 'Rotterdam',
      position: {
        lat: 51.9,
        lng: 4.5
      }
    },
    waypoints: [
      {
        lat: 1.3,
        lng: 103.8,
        timestamp: '2025-04-05T06:00:00Z'
      },
      {
        lat: 6.9,
        lng: 79.8,
        timestamp: '2025-04-07T18:30:00Z'
      },
      {
        lat: 12.0,
        lng: 44.0,
        timestamp: '2025-04-10T12:15:00Z'
      },
      {
        lat: 31.2,
        lng: 32.3,
        timestamp: '2025-04-15T09:45:00Z'
      },
      {
        lat: 35.6,
        lng: -10.2,
        timestamp: '2025-04-18T14:20:00Z'
      },
      {
        lat: 51.9,
        lng: 4.5,
        timestamp: '2025-04-20T08:30:00Z'
      }
    ],
    distance: 8765,
    duration: 363,
    fuelConsumption: 1250,
    co2Emission: 3850,
    status: 'active',
    createdAt: '2025-04-04T10:15:00Z',
    updatedAt: '2025-04-15T08:45:00Z'
  }
];

export const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'weather',
    severity: 'high',
    message: 'Storm warning in North Atlantic. Wind speeds exceeding 50 knots expected.',
    position: {
      lat: 45.0,
      lng: -20.0
    },
    timestamp: '2025-04-15T08:30:00Z',
    acknowledged: false
  },
  {
    id: '2',
    type: 'traffic',
    severity: 'medium',
    message: 'High traffic density near Singapore Strait. Exercise caution.',
    position: {
      lat: 1.3,
      lng: 103.8
    },
    timestamp: '2025-04-15T09:15:00Z',
    acknowledged: true
  },
  {
    id: '3',
    type: 'technical',
    severity: 'low',
    message: 'Maintenance required for engine cooling system on MAERSK SELETAR.',
    timestamp: '2025-04-15T07:45:00Z',
    acknowledged: false
  }
];