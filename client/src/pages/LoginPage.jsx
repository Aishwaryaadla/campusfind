import React from 'react'
import { useState } from "react"
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    rollNo: "",
    password: "",
    adminId:""
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const payload = isAdmin
        ? { adminId: formData.adminId, password: formData.password }
        : { rollNo: formData.rollNo, password: formData.password };

      const url = isAdmin
        ? "http://localhost:4000/api/admin/login"
        : "http://localhost:4000/api/auth/login";

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        // alert(data.message || "Login Successful");
        localStorage.setItem("user", JSON.stringify(data.user  || { role: "admin" }));
        setFormData({
          rollNo: "",
          password: "",
          adminId: ""
        });        
        navigate(isAdmin ? "/admin/dashboard" : "/user/dashboard");
        // You can optionally store user data
        // localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        alert(data.message || "Login Failed");
      }
  
    } catch (err) {
      console.error("Login Error:", err);
      alert("Something went wrong");
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-sm shadow-2xl bg-white">
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
