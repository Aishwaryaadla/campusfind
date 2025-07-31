import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Plus,
  MapPin,
  Calendar,
  MoreHorizontal,
} from 'lucide-react';

export default function LostItems() {
  const [lostItems, setLostItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user')); // Ensure 'user' has rollNo

  useEffect(() => {
    const fetchUserLostItems = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const rollNo = storedUser?.rollNo;
  
      if (!rollNo) return;
  
      try {
        const res = await axios.get(`http://localhost:5000/api/lostitems/user/${rollNo}`);
        setLostItems(res.data.data); // or your state key
        setLoading(false); 
      } catch (err) {
        console.error("Failed to fetch user-specific lost items", err);
        setLoading(false); 
      }
    };
  
    fetchUserLostItems();
  }, []);
  
  const filteredItems = lostItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'badge-primary';
      case 'found':
        return 'badge-secondary';
      case 'returned':
        return 'badge-outline';
      default:
        return 'badge-neutral';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'found':
        return 'Found';
      case 'returned':
        return 'Returned';
      default:
        return 'Active';
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Lost Items</h1>
          <p className="text-sm text-gray-500">
            Items you've reported as lost on campus.
          </p>
        </div>
      </div>

      {/* Card container */}
      <div className="bg-base-100 rounded-xl shadow p-6">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            Lost Items ({filteredItems.length})
          </h2>
        </div>

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
                          {new Date(item.dateLost).toLocaleDateString()}
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
                      {/* Optional "mark retrieved" can be based on logic */}
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
