import React, { useState } from "react";
import { FaUser, FaTimes, FaChevronCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate


function UserProfile() {
  
  const navigate = useNavigate(); // Initialize navigate function
  
    const goBack = () => {
      navigate(-1); // Go back to the previous page
    };

  const [image, setImage] = useState(null); // State to store the uploaded image
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const [showDetailsModal, setShowDetailsModal] = useState(false); // State for Add/Change Details modal
  const [userDetails, setUserDetails] = useState({
    name: "",
    branch: "",
    year: "",
  }); // State for storing user details
  const [savedDetails, setSavedDetails] = useState(null); // State for saving user details

  

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set image to the uploaded file
      };
      reader.readAsDataURL(file); // Convert file to Base64
    }
  };

  // Handle input changes for user details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  // Save user details
  const saveDetails = () => {
    setSavedDetails(userDetails);
    setShowDetailsModal(false);
  };

  

  return (
    <div>
      <div className="flex justify-around items-center p-1 w-full">
        <div className="profile flex items-center justify-between w-96">
          <FaChevronCircleLeft onClick={goBack} // Trigger goBack function when clicked
          className="text-2xl cursor-pointer" />
          <a className="btn btn-ghost text-xl">Profile</a>
        </div>
        <button
          className="btn btn-square btn-ghost"
          onClick={() => setShowDetailsModal(true)} // Show Add/Change Details modal
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {/* User Profile Section */}
        <div
          className="user-profile relative w-48 h-48 rounded-full bg-gray-200 flex items-center justify-center shadow-md overflow-hidden cursor-pointer"
          onClick={() => setShowModal(true)} // Show modal for image upload
        >
          {/* Display uploaded image or default icon */}
          {image ? (
            <img
              src={image}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <FaUser className="text-gray-500 text-6xl" />
          )}
        </div>

        {/* Display saved details below the profile */}
        {savedDetails && (
          <div className="mt-4 text-center flex flex-col justify-center items-center">
            <p className="text-lg font-semibold">{savedDetails.name}</p>
            <p className="text-lg font-semibold">{savedDetails.branch}</p>
            <p className="text-lg font-semibold">{savedDetails.year}</p>
          </div>
        )}

        {/* Modal for Image Upload */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-bold mb-4">Profile Options</h2>
              <button
                className="block w-full mb-4 bg-blue-500 text-white py-2 px-4 rounded"
                onClick={() => setShowModal("seeProfile")} // Show profile
              >
                See Profile
              </button>
              <button
                className="block w-full bg-green-500 text-white py-2 px-4 rounded"
                onClick={() => {
                  setShowModal(false);
                  document.getElementById("imageUpload").click(); // Trigger file upload
                }}
              >
                Upload Profile
              </button>
            </div>
          </div>
        )}

        {/* Modal for Expanded Profile View */}
        {showModal === "seeProfile" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="relative bg-white p-6 rounded-lg shadow-lg">
              {/* Close Button */}
              <button
                className="absolute top-2 right-2 text-gray-500"
                onClick={() => setShowModal(false)}
              >
                <FaTimes className="text-xl" />
              </button>
              {/* Expanded Profile View */}
              {image ? (
                <img
                  src={image}
                  alt="User Avatar"
                  className="w-96 h-96 rounded-full object-cover"
                />
              ) : (
                <FaUser className="text-gray-500 text-9xl" />
              )}
            </div>
          </div>
        )}

        {/* Modal for Add/Change Details */}
        {showDetailsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Add/Change Details</h2>
              <div className="mb-4">
                <label className="block text-left text-sm font-medium mb-2">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={userDetails.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-left text-sm font-medium mb-2">
                  Branch:
                </label>
                <input
                  type="text"
                  name="branch"
                  value={userDetails.branch}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-left text-sm font-medium mb-2">
                  Year:
                </label>
                <input
                  type="text"
                  name="year"
                  value={userDetails.year}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <button
                className="w-full bg-green-500 text-white py-2 px-4 rounded"
                onClick={saveDetails} // Save details
              >
                Save
              </button>
            </div>
          </div>
        )}

        {/* Hidden file input */}
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>
    </div>
  );
}

export default UserProfile;
