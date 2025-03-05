import React from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartData
} from 'chart.js';
import { Fuel, Clock, AlertTriangle, TrendingDown } from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsDashboard: React.FC = () => {
  // Mock data for charts
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const fuelConsumptionData: ChartData<'line'> = {
    labels: months,
    datasets: [
      {
        label: 'Actual Consumption',
        data: [320, 315, 310, 305, 300, 295, 290, 285, 280, 275, 270, 265],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.3
      },
      {
        label: 'Optimized Routes',
        data: [320, 305, 290, 275, 260, 245, 230, 215, 200, 185, 170, 155],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.3,
        borderDash: [5, 5]
      }
    ]
  };

  const co2EmissionsData: ChartData<'bar'> = {
    labels: months,
    datasets: [
      {
        label: 'CO2 Emissions (tons)',
        data: [980, 965, 950, 935, 920, 905, 890, 875, 860, 845, 830, 815],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ]
  };

  const routeEfficiencyData: ChartData<'doughnut'> = {
    labels: ['Optimal', 'Near Optimal', 'Sub-optimal', 'Needs Improvement'],
    datasets: [
      {
        data: [65, 20, 10, 5],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
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

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Fuel Savings</p>
              <p className="text-2xl font-bold">15.2%</p>
              <p className="text-sm text-green-600 flex items-center">
                <TrendingDown className="h-4 w-4 mr-1" />
                <span>3.5% from last month</span>
              </p>
            </div>
            <div className="bg-blue-100 p-2 rounded-full">
              <Fuel className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">CO2 Reduction</p>
              <p className="text-2xl font-bold">16.8%</p>
              <p className="text-sm text-green-600 flex items-center">
                <TrendingDown className="h-4 w-4 mr-1" />
                <span>2.1% from last month</span>
              </p>
            </div>
            <div className="bg-green-100 p-2 rounded-full">
              <TrendingDown className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Time Efficiency</p>
              <p className="text-2xl font-bold">8.7%</p>
              <p className="text-sm text-green-600 flex items-center">
                <TrendingDown className="h-4 w-4 mr-1" />
                <span>1.2% from last month</span>
              </p>
            </div>
            <div className="bg-purple-100 p-2 rounded-full">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Safety Incidents</p>
              <p className="text-2xl font-bold">-42%</p>
              <p className="text-sm text-green-600 flex items-center">
                <TrendingDown className="h-4 w-4 mr-1" />
                <span>5.3% from last month</span>
              </p>
            </div>
            <div className="bg-yellow-100 p-2 rounded-full">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold">Fuel Consumption Trends</h2>
            <p className="text-sm text-gray-500">Actual vs. Optimized Routes</p>
          </div>
          <div className="p-6">
            <Line options={chartOptions} data={fuelConsumptionData} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold">CO2 Emissions</h2>
            <p className="text-sm text-gray-500">Monthly Emissions in Tons</p>
          </div>
          <div className="p-6">
            <Bar options={chartOptions} data={co2EmissionsData} />
          </div>
        </div>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow lg:col-span-1">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold">Route Efficiency</h2>
            <p className="text-sm text-gray-500">Distribution of Route Quality</p>
          </div>
          <div className="p-6 flex justify-center">
            <div style={{ maxWidth: '300px' }}>
              <Doughnut options={doughnutOptions} data={routeEfficiencyData} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow lg:col-span-2">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold">Optimization Impact</h2>
            <p className="text-sm text-gray-500">Key Performance Metrics</p>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Metric
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Before Optimization
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      After Optimization
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Improvement
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Average Fuel Consumption
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      320 tons/voyage
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      271 tons/voyage
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      15.2%
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      CO2 Emissions
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      980 tons/voyage
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      815 tons/voyage
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      16.8%
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Average Voyage Duration
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      175 hours
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      160 hours
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      8.7%
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Weather-related Incidents
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      12 incidents
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      7 incidents
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      41.7%
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Route Compliance
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      78%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      94%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      20.5%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;