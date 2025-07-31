import { PlusIcon, Search, Eye, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DashboardOverview() {
  const [lostCount, setLostCount] = useState(0);
  const [foundCount, setFoundCount] = useState(0);
  const [returnedCount, setReturnedCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const fetchData = async () => {
      try {
        const lostRes = await axios.get('http://localhost:4000/api/lost/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const foundRes = await axios.get('http://localhost:4000/api/found/user', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const lostItems = lostRes.data.items || [];
        const foundItems = foundRes.data.items || [];

        const returnedLost = lostItems.filter((item) => item.isReturned).length;
        const returnedFound = foundItems.filter((item) => item.isReturned).length;

        setLostCount(lostItems.length);
        setFoundCount(foundItems.length);
        setReturnedCount(returnedLost + returnedFound);
      } catch (error) {
        console.error('Error fetching user item data:', error);
      }
    };

    fetchData();
  }, []);

  const reportStats = [
    {
      id: 'lost',
      label: 'Lost Items Reported',
      count: lostCount,
      icon: Search,
      color: 'bg-red-100 text-red-600',
    },
    {
      id: 'found',
      label: 'Found Items Reported',
      count: foundCount,
      icon: Eye,
      color: 'bg-green-100 text-green-600',
    },
    {
      id: 'returned',
      label: 'Items Returned',
      count: returnedCount,
      icon: CheckCircle,
      color: 'bg-blue-100 text-blue-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back! Here's a quick look at your reports.
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/lost" className="btn btn-primary">
            <PlusIcon className="w-4 h-4 mr-2" />
            Report Lost Item
          </Link>
          <Link to="/found" className="btn btn-outline">
            <PlusIcon className="w-4 h-4 mr-2" />
            Report Found Item
          </Link>
        </div>
      </div>

      {/* My Reports Summary */}
      <div className="bg-base-100 shadow-md rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">My Reports</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportStats.map((stat) => (
            <div
              key={stat.id}
              className="flex items-center p-4 rounded-lg bg-base-200 shadow-sm"
            >
              <div className={`p-3 rounded-full ${stat.color} mr-4`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.count}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
