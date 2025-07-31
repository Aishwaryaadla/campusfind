import { PlusIcon, ExternalLink, Book, MapPin, Clock, Lightbulb, Search, Shield, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DashboardOverview() {
  const [userName, setUserName] = useState('');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };
  
  const quickLinks = [
    {
      title: 'College Portal',
      description: 'Access grades, schedules, and academic info',
      icon: Book,
      href: 'https://www.vce.ac.in/',
      external: true,
    },
    {
      title: 'Campus Map',
      description: 'Interactive map with building locations',
      icon: MapPin,
      href: '/coming-soon',
      external: true,
    },
    {
      title: 'Library Hours',
      description: 'Check current library hours and availability',
      icon: Clock,
      href: '/coming-soon',
      external: true,
    },
  ];

  const tips = [
    {
      title: "Lost Item Tip",
      description: "Check the exact location where you last remember having your item - most items are found within 50 feet of where they were lost",
      icon: Lightbulb,
    },
    {
      title: "Search Smart",
      description: "Use keywords to quickly find lost items.",
      icon: Search,
    },
    {
      title: "Be Specific",
      description: "Include specific details like building, room number, or nearby landmarks when reporting lost items",
      icon: Shield,
    },
    {
      title: "Stay Updated",
      description: "Check the website regularly for new item reports.",
      icon: Bell,
    },
  ];

  useEffect(() => {
    
    const token = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!token || !storedUser) return;

    setUserName(storedUser.name || 'User');
  
    const fetchData = async () => {
      try {
        const lostRes = await axios.get(`http://localhost:4000/api/lostitems/user/${storedUser.rollNo}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const foundRes = await axios.get(`http://localhost:4000/api/founditems/user/${storedUser.rollNo}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        const lostItems = lostRes.data.items || [];
        const foundItems = foundRes.data.items || [];
  
        const returnedLost = lostItems.filter((item) => item.isReturned).length;
        const returnedFound = foundItems.filter((item) => item.isReturned).length;
  
        setLostCount(lostItems.length);
        setFoundCount(foundItems.length);
        setReturnedCount(returnedLost + returnedFound);
      } catch (error) {
        console.error('Error fetching user item data:', error);
      }
    };
  
    fetchData();
  }, []);


  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
        <h1 className="text-2xl font-bold">
          {getGreeting()}, {userName}! 👋
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome back to CampusFind. Hope you're having a great semester!
        </p>
        </div>
        <div className="flex gap-2">
          <Link to="/lost" className="btn btn-primary">
            <PlusIcon className="w-4 h-4 mr-2" />
            Report Lost Item
          </Link>
          <Link to="/found" className="btn btn-outline">
            <PlusIcon className="w-4 h-4 mr-2" />
            Report Found Item
          </Link>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white">
        {quickLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target={link.external ? "_blank" : "_self"}
            rel={link.external ? "noopener noreferrer" : undefined}
            className="flex items-center gap-4 p-4 bg-base-100 rounded-lg hover:bg-base-300 transition-colors shadow-sm"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <link.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-medium">{link.title}</p>
                {link.external && (
                  <ExternalLink className="w-3 h-3 text-gray-500" />
                )}
              </div>
              <p className="text-sm text-gray-500">{link.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>

    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Helpful Tips</h2>
      <div className="space-y-4">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="flex items-start gap-4 bg-white p-4 rounded-lg "
          >
            <div className="p-2 bg-secondary/10 text-secondary rounded-full">
              <tip.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold">{tip.title}</p>
              <p className="text-sm text-base-content/70">{tip.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
