import React, { useRef } from "react";
import { IoMdHome, IoMdPhotos } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'; // Import Link


function Explore( { posts } ) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null); // Reference to the file input

  const handleInputClick = () => {
    navigate("/post"); // Navigate to the Post component
  };
  

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <IoMdHome className="text-4xl m-5 cursor-pointer" />
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a href="/user" className="justify-between">
                  Profile
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <Link to="/">
              <li>
                <a>Logout</a>
              </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className=" post flex items-center bg-base-100 px-4 py-3">
        <input
          type="text"
          placeholder="Upload something helpful to your mates"
          className="input input-bordered w-full rounded-full p-3 text-sm cursor-pointer"
          onClick={handleInputClick} // Trigger navigation on click
        />
        {/* Photos Icon */}
        <IoMdPhotos
          className="text-4xl cursor-pointer text-gray-500 relative right-12"
          onClick={handleInputClick} // Trigger file input on click
        />
      </div>

       {/* Display Posts */}
      <div className="explore-posts">
        {posts.map((post, index) => (
          <div key={index} className="post-item mt-6">
            <div className="caption">
              <h3>{post.caption}</h3>
            </div>

            <div className="files">
              {post.files.map((file, idx) => (
                <div key={idx} className="file-item">
                  {/* Check if it's an image or file */}
                  {file.type === "image" ? (
                    <img
                      src={file}
                      alt={`post-file-${idx}`}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  ) : (
                    <p>{file.icon} {file.name}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Explore;
  