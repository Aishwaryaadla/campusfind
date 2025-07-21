import React from 'react'
import { useState } from "react"

const LoginPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    rollNo: "",
    password: "",
    adminId: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAdmin) {
      console.log("Admin Login:", formData.adminId, formData.password);
    } else {
      console.log("User Login:", formData.rollNo, formData.password);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-2">
            {isAdmin ? "Admin Login" : "User Login"}
          </h2>

          {/* Toggle */}
          <div className="form-control mb-2">
            <label className="label cursor-pointer justify-center gap-2">
              <span className="label-text">User</span>
              <input
                type="checkbox"
                className="toggle"
                checked={isAdmin}
                onChange={() => setIsAdmin(!isAdmin)}
              />
              <span className="label-text">Admin</span>
            </label>
          </div>

          <form onSubmit={handleSubmit}>
            {isAdmin ? (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Admin ID</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Admin ID"
                  className="input input-bordered"
                  name="adminId"
                  value={formData.adminId}
                  onChange={handleChange}
                  required
                />
              </div>
            ) : (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Roll Number</span>
                </label>
                <input
                  type="text"
                  placeholder="1602-XX-XXX-XXX"
                  className="input input-bordered"
                  name="rollNo"
                  value={formData.rollNo}
                  onChange={handleChange}
                  pattern="1602-[0-9]{2}-[0-9]{3}-[0-9]{3}"
                  required
                />
              </div>
            )}

            {/* Password */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="input input-bordered"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary">
                {isAdmin ? "Login as Admin" : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
