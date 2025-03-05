import React from 'react';
import { mockWeatherData } from '../mockData';
import { Wind, Droplets, Thermometer, Eye, BarChart2 } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WeatherDashboard: React.FC = () => {
  // Mock forecast data for the next 7 days
  const forecastDays = ['Today', 'Tomorrow', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
  
  const windSpeedData: ChartData<'line'> = {
    labels: forecastDays,
    datasets: [
      {
        label: 'Wind Speed (knots)',
        data: [15, 18, 12, 20, 25, 22, 16],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.3
      }
    ]
  };

  const waveHeightData: ChartData<'line'> = {
    labels: forecastDays,
    datasets: [
      {
        label: 'Wave Height (m)',
        data: [2.5, 3.1, 2.8, 4.2, 5.0, 3.8, 2.9],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.3
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Weather Dashboard</h1>

      {/* Current Weather Conditions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {mockWeatherData.map((weather, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">Lat: {weather.position.lat.toFixed(2)}, Lng: {weather.position.lng.toFixed(2)}</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <Wind className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-500">Wind</p>
                <p className="font-medium">{weather.windSpeed} knots</p>
                <p className="text-xs text-gray-500">Direction: {weather.windDirection}°</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Waves</p>
                <p className="font-medium">{weather.waveHeight} m</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Temperature</p>
                <p className="font-medium">{weather.temperature}°C</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Visibility</p>
                <p className="font-medium">{weather.visibility} km</p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">Updated</p>
              <p className="text-sm">{new Date(weather.timestamp).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Weather Forecast */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold">7-Day Forecast</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-md font-medium mb-3">Wind Speed Forecast</h3>
              <Line options={chartOptions} data={windSpeedData} />
            </div>
            <div>
              <h3 className="text-md font-medium mb-3">Wave Height Forecast</h3>
              <Line options={chartOptions} data={waveHeightData} />
            </div>
          </div>
        </div>
      </div>

      {/* Weather Alerts */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold">Weather Alerts</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Wind className="h-5 w-5 text-red-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Storm Warning</h3>
                  <div className="mt-1 text-sm text-red-700">
                    <p>Storm warning in North Atlantic. Wind speeds exceeding 50 knots expected.</p>
                  </div>
                  <div className="mt-2">
                    <div className="-mx-2 -my-1.5 flex">
                      <button type="button" className="px-2 py-1.5 rounded-md text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Droplets className="h-5 w-5 text-yellow-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">High Waves</h3>
                  <div className="mt-1 text-sm text-yellow-700">
                    <p>High waves expected in Mediterranean Sea. Wave heights of 4-5 meters forecasted.</p>
                  </div>
                  <div className="mt-2">
                    <div className="-mx-2 -my-1.5 flex">
                      <button type="button" className="px-2 py-1.5 rounded-md text-sm font-medium text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Eye className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Low Visibility</h3>
                  <div className="mt-1 text-sm text-blue-700">
                    <p>Fog warning in English Channel. Visibility reduced to less than 1 nautical mile.</p>
                  </div>
                  <div className="mt-2">
                    <div className="-mx-2 -my-1.5 flex">
                      <button type="button" className="px-2 py-1.5 rounded-md text-sm font-medium text-blue-800 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;