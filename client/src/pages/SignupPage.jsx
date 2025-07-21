import React from 'react'
import { useState } from "react";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    password: "",
    confirmPassword: "",
    branch: "",
    year: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("Signup Data:", formData);
    alert("Signup successful");

    setFormData({
      name: "",
      rollNo: "",
      password: "",
      confirmPassword: "",
      branch: "",
      year: "",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Signup</h2>

        <input
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <input
          type="text"
          placeholder="Roll Number (1602-XX-XXX-XXX)"
          name="rollNo"
          value={formData.rollNo}
          onChange={handleChange}
          className="input input-bordered w-full"
          pattern="1602-[0-9]{2}-[0-9]{3}-[0-9]{3}"
          required
        />


        <select
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
        >
          <option value="">Select Branch</option>
          <option>CSE</option>
          <option>IT</option>
          <option>ECE</option>
          <option>EEE</option>
          <option>MECH</option>
          <option>CIVIL</option>
        </select>

        <select
          name="year"
          value={formData.year}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
        >
          <option value="">Select Year</option>
          <option>1st Year</option>
          <option>2nd Year</option>
          <option>3rd Year</option>
          <option>4th Year</option>
        </select>

        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <button type="submit" className="btn btn-primary w-full">
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default SignupPage
