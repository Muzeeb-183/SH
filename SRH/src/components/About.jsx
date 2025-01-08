import React from "react";
import { FaChevronCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function About() {
  const navigate = useNavigate(); // Initialize navigate function

  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div>
      {/* Icon placed at the top-left corner */}
      <div className=" text-3xl cursor-pointer"
        onClick={goBack} // Trigger goBack function when clicked
      >
        <FaChevronCircleLeft />
      </div>

      {/* Your main content */}
      <div className="diff aspect-[16/9]">
  <div className="diff-item-1 flex justify-center items-center">
    <div className="bg-primary text-primary-content grid place-content-center text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black">
      Developed by 
    </div>
  </div>
  <div className="diff-item-2 flex justify-center items-center">
    <div className="bg-base-200 grid place-content-center text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black">
      xxxxxx  & xxxxxx
    </div>
  </div>
  <div className="diff-resizer"></div>
</div>

    </div>
  );
}

export default About;

 