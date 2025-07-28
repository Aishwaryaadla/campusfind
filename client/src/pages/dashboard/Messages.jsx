import { useState } from 'react';
import { Send, Search } from 'lucide-react';

const dummyInbox = [
  {
    id: 1,
    from: 'Sarah Johnson',
    subject: 'About your lost iPhone 14',
    preview: 'Hi! I think I found your iPhone. It has a blue case and was found in the library...',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    from: 'Mike Chen',
    subject: 'MacBook Air - Is this yours?',
    preview: 'I found a MacBook Air in the computer lab. It matches your description...',
    time: '5 hours ago',
    read: false,
  },
  {
    id: 3,
    from: 'Emma Wilson',
    subject: 'Thank you for finding my keys!',
    preview: 'Thank you so much for finding my keys. When would be a good time to meet?',
    time: '1 day ago',
    read: true,
  },
];

const dummySent = [
  {
    id: 4,
    to: 'Alex Rodriguez',
    subject: 'About the blue backpack',
    preview: 'Hi Alex, I saw your post about the blue backpack. I think it might be mine...',
    time: '3 hours ago',
  },
  {
    id: 5,
    to: 'Jessica Lee',
    subject: 'Water bottle found',
    preview: 'I found a red water bottle in the gym. Is this yours?',
    time: '2 days ago',
  },
];

export default function Messages() {
  const [tab, setTab] = useState('inbox');

  const renderMessage = (msg, type) => (
    <div
      key={msg.id}
      className={`p-4 rounded-lg border hover:bg-base-200 transition cursor-pointer ${
        type === 'inbox' && !msg.read ? 'bg-primary/10 border-primary' : ''
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold">{type === 'inbox' ? msg.from : msg.to}</h3>
          <p className="text-sm font-medium">{msg.subject}</p>
          <p className="text-sm text-gray-500 line-clamp-2">{msg.preview}</p>
        </div>
        <span className="text-xs text-gray-400 whitespace-nowrap">{msg.time}</span>
      </div>
    </div>
  );

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
            Inbox ({dummyInbox.length})
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
        {tab === 'inbox'
          ? dummyInbox.map((msg) => renderMessage(msg, 'inbox'))
          : dummySent.map((msg) => renderMessage(msg, 'sent'))}
      </div>
    </div>
  );
}
