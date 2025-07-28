import { PlusIcon, TrendingUp, MessageCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DashboardOverview() {
  
  const recentActivity = [
    {
      id: 1,
      type: 'Message',
      title: 'New message about iPhone 14',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 2,
      type: 'Found',
      title: 'Someone found your MacBook',
      time: '5 hours ago',
      unread: false
    },
    {
      id: 3,
      type: 'Posted',
      title: 'You posted: Blue Backpack',
      time: '1 day ago',
      unread: false
    },
    {
      id: 4,
      type: 'Returned',
      title: 'Item returned to owner',
      time: '2 days ago',
      unread: false
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back! Here's what's happening.</p>
        </div>
        <div className="flex gap-2">
          <Link to='/lost' className="btn btn-primary">
            <PlusIcon className="w-4 h-4 mr-2" />
            Report Lost Item
          </Link>
          <Link to='/found' className="btn btn-outline">
            <PlusIcon className="w-4 h-4 mr-2" />
            Report Found Item
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-base-100 shadow-md rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-4">
          {recentActivity.map((activity) => (
            <li
              key={activity.id}
              className="flex justify-between items-center p-3 rounded-lg bg-base-200"
            >
              <div>
                <p className={`font-medium ${activity.unread ? 'text-primary' : ''}`}>
                  {activity.title}
                </p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
              <div className="badge badge-outline">{activity.type}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
