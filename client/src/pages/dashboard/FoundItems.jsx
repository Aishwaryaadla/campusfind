import { useState } from 'react';
import { Plus, Search, MapPin, Calendar, MoreHorizontal, Eye } from 'lucide-react';

export default function FoundItems() {
  const [searchTerm, setSearchTerm] = useState('');

  const foundItems = [
    {
      id: 1,
      title: 'Red Water Bottle',
      description: 'Hydro Flask with name "Sarah" written on it',
      location: 'Gym - Locker Room',
      dateReported: '1 day ago',
      status: 'active',
      views: 12,
      messages: 2,
      imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Wireless Earbuds',
      description: 'Apple AirPods Pro in white case',
      location: 'Library - Study Room 3',
      dateReported: '3 days ago',
      status: 'claimed',
      views: 28,
      messages: 4,
      imageUrl: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'Textbook - Biology 101',
      description: 'Campbell Biology textbook, 12th edition with highlighting',
      location: 'Science Building - Room 205',
      dateReported: '1 week ago',
      status: 'returned',
      views: 15,
      messages: 3,
      imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop'
    }
  ];

  const filteredItems = foundItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getBadgeClass = (status) => {
    switch (status) {
      case 'active':
        return 'badge badge-info';
      case 'claimed':
        return 'badge badge-warning';
      case 'returned':
        return 'badge badge-success';
      default:
        return 'badge';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Available';
      case 'claimed': return 'Claimed';
      case 'returned': return 'Returned';
      default: return 'Available';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">My Found Items</h1>
          <p className="text-sm text-gray-500">Items you've found and reported on campus.</p>
        </div>
        <button className="btn btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Report Found Item
        </button>
      </div>

      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex items-center justify-between mb-4">
            <h2 className="card-title">Found Items ({filteredItems.length})</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search your found items..."
                className="input input-bordered pl-10 w-72"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => (e.target.src = 'https://via.placeholder.com/100')}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-500 mb-2">{item.description}</p>
                        <div className="flex items-center flex-wrap gap-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {item.location}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {item.dateReported}
                          </div>
                          <div className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {item.views} views
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={getBadgeClass(item.status)}>
                          {getStatusText(item.status)}
                        </span>
                        <button className="btn btn-ghost btn-sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-gray-500">
                        {item.messages} messages
                      </span>
                      <div className="flex gap-2">
                        <button className="btn btn-outline btn-sm">Edit</button>
                        <button className="btn btn-outline btn-sm">View Details</button>
                        {item.status === 'claimed' && (
                          <button className="btn btn-sm btn-success">Mark as Returned</button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
