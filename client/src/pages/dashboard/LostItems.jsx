import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Plus,
  MapPin,
  Calendar,
  MoreHorizontal,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LostItems({ user }) {
  const [lostItems, setLostItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const markAsReturned = async (id) => {
    try {
      const res = await axios.put(`http://localhost:4000/api/lostitems/return/${id}`);
      const updatedItem = res.data.data;
  
      // Update state
      setLostItems((prevItems) =>
        prevItems.map((item) =>
          item._id === updatedItem._id ? updatedItem : item
        )
      );
    } catch (err) {
      console.error("Failed to mark as returned", err);
    }
  };  


  useEffect(() => {
    const fetchUserLostItems = async () => {
      const rollNo = user?.rollNo;    
  
      if (!rollNo) return;
  
      try {
        const res = await axios.get(`http://localhost:4000/api/lostitems/user/${user.rollNo}`);
        console.log('Lost items:', res.data.data);
        setLostItems(res.data.data); // or your state key
        setLoading(false); 
      } catch (err) {
        console.error("Failed to fetch user-specific lost items", err);
        setLoading(false); 
      }
    };
  
    fetchUserLostItems();
  }, [user]);
  
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

      <input
        type="text"
        placeholder="Search lost items..."
        className="input input-bordered input-sm w-full max-w-xs"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />


      {/* Card container */}
      <div className="bg-base-100 rounded-xl shadow p-6">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            Lost Items ({filteredItems.length})
          </h2>
        </div>


      <br></br>

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
                          {new Date(item.dateLost).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                   
                  </div>

                  {/* Footer Actions */}
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-gray-500">...</p>
                    <div className="flex gap-2">
                      <Link to={`/lost/edit/${item._id}`} className="btn btn-sm btn-outline mt-2">
                        Edit
                      </Link>
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
