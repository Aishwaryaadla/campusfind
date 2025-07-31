
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProfileSettings() {
  const [user, setUser] = useState(null);

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmDelete) return;
  
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found");
      return;
    }
  
    try {
      await axios.delete("http://localhost:4000/api/users/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("token");
      alert("Account deleted successfully.");
      window.location.href = "/"; // redirect to homepage or login
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account. Please try again.");
    }
  };
  

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
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Profile Settings</h1>
        <p className="text-sm text-gray-500">Manage your account</p>
      </div>

      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          {/* Profile Info */}
          {/* <div className="flex items-center gap-4">
            <div className="avatar">
              <div className="w-20 h-20 rounded-full bg-neutral text-white flex items-center justify-center text-3xl font-bold leading-none">
                {user.name?.charAt(0).toUpperCase() || "?"}
              </div>
            </div>
          </div> */}

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <label className="label-text">Full Name</label>
              <input className="input input-bordered w-full" value={user.name} readOnly />
            </div>
            <div>
              <label className="label-text">Roll No</label>
              <input className="input input-bordered w-full" value={user.rollNo} readOnly />
            </div>
            <div>
              <label className="label-text">Email</label>
              <input
                className="input input-bordered w-full"
                value={user.email || `${user.rollNo}@vce.ac.in`}
                readOnly
              />
            </div>
            <div>
              <label className="label-text">Phone (optional)</label>
              <input className="input input-bordered w-full" placeholder="Not Provided" disabled />
            </div>
            <div>
              <label className="label-text">Branch</label>
              <input className="input input-bordered w-full" value={user.branch} readOnly />
            </div>
            <div>
              <label className="label-text">Year</label>
              <input className="input input-bordered w-full" value={user.year} readOnly />
            </div>
          </div>


          <div className="mt-6">
            <button
              className="btn bg-red-600 hover:bg-red-700 text-white font-semibold"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

