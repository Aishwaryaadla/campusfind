import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Plus,
  MapPin,
  Calendar,
  MoreHorizontal,
} from 'lucide-react';

export default function FoundItems({ user }) {
  const [foundItems, setFoundItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoundItems = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/founditems/user/${user.rollNo}`);
        if (res.data.success) {
          setFoundItems(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching found items:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.rollNo) {
      fetchFoundItems();
    }
  }, [user?.rollNo]);

  const filteredItems = foundItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'claimed':
        return 'badge-secondary';
      case 'returned':
        return 'badge-outline';
      default:
        return 'badge-primary';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'claimed':
        return 'Claimed';
      case 'returned':
        return 'Returned';
      default:
        return 'Unclaimed';
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Found Items</h1>
          <p className="text-sm text-gray-500">
            Items you've reported as found on campus.
          </p>
        </div>
      </div>


      {/* Card Container */}
      <div className="bg-base-100 rounded-xl shadow p-6">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            Found Items ({filteredItems.length})
          </h2>
        </div>

        <input
          type="text"
          placeholder="Search found items..."
          className="input input-bordered input-sm w-full max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Items Grid */}
        <div className="grid gap-6">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="border rounded-xl p-4 hover:shadow transition"
            >
              <div className="flex items-start space-x-4">
                {/* Image */}
                <div className="w-24 h-24 bg-base-200 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={
                      item.imageUrl ||
                      'https://via.placeholder.com/100x100?text=No+Image'
                    }
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        'https://via.placeholder.com/100x100?text=No+Image';
                    }}
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        {item.description}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" /> {item.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(item.dateFound).toLocaleDateString()}
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
                    <p className="text-sm text-gray-500">...</p>
                    <div className="flex gap-2">
                      <button className="btn btn-sm btn-outline">Edit</button>
                      <button className="btn btn-sm btn-outline">
                        View Details
                      </button>
                      {/* Optionally: Mark as returned */}
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
