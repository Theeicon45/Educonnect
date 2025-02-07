import { useState, useEffect } from "react";
import ProfilePictureEdit from "../TeacherComponents/ProfilePictureEdit"; // Import modal component
import { manavatar } from "../Utils/images"; // Default avatar
import { MdEdit, MdOutlineDelete } from "react-icons/md"; // Icons
import { message } from "antd";

const ProfileEditManagement = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [profilePicture, setProfilePicture] = useState(manavatar);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [croppedImage, setCroppedImage] = useState(null);

  // Fetch initial profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from local storage
        if (!token) throw new Error("No token found");

        const response = await fetch(
          "http://localhost:3000/api/get-teacher-profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch profile");

        const data = await response.json();
        setFirstName(data.firstName); // Set first name
        setLastName(data.lastName); // Set last name
        setName(`${data.firstName} ${data.lastName}`); // Set full name
        setEmail(data.email);

        if (data.picturePath)
          setProfilePicture(`http://localhost:3000${data.picturePath}`);
      } catch (error) {
        console.error("Error fetching profile:", error);
        message.error("Failed to load profile data.");
      }
    };

    fetchProfile();
  }, []);

  // Open & Close Modal Handlers
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  // Save Profile Picture Handler
  const handleSaveProfilePicture = async (croppedImage) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized");

      // Convert base64 to Blob
      const response = await fetch(croppedImage);
      const blob = await response.blob();
      const file = new File([blob], "profile.jpg", { type: "image/jpeg" });

      const formData = new FormData();
      formData.append("profilePicture", file);
      formData.append("name", name);
      formData.append("email", email);

      const res = await fetch(
        "http://localhost:3000/api/update-teacher-profile",
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Failed to update profile");

      const data = await res.json();
      setProfilePicture(`http://localhost:3000${data.picturePath}`);
      message.success("Profile updated successfully!");
      closeModal();
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error("Profile update failed.");
    }
  };

  // Save Changes Handler (for form)
  const handleSaveChanges = async () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      message.error("All fields are required.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized");

      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);

      if (croppedImage) {
        const response = await fetch(croppedImage);
        const blob = await response.blob();
        const file = new File([blob], "profile.jpg", { type: "image/jpeg" });
        formData.append("profilePicture", file);
      }

      const response = await fetch(
        "http://localhost:3000/api/update-teacher-profile",
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to update profile");

      const data = await response.json();
      setProfilePicture(`http://localhost:3000${data.picturePath}`);
      message.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error saving profile changes:", error);
      message.error("Failed to update profile.");
    }
  };

  // Update name dynamically when first or last name changes
  useEffect(() => {
    setName(`${firstName} ${lastName}`);
  }, [firstName, lastName]);

  return (
    <div className="flex flex-col items-center p-6 w-full max-w-2xl mx-auto">
      <h1 className="font-semibold text-2xl mb-4">Edit Profile</h1>

      {/* Profile Image & Buttons in Flex Layout */}
      <div className="flex items-center justify-between w-full mb-6">
        {/* Profile Picture */}
        <div className="relative w-[120px] h-[120px]">
          <img
            src={profilePicture}
            alt="Profile Avatar"
            className="w-full h-full rounded-full border-4 border-gray-300 shadow-lg"
          />
          {/* Edit (Camera) Icon */}
          <div
            onClick={openModal}
            className="absolute bottom-2 right-2 bg-gray-300 p-2 rounded-full border-2 border-white shadow-md cursor-pointer hover:bg-gray-400 transition"
          >
            <MdEdit className="text-gray-700 text-lg" />
          </div>
        </div>

        {/* Edit & Delete Buttons */}
        <div className="flex gap-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 transition rounded-lg px-6 py-2 flex items-center gap-2 text-white font-semibold shadow-md"
            onClick={openModal}
          >
            <MdEdit />
            Edit
          </button>
          <button
            className="bg-gray-200 hover:bg-gray-300 transition rounded-lg px-6 py-2 flex items-center gap-2 font-semibold shadow-md"
            onClick={() => setProfilePicture(manavatar)}
          >
            <MdOutlineDelete className="text-red-500 text-xl" />
            Delete Avatar
          </button>
        </div>
      </div>

      {/* Name & Email Form */}
      <div className="w-full">
        {/* First Name Field */}
        <label className="block font-bold text-lg mb-2">First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          className="w-full p-3 border rounded-lg mb-4 font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Last Name Field */}
        <label className="block font-bold text-lg mb-2">Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          className="w-full p-3 border rounded-lg mb-4 font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Email Field */}
        <label className="block font-bold text-lg mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 border rounded-lg mb-4 font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Save Changes Button */}
      <button
        className="bg-blue-500 hover:bg-green-600 transition rounded-lg px-6 py-3 text-white font-semibold shadow-md"
        onClick={handleSaveChanges}
      >
        Save Changes
      </button>

      {/* Modal for Profile Picture Edit */}
      <ProfilePictureEdit
        visible={modalVisible}
        onClose={closeModal}
        onSave={handleSaveProfilePicture}
      />
    </div>
  );
};

export default ProfileEditManagement;
