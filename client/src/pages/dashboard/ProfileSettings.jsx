import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProfileSettings() {
  // const [user, setUser] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found");
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
      }
    };

    fetchUserProfile();
  }, []);

  if (!user) return <div className="p-4">Loading profile...</div>;

  return (
    <div className="space-y-4">
    <h2 className="text-xl font-bold">Profile Details</h2>
    <p><strong>Name:</strong> {user?.name}</p>
    <p><strong>Roll No:</strong> {user?.rollNo}</p>
    <p><strong>Email:</strong> {user?.email || `${user?.rollNo}@vce.ac.in`}</p>
    <p><strong>Branch:</strong> {user?.branch}</p>
    <p><strong>Year:</strong> {user?.year}</p>
  </div>
  );
}
