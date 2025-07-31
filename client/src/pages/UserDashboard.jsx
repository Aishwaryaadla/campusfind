
import { useEffect, useState } from 'react';
import {
  Home,
  Search,
  Eye,
  User,
  LogOut,
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import DashboardOverview from './dashboard/DashboardOverview';
import LostItems from './dashboard/LostItems';
import FoundItems from './dashboard/FoundItems';
import ProfileSettings from './dashboard/ProfileSettings';

const navigationItems = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'lost-items', label: 'Lost Items', icon: Search },
  { id: 'found-items', label: 'Found Items', icon: Eye },
  { id: 'profile', label: 'Profile', icon: User },
];

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found");
        navigate('/login');
        return;
      }

      try {
        const res = await axios.get("http://localhost:4000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        toast.error('Session expired or unauthorized. Please log in again.');
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleSignOut = () => {
    const confirmLogout = window.confirm("Are you sure you want to sign out?");
    if (!confirmLogout) return;

    localStorage.removeItem('token');
    toast.success('Signed out successfully');
    navigate('/', { replace: true });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
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

  const getInitials = (name) => {
    return name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      <header className="bg-base-100 border-b shadow-sm sticky top-0 z-50">
        <div className="flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold text-primary">CampusFind</h1>
          <div className="flex items-center gap-4">
            {user && (
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-10">
                  <span>{getInitials(user.name)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="w-64 bg-white border-r p-4 hidden md:block">
          <div className="flex flex-col gap-2">
            {user && (
              <div className="flex items-center gap-3 mb-6">
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content rounded-full w-12">
                    <span>{getInitials(user.name)}</span>
                  </div>
                </div>
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.rollNo}</p>
                </div>
              </div>
            )}

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

            <button
              onClick={handleSignOut}
              className="btn btn-ghost btn-sm justify-start gap-3"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </aside>

        <main className="flex-1 p-6 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
