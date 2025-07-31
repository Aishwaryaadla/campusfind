import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function EditFoundItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    dateFound: '',
  });

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/founditems/${id}`);
        const data = res.data.data;
        setFormData({
          name: data.name,
          description: data.description,
          location: data.location,
          dateFound: data.dateFound.split('T')[0],
        });
      } catch (err) {
        console.error('Failed to fetch item:', err);
      }
    };
    fetchItem();
  }, [id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/founditems/${id}`, formData);
      toast.success('Item updated');
      navigate('/user/dashboard'); // or wherever your found items list is
    } catch (err) {
      console.error('Failed to update item:', err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Found Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Item Name"
          className="input input-bordered w-full"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          required
        />
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location Found"
          className="input input-bordered w-full"
          required
        />
        <input
          type="date"
          name="dateFound"
          value={formData.dateFound}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <button className="btn btn-primary w-full">Save Changes</button>
      </form>
    </div>
  );
}
