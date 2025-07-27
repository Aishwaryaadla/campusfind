import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ItemDetail = () => {
  const { itemType, id } = useParams(); // now reading both values from URL
  const [item, setItem] = useState(null);
  const [message, setMessage] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/${itemType}items/${id}`)
      .then((res) => setItem(res.data.data))
      .catch((err) => console.error(err));
  }, [itemType, id]);

  const handleSendMessage = () => {
    if (!user) return alert('Please log in to send a message');

    axios
      .post(`http://localhost:4000/api/messages/send`, {
        sender: user._id,       // Make sure _id is stored in localStorage
        receiver: item.postedBy, // We'll fetch postedBy from item later
        itemId: item._id,
        content: message,
      })
      .then(() => {
        alert('Message sent!');
        setMessage('');
      })
      .catch(() => alert('Failed to send message'));
  };

  if (!item) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{item.name}</h1>
      {item.imageUrl && (
        <img
          src={`http://localhost:4000${item.imageUrl}`}
          alt={item.name}
          className="w-full max-w-md mx-auto mb-6 rounded-lg shadow"
        />
      )}
      <div className="mb-4 space-y-2">
        <p><strong>Description:</strong> {item.description}</p>
        <p><strong>Location:</strong> {item.location}</p>
        <p><strong>Date {itemType === "lost" ? "Lost" : "Found"}:</strong> {item.dateLost || item.dateFound}</p>
        <p><strong>Posted By:</strong> {item.rollNo}</p>
      </div>

      {user ? (
        <div className="mt-6">
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Write your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="btn btn-primary mt-2" onClick={handleSendMessage}>
            Send Message
          </button>
        </div>
      ) : (
        <p className="mt-4 text-warning">Log in to send a message.</p>
      )}
    </div>
  );
};

export default ItemDetail;
