import React, { useState } from "react";
import axios from 'axios';


const FoundPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    dateFound: "",
    tags: "",
    image: null,
    location : "",
    rollNo : ""
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post("http://localhost:4000/api/founditems", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Submitted successfully:", response.data);
      alert("🎉 Your found item has been reported!");
      
      setFormData({
        name: "",
        description: "",
        location: "",
        dateFound: "",
        rollNo: "",
        image: null,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("❌ Submission failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4 flex justify-center items-start">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6">📦 Report Found Item</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label font-medium">Item Name</label>
            <input
              type="text"
              name="name"
              className="input input-bordered"
              placeholder="Wallet, Phone, etc."
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control">
            <label className="label font-medium">Description</label>
            <textarea
              name="description"
              className="textarea textarea-bordered"
              placeholder="Short details about the item(color,brand,etc...)"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label font-medium">Location Found</span>
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="E.g., Library 1st floor"
              required
            />
          </div>

          <div className="form-control">
            <label className="label font-medium">Date Found</label>
            <input
              type="date"
              name="dateFound"
              className="input input-bordered"
              value={formData.dateFound}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label font-medium">Roll Number</span>
            </label>
            <input
              type="text"
              name="rollNo"
              className="input input-bordered"
              placeholder="1602-XX-XXX-XXX"
              value={formData.rollNo}
              onChange={handleChange}
              pattern="1602-[0-9]{2}-[0-9]{3}-[0-9]{3}"
              required
            />
          </div>

          <div className="form-control">
            <label className="label font-medium">Upload Image</label>
            <input
              type="file"
              name="image"
              className="file-input file-input-bordered w-full"
              onChange={handleChange}
              accept="image/*"
            />
          </div>

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary w-full">
              Submit Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FoundPage;
