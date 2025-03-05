import React, { useState } from 'react';
import { mockVessels } from '../mockData';
import { Ship, Navigation, Anchor, Filter, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const VesselList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const filteredVessels = mockVessels.filter(vessel => {
    const matchesSearch = vessel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vessel.imo.includes(searchTerm) ||
                          vessel.destination.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus ? vessel.status === filterStatus : true;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Vessels</h1>
        
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search vessels..."
              className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          <div className="relative inline-block">
            <select
              className="pl-10 pr-4 py-2 border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={filterStatus || ''}
              onChange={(e) => setFilterStatus(e.target.value || null)}
            >
              <option value="">All Statuses</option>
              <option value="Underway">Underway</option>
              <option value="Anchored">Anchored</option>
              <option value="Moored">Moored</option>
            </select>
            <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vessel
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IMO / MMSI
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Destination
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ETA
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVessels.map((vessel) => (
                <tr key={vessel.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full">
                        <Ship className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{vessel.name}</div>
                        <div className="text-sm text-gray-500">{vessel.flag}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{vessel.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">IMO: {vessel.imo}</div>
                    <div className="text-sm text-gray-500">MMSI: {vessel.mmsi}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{vessel.destination}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{vessel.eta}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${vessel.status === 'Underway' ? 'bg-green-100 text-green-800' : 
                        vessel.status === 'Anchored' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-gray-100 text-gray-800'}`}>
                      {vessel.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link to={`/vessels/${vessel.id}`} className="text-blue-600 hover:text-blue-900">
                        View
                      </Link>
                      <Link to={`/routes/optimize/${vessel.id}`} className="text-green-600 hover:text-green-900">
                        Optimize
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VesselList;