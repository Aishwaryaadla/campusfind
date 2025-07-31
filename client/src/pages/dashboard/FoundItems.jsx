import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Plus,
  MapPin,
  Calendar,
  MoreHorizontal,
} from 'lucide-react';
import { Link } from 'react-router-dom';

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

      <input
          type="text"
          placeholder="Search found items..."
          className="input input-bordered input-sm w-full max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

      {/* Card Container */}
      <div className="bg-base-100 rounded-xl shadow p-6">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            Found Items ({filteredItems.length})
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

                    
                    
                  </div>

                  
                </div>
                {/* Footer Actions */}
                <Link to={`/found/edit/${item._id}`} className="btn btn-sm btn-outline">
                    Edit
                  </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
