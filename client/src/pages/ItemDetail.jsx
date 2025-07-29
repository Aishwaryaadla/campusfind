import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ItemDetail = () => {
  const { itemType, id } = useParams();
  const [item, setItem] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  // Fetch item
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/${itemType === 'lost' ? 'lostitems' : 'founditems'}/${id}`)
      .then((res) => setItem(res.data.data)) // Make sure your backend responds with `{ data: item }`
      .catch((err) => console.error(err));
  }, [itemType, id]);  

  // Fetch comments
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/comments/${id}`)
      .then((res) => setComments(res.data.comments))
      .catch((err) => console.error(err));
  }, [itemType, id]);

  // Handle comment post
  const handlePostComment = () => {
    if (!user) return alert('Please log in to comment');

    axios
    .post(
      'http://localhost:4000/api/comments',
      {
        itemId: id,
        itemType: itemType === 'lost' ? 'Lostitem' : 'Founditem',
        content: comment,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`, 
        },
      }
    )    
      .then((res) => {
        setComments((prev) => [...prev, res.data.comment]);
        setComment('');
      })
      .catch(() => alert('Failed to post comment'));
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

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Comments</h2>

        {comments.length > 0 ? (
          <div className="space-y-2">
            {comments.map((c) => (
              <div key={c._id} className="bg-gray-100 p-3 rounded-lg">
                <p className="font-semibold">{c.user?.name || 'Anonymous'}:</p>
                <p>{c.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}

        {user ? (
          <div className="mt-4">
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Write your comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button className="btn btn-primary mt-2" onClick={handlePostComment}>
              Post Comment
            </button>
          </div>
        ) : (
          <Link to="/login" state={{ from: `/item/${itemType}/${id}` }} className="btn btn-warning mt-4">
            Log in to comment
          </Link>
        )}
      </div>
    </div>
  );
};

export default ItemDetail;
