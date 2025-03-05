import React, { useState } from 'react';
import { mockVessels, mockPorts, mockWeatherData } from '../mockData';
import { Ship, Anchor, Navigation, Wind, Droplets, Fuel, Clock, AlertTriangle } from 'lucide-react';

const RouteOptimizer: React.FC = () => {
  const [selectedVessel, setSelectedVessel] = useState('');
  const [originPort, setOriginPort] = useState('');
  const [destinationPort, setDestinationPort] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [optimizationPriority, setOptimizationPriority] = useState('balanced');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState<any>(null);

  const handleOptimize = () => {
    if (!selectedVessel || !originPort || !destinationPort || !departureDate) {
      alert('Please fill in all required fields');
      return;
    }

    setIsOptimizing(true);

    // Simulate optimization process
    setTimeout(() => {
      const result = {
        originalRoute: {
          distance: 2345,
          duration: 175,
          fuelConsumption: 320,
          co2Emission: 980,
          riskFactor: 'Medium'
        },
        optimizedRoute: {
          distance: 2289,
          duration: 168,
          fuelConsumption: 295,
          co2Emission: 905,
          riskFactor: 'Low'
        },
        savings: {
          distance: 56,
          duration: 7,
          fuelConsumption: 25,
          co2Emission: 75
        },
        weatherConditions: [
          { position: { lat: 35.6, lng: -10.2 }, severity: 'moderate', type: 'wind' },
          { position: { lat: 31.2, lng: 32.3 }, severity: 'low', type: 'waves' }
        ]
      };

      setOptimizationResult(result);
      setIsOptimizing(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Route Optimizer</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Route Parameters Form */}
        <div className="md:col-span-1 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Route Parameters</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vessel</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedVessel}
                onChange={(e) => setSelectedVessel(e.target.value)}
              >
                <option value="">Select a vessel</option>
                {mockVessels.map(vessel => (
                  <option key={vessel.id} value={vessel.id}>{vessel.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Origin Port</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={originPort}
                onChange={(e) => setOriginPort(e.target.value)}
              >
                <option value="">Select origin port</option>
                {mockPorts.map(port => (
                  <option key={port.id} value={port.id}>{port.name}, {port.country}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Destination Port</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={destinationPort}
                onChange={(e) => setDestinationPort(e.target.value)}
              >
                <option value="">Select destination port</option>
                {mockPorts.map(port => (
                  <option key={port.id} value={port.id}>{port.name}, {port.country}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Departure Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Optimization Priority</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    optimizationPriority === 'fuel' 
                      ? 'bg-blue-100 text-blue-800 border border-blue-500' 
                      : 'bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200'
                  }`}
                  onClick={() => setOptimizationPriority('fuel')}
                >
                  <div className="flex items-center justify-center">
                    <Fuel className="h-4 w-4 mr-1" />
                    <span>Fuel Efficiency</span>
                  </div>
                </button>
                <button
                  type="button"
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    optimizationPriority === 'time' 
                      ? 'bg-blue-100 text-blue-800 border border-blue-500' 
                      : 'bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200'
                  }`}
                  onClick={() => setOptimizationPriority('time')}
                >
                  <div className="flex items-center justify-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Time Efficiency</span>
                  </div>
                </button>
                <button
                  type="button"
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    optimizationPriority === 'safety' 
                      ? 'bg-blue-100 text-blue-800 border border-blue-500' 
                      : 'bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200'
                  }`}
                  onClick={() => setOptimizationPriority('safety')}
                >
                  <div className="flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    <span>Safety</span>
                  </div>
                </button>
                <button
                  type="button"
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    optimizationPriority === 'balanced' 
                      ? 'bg-blue-100 text-blue-800 border border-blue-500' 
                      : 'bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200'
                  }`}
                  onClick={() => setOptimizationPriority('balanced')}
                >
                  <div className="flex items-center justify-center">
                    <span>Balanced</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                onClick={handleOptimize}
                disabled={isOptimizing}
              >
                {isOptimizing ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Optimizing...
                  </div>
                ) : 'Optimize Route'}
              </button>
            </div>
          </div>
        </div>

        {/* Optimization Results */}
        <div className="md:col-span-2">
          {optimizationResult ? (
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold">Optimization Results</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Route optimized for {
                    optimizationPriority === 'fuel' ? 'maximum fuel efficiency' :
                    optimizationPriority === 'time' ? 'fastest voyage time' :
                    optimizationPriority === 'safety' ? 'highest safety' : 'balanced performance'
                  }
                </p>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Comparison Table */}
                  <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                          <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Original</th>
                          <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Optimized</th>
                          <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Savings</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Distance (nm)</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{optimizationResult.originalRoute.distance}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{optimizationResult.optimizedRoute.distance}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600">-{optimizationResult.savings.distance} ({((optimizationResult.savings.distance / optimizationResult.originalRoute.distance) * 100).toFixed(1)}%)</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Duration (hours)</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{optimizationResult.originalRoute.duration}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{optimizationResult.optimizedRoute.duration}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600">-{optimizationResult.savings.duration} ({((optimizationResult.savings.duration / optimizationResult.originalRoute.duration) * 100).toFixed(1)}%)</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Fuel (tons)</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{optimizationResult.originalRoute.fuelConsumption}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{optimizationResult.optimizedRoute.fuelConsumption}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600">-{optimizationResult.savings.fuelConsumption} ({((optimizationResult.savings.fuelConsumption / optimizationResult.originalRoute.fuelConsumption) * 100).toFixed(1)}%)</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">CO2 (tons)</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{optimizationResult.originalRoute.co2Emission}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{optimizationResult.optimizedRoute.co2Emission}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600">-{optimizationResult.savings.co2Emission} ({((optimizationResult.savings.co2Emission / optimizationResult.originalRoute.co2Emission) * 100).toFixed(1)}%)</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Risk Factor</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{optimizationResult.originalRoute.riskFactor}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{optimizationResult.optimizedRoute.riskFactor}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600">Improved</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Weather Conditions */}
                  <div>
                    <h3 className="text-md font-medium mb-3">Weather Considerations</h3>
                    <div className="space-y-3">
                      {optimizationResult.weatherConditions.map((condition: any, index: number) => (
                        <div key={index} className="flex items-start p-3 bg-gray-50 rounded-md">
                          <div className={`flex-shrink-0 p-2 rounded-full ${
                            condition.severity === 'high' ? 'bg-red-100' :
                            condition.severity === 'moderate' ? 'bg-yellow-100' : 'bg-green-100'
                          }`}>
                            {condition.type === 'wind' ? (
                              <Wind className={`h-5 w-5 ${
                                condition.severity === 'high' ? 'text-red-600' :
                                condition.severity === 'moderate' ? 'text-yellow-600' : 'text-green-600'
                              }`} />
                            ) : (
                              <Droplets className={`h-5 w-5 ${
                                condition.severity === 'high' ? 'text-red-600' :
                                condition.severity === 'moderate' ? 'text-yellow-600' : 'text-green-600'
                              }`} />
                            )}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              {condition.type === 'wind' ? 'Strong Winds' : 'High Waves'} - {condition.severity.charAt(0).toUpperCase() + condition.severity.slice(1)} Severity
                            </p>
                            <p className="text-sm text-gray-500">
                              Route adjusted to minimize impact of {condition.type === 'wind' ? 'adverse wind conditions' : 'high wave heights'}.
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6">
                      <h3 className="text-md font-medium mb-3">Optimization Summary</h3>
                      <div className="p-3 bg-blue-50 rounded-md">
                        <p className="text-sm text-blue-800">
                          The optimized route saves approximately <strong>{((optimizationResult.savings.fuelConsumption / optimizationResult.originalRoute.fuelConsumption) * 100).toFixed(1)}%</strong> in fuel consumption and <strong>{((optimizationResult.savings.duration / optimizationResult.originalRoute.duration) * 100).toFixed(1)}%</strong> in voyage time while improving safety by avoiding adverse weather conditions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Export Report
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Apply Route
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center h-full">
              <img 
                src="https://images.unsplash.com/photo-1566288623394-377af472d81b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Ship navigation" 
                className="w-64 h-64 object-cover rounded-lg mb-6"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Route Optimization</h3>
              <p className="text-gray-600 text-center max-w-md mb-6">
                Our advanced algorithm considers real-time weather data, ocean currents, and vessel characteristics to find the most efficient and safe route.
              </p>
              <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
                  <Fuel className="h-8 w-8 text-blue-600 mb-2" />
                  <h4 className="font-medium text-gray-900">Reduce Fuel</h4>
                  <p className="text-sm text-gray-600 text-center">Up to 15% fuel savings</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
                  <Wind className="h-8 w-8 text-green-600 mb-2" />
                  <h4 className="font-medium text-gray-900">Weather Routing</h4>
                  <p className="text-sm text-gray-600 text-center">Avoid adverse conditions</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg">
                  <Clock className="h-8 w-8 text-purple-600 mb-2" />
                  <h4 className="font-medium text-gray-900">Save Time</h4>
                  <p className="text-sm text-gray-600 text-center">Reduce voyage duration</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-yellow-50 rounded-lg">
                  <AlertTriangle className="h-8 w-8 text-yellow-600 mb-2" />
                  <h4 className="font-medium text-gray-900">Enhance Safety</h4>
                  <p className="text-sm text-gray-600 text-center">Minimize risks</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RouteOptimizer;