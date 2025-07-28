// import React, { useEffect, useState } from 'react';
// import ItemCard from '../components/ui/ItemCard';
// import InfoCard from '../components/ui/InfoCard';
// import axios from 'axios';

// const UserDashboard = () => {
//   const storedUser = localStorage.getItem("user");
//   const user = storedUser ? JSON.parse(storedUser) : null;

//   const [lostItems, setLostItems] = useState([]);
//   const [foundItems, setFoundItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user) return;

//     const fetchData = async () => {
//       try {
//         const lostRes = await axios.get(`/api/lostitems/user/${user.rollNo}`);
//         const foundRes = await axios.get(`/api/founditems/user/${user.rollNo}`);
//         setLostItems(lostRes?.data?.data ?? []);
//         setFoundItems(foundRes?.data?.data ?? []);
//       } catch (error) {
//         console.error('Error fetching user items', error);
//         setLostItems([]); // fallback
//         setFoundItems([]); // fallback
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [user]);

//   if (!user) {
//     return <p className="text-center mt-10 text-red-500">User not found. Please log in.</p>;
//   }

//   if (loading) return <p className="text-center mt-10">Loading your dashboard...</p>;

//   return (
//     <div className="min-h-screen p-6 md:p-12 bg-base-100">
//       <h1 className="text-3xl font-bold mb-8">Welcome, {user.name}</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//         <InfoCard title="Roll Number" description={user.rollNo} />
//         <InfoCard title="Branch" description={user.branch} />
//         <InfoCard title="Year" description={user.year} />
//       </div>

//       <div className="mb-10">
//         <h2 className="text-2xl font-semibold mb-4">Your Reported Lost Items</h2>
//         {(lostItems?.length ?? 0) === 0 ? (
//           <p className="text-sm text-gray-500">No lost items reported yet.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {lostItems.map((item) => (
//               <ItemCard
//                 key={item._id}
//                 id={item._id}
//                 title={item.name}
//                 description={item.description}
//                 image={item.imageUrl}
//                 itemType="lost"
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       <div>
//         <h2 className="text-2xl font-semibold mb-4">Your Reported Found Items</h2>
//         {(foundItems?.length ?? 0) === 0 ? (
//           <p className="text-sm text-gray-500">No found items reported yet.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {foundItems.map((item) => (
//               <ItemCard
//                 key={item._id}
//                 id={item._id}
//                 title={item.name}
//                 description={item.description}
//                 image={item.imageUrl}
//                 itemType="found"
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;


import { useState } from 'react';
import {
  Home,
  MessageSquare,
  Search,
  Eye,
  User,
  Settings,
  Bell,
  LogOut,
} from 'lucide-react';
import  DashboardOverview  from './dashboard/DashboardOverview';
import  Messages  from './dashboard/Messages';
import  LostItems  from './dashboard/LostItems';
import  FoundItems  from './dashboard/FoundItems';
import  ProfileSettings  from './dashboard/ProfileSettings';

const navigationItems = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'lost-items', label: 'Lost Items', icon: Search },
  { id: 'found-items', label: 'Found Items', icon: Eye },
  { id: 'profile', label: 'Profile', icon: User },
];

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'messages':
        return <Messages />;
      case 'lost-items':
        return <LostItems />;
      case 'found-items':
        return <FoundItems />;
      case 'profile':
        return <ProfileSettings />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      {/* Header */}
      <header className="bg-base-100 border-b shadow-sm sticky top-0 z-50">
        <div className="flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold text-primary">CampusFind</h1>
          <div className="flex items-center gap-4">
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content rounded-full w-10">
                <span>JD</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r p-4 hidden md:block">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-12">
                  <span>JD</span>
                </div>
              </div>
              <div>
                <p className="font-semibold">John Doe</p>
                <p className="text-sm text-gray-500">john.doe@university.edu</p>
              </div>
            </div>

            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`btn btn-sm justify-start gap-3 ${
                  activeTab === item.id ? 'btn-primary' : 'btn-ghost'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}

            <div className="divider my-4"></div>

            <button className="btn btn-ghost btn-sm justify-start gap-3">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
