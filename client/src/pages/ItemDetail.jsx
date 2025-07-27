import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [message, setMessage] = useState('');
  const user = JSON.parse(localStorage.getItem('user')); // adjust if you use context

  useEffect(() => {
    axios.get(`http://localhost:4000/lost/${id}`)
      .then(res => setItem(res.data.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleSendMessage = () => {
    if (!user) return alert("Please log in to send a message");
    axios.post(`http://localhost:4000/messages/send`, {
      to: item.rollNo,
      from: user.rollNo,
      content: message
    })
    .then(() => {
      alert("Message sent!");
      setMessage('');
    })
    .catch(() => alert("Failed to send"));
  };

  if (!item) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{item.name}</h1>
      {item.imageUrl && <img src={`http://localhost:4000${item.imageUrl}`} alt={item.name} className="w-64 my-4" />}
      <p><strong>Description:</strong> {item.description}</p>
      <p><strong>Location:</strong> {item.location}</p>
      <p><strong>Date Lost:</strong> {item.dateLost}</p>
      <p><strong>Posted By:</strong> {item.rollNo}</p>

      {user && (
        <div className="mt-6">
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Write your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button className="btn btn-primary mt-2" onClick={handleSendMessage}>Send Message</button>
        </div>
      )}
    </div>
  );
};

export default ItemDetail;
