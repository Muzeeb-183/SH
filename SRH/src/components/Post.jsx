import React, { useState } from "react";
import { FaChevronCircleLeft } from "react-icons/fa";
import { IoMdPhotos } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai"; // Import the Plus icon
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'; // Import Link


function Post() {
  const navigate = useNavigate(); // Initialize navigate function

  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const [selectedYear, setSelectedYear] = useState("Year"); // State to store the selected dropdown value
  const [caption, setCaption] = useState(""); // State for caption
  const [selectedFiles, setSelectedFiles] = useState(null); // State for selected files
  const [previewImages, setPreviewImages] = useState([]); // State for image previews
  const [previewFiles, setPreviewFiles] = useState([]); // State for non-image file previews

  const handleSelection = (value) => {
    setSelectedYear(value); // Update the selected year and semester
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setSelectedFiles(files); // Store selected files

    let imagePreviews = [];
    let filePreviews = [];

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          imagePreviews.push(reader.result); // Add the image preview (Base64)
          if (imagePreviews.length === files.length) {
            setPreviewImages((prevImages) => [...prevImages, ...imagePreviews]); // Append the new images to existing previews
          }
        };
        reader.readAsDataURL(file); // Read the file as a data URL (Base64)
      } else if (file.type === "application/pdf") {
        filePreviews.push({ type: "pdf", name: file.name, icon: "📄" }); // PDF preview
      } else if (file.type === "application/msword" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        filePreviews.push({ type: "doc", name: file.name, icon: "📝" }); // DOC/DOCX preview
      } else {
        filePreviews.push({ type: "file", name: file.name, icon: "📂" }); // Other file types
      }
    });

    setPreviewFiles((prevFiles) => [...prevFiles, ...filePreviews]); // Append new file previews to existing ones
  };

  const triggerFileInput = () => {
    document.getElementById("file-input").click(); // Programmatically click the hidden file input
  };

  // const handleUpload = () => {
  //   if (caption.trim() === "") {
  //     alert("Please write a caption before uploading!"); // Show a pop-up if caption is empty
  //   } else {
  //     // Proceed with upload logic (you can add your API call here)
  //     alert("Post uploaded successfully!");
  //   }
  // };

  // Function to remove selected file preview
  const handleRemovePreview = (index, type) => {
    if (type === "image") {
      setPreviewImages((prevImages) => prevImages.filter((_, i) => i !== index));
    } else {
      setPreviewFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    }
  };

  const handleUpload = () => {
    if (caption.trim() === "") {
      alert("Please write a caption before uploading!"); // Show a pop-up if caption is empty
    } else {
      // Add the uploaded post to the posts array
      const newPost = {
        caption,
        files: previewImages.concat(previewFiles),
      };
      setPosts((prevPosts) => [...prevPosts, newPost]); // Update the posts state in the parent component
  
      alert("Post uploaded successfully!");
    }
  };
  

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-none text-3xl cursor-pointer mr-8">
          <FaChevronCircleLeft onClick={goBack} />
        </div>
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Create post</a>
        </div>
        <div className="flex-none">
          <a className="btn btn-ghost text-xl">Upload</a>
        </div>
      </div>

      <div className="border-2 border-gray-600 p-2 flex gap-4 items-center">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-12 rounded-full border-2 border-black">
           <Link to="/user">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
           </Link>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <h1 className="text-xl font-bold">Sam</h1>
          <div className="flex gap-4 items-center">
            <h2 className="font-semibold">USEFUL FOR:</h2>
            {/* Dropdown for Year */}
            <div className="dropdown">
              <label
                tabIndex={0}
                className="btn btn-outline btn-sm rounded px-4 hover:bg-gray-200"
              >
                {selectedYear}
              </label>
              <div
                tabIndex={0}
                className="dropdown-content menu shadow bg-base-100 rounded-box p-2 w-64"
              >
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleSelection("First[1-1]")}
                    className="btn btn-sm btn-outline hover:bg-blue-100"
                  >
                    First[1-1]
                  </button>
                  <button
                    onClick={() => handleSelection("First[1-2]")}
                    className="btn btn-sm btn-outline hover:bg-blue-100"
                  >
                    First[1-2]
                  </button>
                  <button
                    onClick={() => handleSelection("Second[2-1]")}
                    className="btn btn-sm btn-outline hover:bg-blue-100"
                  >
                    Second[2-1]
                  </button>
                  <button
                    onClick={() => handleSelection("Second[2-2]")}
                    className="btn btn-sm btn-outline hover:bg-blue-100"
                  >
                    Second[2-2]
                  </button>
                  <button
                    onClick={() => handleSelection("Third[3-1]")}
                    className="btn btn-sm btn-outline hover:bg-blue-100"
                  >
                    Third[3-1]
                  </button>
                  <button
                    onClick={() => handleSelection("Third[3-2]")}
                    className="btn btn-sm btn-outline hover:bg-blue-100"
                  >
                    Third[3-2]
                  </button>
                  <button
                    onClick={() => handleSelection("Fourth[4-1]")}
                    className="btn btn-sm btn-outline hover:bg-blue-100"
                  >
                    Fourth[4-1]
                  </button>
                  <button
                    onClick={() => handleSelection("Fourth[4-2]")}
                    className="btn btn-sm btn-outline hover:bg-blue-100"
                  >
                    Fourth[4-2]
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Caption Input */}
      <div className="mt-6 px-4">
        <textarea
          className="textarea textarea-bordered w-full"
          rows={4}
          placeholder="Write something about it"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        ></textarea>
      </div>

      {/* Icon and Text */}
      <div
        className="file-selection mt-4 flex items-center gap-2 px-4 cursor-pointer"
        onClick={triggerFileInput}
      >
        <IoMdPhotos className="text-3xl text-gray-500" />
        <span className="text-lg font-medium text-black">Images/Files</span>
      </div>

      {/* Hidden File Input */}
      <input
        id="file-input"
        type="file"
        className="hidden"
        accept=".png, .jpg, .jpeg, .pdf, .xlsx, .docx, .doc"
        onChange={handleFileChange}
        multiple
      />

      {/* Display Image Previews with Remove Button */}
      {previewImages.length > 0 && (
        <div className="mt-4 flex flex-wrap">
          {previewImages.map((preview, index) => (
            <div key={index} className="inline-block relative mr-4 mb-4">
              <img
                src={preview}
                alt={`preview-${index}`}
                className="w-20 h-20 object-cover rounded-md"
              />
              <button
                className="absolute top-0 right-0 text-white bg-red-500 rounded-full w-6 h-6 flex justify-center items-center"
                onClick={() => handleRemovePreview(index, "image")}
              >
                &times;
              </button>
            </div>
          ))}
          <div
            className="inline-block relative mr-4 mb-4 cursor-pointer"
            onClick={triggerFileInput}
          >
            <AiOutlinePlus className="text-3xl text-gray-500" />
          </div>
        </div>
      )}

      {/* Display File Previews with Remove Button */}
      {previewFiles.length > 0 && (
        <div className="mt-4 flex flex-wrap">
          {previewFiles.map((preview, index) => (
            <div key={index} className="inline-block relative mr-4 mb-4">
              <div className="flex items-center gap-2">
                <span>{preview.icon}</span>
                <p>{preview.name}</p>
              </div>
              <button
                className="absolute top-0 right-0 text-white bg-red-500 rounded-full w-6 h-6 flex justify-center items-center"
                onClick={() => handleRemovePreview(index, "file")}
              >
                &times;
              </button>
            </div>
          ))}
          <div
            className="inline-block relative mr-4 mb-4 cursor-pointer"
            onClick={triggerFileInput}
          >
            <AiOutlinePlus className="text-3xl text-gray-400" />
          </div>
        </div>
      )}

      {/* Upload Button */}
      <div className="mt-6 flex justify-center">
        <button className="btn btn-primary w-1/3" onClick={handleUpload}>
          Upload
        </button>
      </div>
    </div>
  );
}

export default Post;
