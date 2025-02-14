import React, { useState } from "react";
import { FaChevronCircleLeft } from "react-icons/fa";
import { IoMdPhotos } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Post() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const [caption, setCaption] = useState("");
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [previewFiles, setPreviewFiles] = useState([]);

  // Dropdown states
  const [selectedRegulation, setSelectedRegulation] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");

  // Handle dropdown changes and reset dependent fields when a selection changes
  const handleDropdownChange = (e, type) => {
    const value = e.target.value;
    if (type === "regulation") {
      setSelectedRegulation(value);
      setSelectedBranch("");
      setSelectedSemester("");
      setSelectedSubject("");
      setSelectedMaterial("");
    } else if (type === "branch") {
      setSelectedBranch(value);
      setSelectedSemester("");
      setSelectedSubject("");
      setSelectedMaterial("");
    } else if (type === "semester") {
      setSelectedSemester(value);
      setSelectedSubject("");
      setSelectedMaterial("");
    } else if (type === "subject") {
      setSelectedSubject(value);
      setSelectedMaterial("");
    }
  };

  // Material options change
  const handleMaterialChange = (material) => {
    setSelectedMaterial(material);
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setSelectedFiles(files);

    let imagePreviews = [];
    let filePreviews = [];

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          imagePreviews.push(reader.result);
          if (imagePreviews.length === files.length) {
            setPreviewImages((prevImages) => [...prevImages, ...imagePreviews]);
          }
        };
        reader.readAsDataURL(file);
      } else if (file.type === "application/pdf") {
        filePreviews.push({ type: "pdf", name: file.name, icon: "📄" });
      } else if (
        file.type === "application/msword" ||
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        filePreviews.push({ type: "doc", name: file.name, icon: "📝" });
      } else {
        filePreviews.push({ type: "file", name: file.name, icon: "📂" });
      }
    });

    setPreviewFiles((prevFiles) => [...prevFiles, ...filePreviews]);
  };

  const triggerFileInput = () => {
    document.getElementById("file-input").click();
  };

  const handleRemovePreview = (index, type) => {
    if (type === "image") {
      setPreviewImages((prevImages) => prevImages.filter((_, i) => i !== index));
    } else {
      setPreviewFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    }
  };

  // Updated handleUpload to send a POST request to your backend
  const handleUpload = async () => {
    if (caption.trim() === "") {
      alert("Please write a caption before uploading!");
      return;
    }

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("regulation", selectedRegulation);
    formData.append("branch", selectedBranch);
    formData.append("semester", selectedSemester);
    formData.append("subject", selectedSubject);
    formData.append("material", selectedMaterial);

    // Append each file
    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("files", selectedFiles[i]);
      }
    }

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("Upload Response:", data);
      alert("Post uploaded successfully!");
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Error uploading files.");
    }
  };

  return (
    <div>
      {/* Navbar */}
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

      {/* User & Inline Dropdown Section */}
      <div className="border-2 border-gray-600 p-2 flex items-center gap-4">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-12 rounded-full border-2 border-black">
            <Link to="/user">
              <img
                alt="Avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </Link>
          </div>
        </div>

        {/* Inline Dropdowns */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Regulation Dropdown - always visible */}
          <select
            onChange={(e) => handleDropdownChange(e, "regulation")}
            value={selectedRegulation}
            className="select select-bordered"
          >
            <option value="">Select Regulation</option>
            <option value="AR20">AR20</option>
            <option value="AR23">AR23</option>
          </select>

          {/* Branch Dropdown - appears to the right of Regulation */}
          {selectedRegulation && (
            <select
              onChange={(e) => handleDropdownChange(e, "branch")}
              value={selectedBranch}
              className="select select-bordered"
            >
              <option value="">Select Branch</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
            </select>
          )}

          {/* Semester Dropdown - appears to the right of Branch */}
          {selectedBranch && (
            <select
              onChange={(e) => handleDropdownChange(e, "semester")}
              value={selectedSemester}
              className="select select-bordered"
            >
              <option value="">Select Semester</option>
              <option value="1-1">1-1</option>
              <option value="1-2">1-2</option>
              <option value="2-1">2-1</option>
              <option value="2-2">2-2</option>
              <option value="3-1">3-1</option>
              <option value="3-2">3-2</option>
              <option value="4-1">4-1</option>
              <option value="4-2">4-2</option>
            </select>
          )}

          {/* Subject Dropdown - appears to the right of Semester */}
          {selectedSemester && (
            <select
              onChange={(e) => handleDropdownChange(e, "subject")}
              value={selectedSubject}
              className="select select-bordered"
            >
              <option value="">Select Subject</option>
              <option value="Maths">Maths</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="English">English</option>
              {/* Add more subjects as needed */}
            </select>
          )}
        </div>
      </div>

      {/* Material Options - appear below when subject is selected */}
      {selectedSubject && (
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            className={`btn ${selectedMaterial === "Question Bank" ? "btn-primary" : "btn-outline"}`}
            onClick={() => handleMaterialChange("Question Bank")}
          >
            Question Bank
          </button>
          <button
            className={`btn ${selectedMaterial === "Model Paper" ? "btn-primary" : "btn-outline"}`}
            onClick={() => handleMaterialChange("Model Paper")}
          >
            Model Paper
          </button>
          <button
            className={`btn ${selectedMaterial === "Supply Paper" ? "btn-primary" : "btn-outline"}`}
            onClick={() => handleMaterialChange("Supply Paper")}
          >
            Supply Paper
          </button>
          <button
            className={`btn ${selectedMaterial === "Mid Papers" ? "btn-primary" : "btn-outline"}`}
            onClick={() => handleMaterialChange("Mid Papers")}
          >
            Mid Papers
          </button>
          <button
            className={`btn ${selectedMaterial === "Sem Paper" ? "btn-primary" : "btn-outline"}`}
            onClick={() => handleMaterialChange("Sem Paper")}
          >
            Sem Paper
          </button>
          <button
            className={`btn ${selectedMaterial === "Others" ? "btn-primary" : "btn-outline"}`}
            onClick={() => handleMaterialChange("Others")}
          >
            Others
          </button>
        </div>
      )}

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

      {/* File Selection */}
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

      {/* Image Previews */}
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
        </div>
      )}

      {/* File Previews */}
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
