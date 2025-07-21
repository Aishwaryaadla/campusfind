import React, { useState } from "react";

const LostPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    dateLost: "",
    rollNo: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    // Make API call here
    console.log("Submitting Lost Item Report:", formData);

    alert("🎉 Your report has been submitted!");
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4 flex justify-center items-start">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          📢 Report a Lost Item
        </h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-control mb-4">
            <label className="label">
              <span className="label font-medium">Item Name</span>
            </label>
            <input
              type="text"
              name="name"
              className="input input-bordered"
              placeholder="e.g. Calculator, ID Card"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label font-medium">Description</span>
            </label>
            <textarea
              name="description"
              className="textarea textarea-bordered"
              placeholder="Short description about the item"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label font-medium">Location Last Seen</span>
            </label>
            <input
              type="text"
              name="location"
              className="input input-bordered"
              placeholder="e.g. Library, Cafeteria"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label font-medium">Date Lost</span>
            </label>
            <input
              type="date"
              name="dateLost"
              className="input input-bordered"
              value={formData.dateLost}
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

          <div className="form-control mb-6">
            <label className="label">
              <span className="label font-medium">Upload Image (optional)</span>
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="file-input file-input-bordered"
              onChange={handleChange}
            />
          </div>

          <div className="form-control">
            <button className="btn btn-primary">
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LostPage
