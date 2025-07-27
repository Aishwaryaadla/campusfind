import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

const AdminDashboard = () => {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);

  useEffect(() => {
    fetchLostItems();
    fetchFoundItems();

    socket.on('connect', () => {
      console.log('WebSocket connected:', socket.id);
    });
  
    // 👇 When a new lost item is added, refresh the list
    socket.on('new-lost-item', (newItem) => {
      console.log('Received new lost item:', newItem);
      setLostItems((prev) => [newItem, ...prev]);
      // OR: fetchLostItems(); // if you prefer full refresh
    });
  
    return () => {
      socket.off('new-lost-item');
      socket.disconnect(); // clean up on unmount
    };
  }, []);

  const fetchLostItems = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/lostitems");
      const data = await res.json();
      setLostItems(data.data);
    } catch (err) {
      console.error("Failed to fetch lost items");
    }
  };

  const fetchFoundItems = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/founditems");
      const data = await res.json();
      setFoundItems(data.data);
    } catch (err) {
      console.error("Failed to fetch found items");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="stats bg-base-200 shadow">
          <div className="stat">
            <div className="stat-title">Total Lost Items</div>
            <div className="stat-value">{lostItems.length}</div>
          </div>
        </div>
        <div className="stats bg-base-200 shadow">
          <div className="stat">
            <div className="stat-title">Total Found Items</div>
            <div className="stat-value">{foundItems.length}</div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Lost Items</h2>
        <table className="table w-full mb-8">
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Reported By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lostItems.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.location}</td>
                <td>{item.reportedBy?.rollNo}</td>
                <td>
                  <button className="btn btn-xs btn-error mr-2">Delete</button>
                  <button className="btn btn-xs btn-success">Mark Returned</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="text-xl font-semibold mb-4">Found Items</h2>
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Reported By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {foundItems.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.location}</td>
                <td>{item.reportedBy?.rollNo}</td>
                <td>
                  <button className="btn btn-xs btn-error mr-2">Delete</button>
                  <button className="btn btn-xs btn-success">Mark Returned</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
