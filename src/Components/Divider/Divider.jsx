import React from "react";
import "./Divider.css";   // <-- अपनी CSS फाइल को import किया

const Divider = () => {
  return (
    <div className="shape-divider">
      <svg
        width="100%"
        height="150"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#1A7F42"
          d="M1440,0L1392,64C1344,128,1248,256,1152,256C1056,256,960,128,864,85.3C768,43,672,85,576,106.7C480,128,384,128,288,106.7C192,85,96,43,48,21.3L0,0L0,320L48,320C96,320,192,320,288,320C384,320,480,320,576,320C672,320,768,320,864,320C960,320,1056,320,1152,320C1248,320,1344,320,1392,320L1440,320Z"
        />
      </svg>
    </div>
  );
};

export default Divider;
