import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth'; 


export default function Messages() {
  
  const [tab, setTab] = useState('inbox');
  const [inbox, setInbox] = useState([]);
  const [sent, setSent] = useState([]); 
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // should have user._id

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/api/messages/user/${user._id}`);
        setInbox(res.data.inbox || []);
        setSent(res.data.sent || []);
      } catch (err) {
        console.error('Error fetching messages', err);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) fetchMessages();
  }, [user]);

  
  const renderMessage = (msg, type) => (
    <div
      key={msg._id}
      className={`p-4 rounded-lg border hover:bg-base-200 transition cursor-pointer ${
        type === 'inbox' ? 'border-primary' : ''
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold">
            {type === 'inbox' ? msg.sender?.name : msg.receiver?.name}
          </h3>
          <p className="text-sm">{msg.content}</p>
        </div>
        <span className="text-xs text-gray-400 whitespace-nowrap">
          {new Date(msg.timestamp).toLocaleString()}
        </span>
      </div>
    </div>
  );
    
  if (loading) {
    return <div className="text-center">Loading messages...</div>;
  }
  

  return (
    
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Messages</h2>
          <p className="text-sm text-gray-500">View and reply to your messages</p>
        </div>
      </div>

      {/* Tabs + Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Search Input */}
        <label className="input input-bordered flex items-center gap-2 w-full md:max-w-md">
          <Search className="w-4 h-4 text-gray-500" />
          <input type="text" className="grow" placeholder="Search messages..." />
        </label>

        {/* Tabs */}
        <div className="tabs tabs-boxed">
          <a
            className={`tab ${tab === 'inbox' ? 'tab-active' : ''}`}
            onClick={() => setTab('inbox')}
          >
            Inbox ({inbox.length})
          </a>
          <a
            className={`tab ${tab === 'sent' ? 'tab-active' : ''}`}
            onClick={() => setTab('sent')}
          >
            Sent
          </a>
        </div>
      </div>

      {/* Message List */}
      <div className="space-y-3">
      {(tab === 'inbox' ? inbox : sent).length === 0 ? (
        <p className="text-gray-500 text-center mt-4">No messages found in {tab}.</p>
        ) : (
      (tab === 'inbox' ? inbox : sent).map((msg) => renderMessage(msg, tab))
      )}
      </div>
    </div>
  );
}
