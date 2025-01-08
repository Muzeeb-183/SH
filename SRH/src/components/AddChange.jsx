import React, { useState } from 'react';

function AddChange() {
  // State to store form values
  const [formData, setFormData] = useState({
    name: '',
    year: '',
    branch: '',
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="add-change-container p-6 bg-white shadow-md rounded-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add/Change Details</h2>
      <form onSubmit={handleSubmit}>
        {/* Name input */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Year input */}
        <div className="mb-4">
          <label htmlFor="year" className="block text-sm font-medium text-gray-700">
            Year
          </label>
          <input
            type="text"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Branch input */}
        <div className="mb-4">
          <label htmlFor="branch" className="block text-sm font-medium text-gray-700">
            Branch
          </label>
          <input
            type="text"
            id="branch"
            name="branch"
            value={formData.branch}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddChange;