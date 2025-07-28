import { useState } from 'react';
import { Plus, Search, MapPin, Calendar, MoreHorizontal, Eye } from 'lucide-react';

export default function LostItems() {
  const [searchTerm, setSearchTerm] = useState('');

  const lostItems = [
    {
      id: 1,
      title: 'iPhone 14 Pro',
      description: 'Black iPhone with cracked screen protector, blue case',
      location: 'Library - 2nd Floor',
      dateReported: '2 days ago',
      status: 'active',
      views: 34,
      messages: 3,
      imageUrl: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'MacBook Air 13"',
      description: 'Silver MacBook Air with university stickers, some scratches on lid',
      location: 'Computer Lab - Engineering Building',
      dateReported: '5 days ago',
      status: 'found',
      views: 67,
      messages: 5,
      imageUrl: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'Car Keys (Honda)',
      description: 'Honda key with red keychain, house key attached',
      location: 'Student Center - Food Court',
      dateReported: '1 week ago',
      status: 'returned',
      views: 23,
      messages: 2,
      imageUrl: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=300&h=200&fit=crop'
    },
    {
      id: 4,
      title: 'Blue Nike Backpack',
      description: 'Navy blue Nike backpack with laptop compartment',
      location: 'Gym - Locker Room',
      dateReported: '2 weeks ago',
      status: 'active',
      views: 45,
      messages: 1,
      imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c257d?w=300&h=200&fit=crop'
    }
  ];

  const filteredItems = lostItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'badge-primary';
      case 'found': return 'badge-secondary';
      case 'returned': return 'badge-outline';
      default: return 'badge-neutral';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Active';
      case 'found': return 'Found';
      case 'returned': return 'Returned';
      default: return 'Active';
    }
  };

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Lost Items</h1>
          <p className="text-sm text-gray-500">Items you've reported as lost on campus.</p>
        </div>
        <button className="btn btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Report Lost Item
        </button>
      </div>

      {/* Card container */}
      <div className="bg-base-100 rounded-xl shadow p-6">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Lost Items ({filteredItems.length})</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search your lost items..."
              className="input input-bordered pl-10 w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="border rounded-xl p-4 hover:shadow transition">
              <div className="flex items-start space-x-4">
                {/* Image */}
                <div className="w-24 h-24 bg-base-200 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/100x100?text=No+Image'; }}
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.description}</p>

                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" /> {item.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" /> {item.dateReported}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" /> {item.views} views
                        </span>
                      </div>
                    </div>

                    {/* Status + Options */}
                    <div className="flex items-center gap-2">
                      <span className={`badge ${getStatusColor(item.status)}`}>
                        {getStatusText(item.status)}
                      </span>
                      <button className="btn btn-ghost btn-sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-gray-500">{item.messages} messages</p>
                    <div className="flex gap-2">
                      <button className="btn btn-sm btn-outline">Edit</button>
                      <button className="btn btn-sm btn-outline">View Details</button>
                      {item.status === 'found' && (
                        <button className="btn btn-sm btn-primary">Mark as Retrieved</button>
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
  );
}
