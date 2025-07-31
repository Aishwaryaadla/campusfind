import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function EditLostItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    dateLost: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/lostitems/${id}`);
        const data = res.data.data;
        setItem(data);
        setFormData({
          name: data.name || '',
          description: data.description || '',
          location: data.location || '',
          dateLost: data.dateLost ? data.dateLost.substring(0, 10) : '',
        });
        setLoading(false);
      } catch (err) {
        console.error('Failed to load item details', err);
        toast.error('Failed to load item details');
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:4000/api/lostitems/${id}`, formData);
      toast.success("Item updated!");
      navigate('/user/dashboard'); // or wherever you want to go
    } catch (err) {
      console.error("Error updating item:", err);
      toast.error("Failed to update item");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Lost Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Item Name"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
          placeholder="Description"
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Location Lost"
        />
        <input
          type="date"
          name="dateLost"
          value={formData.dateLost}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <button type="submit" className="btn btn-primary w-full">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditLostItem;
