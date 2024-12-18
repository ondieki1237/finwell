import React, { useState } from "react";
import Dashboard from "./Dashboard"; // Import the Dashboard component
import "./ProfilePage.css";

const ProfilePage = () => {
  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/150" // Default placeholder image
  );
  const [userInfo, setUserInfo] = useState({
    username: "Nora Tsunoda",
    email: "nora@example.com",
    dob: "1990-01-01",
    location: "New York, USA",
    accountCreated: "2023-01-15",
    lastLogin: "2024-12-18",
    accountStatus: "Active",
    socialLinks: {
      facebook: "https://facebook.com/nora",
      twitter: "https://twitter.com/nora",
      linkedin: "https://linkedin.com/in/nora",
    },
  });

  const [darkMode, setDarkMode] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`profile-container ${darkMode ? "dark" : "light"}`}>
      <div className="profile-header">
        <div className="profile-picture">
          <img src={profileImage} alt="Profile" />
          <label className="upload-btn">
            Upload Photo
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </label>
        </div>
        <div className="user-details">
          <h2>{userInfo.username}</h2>
          <p>{userInfo.accountStatus} - Security Lead</p>
        </div>
      </div>

      {/* Pass the username to the Dashboard */}
      <Dashboard username={userInfo.username} />
    </div>
  );
};

export default ProfilePage;
