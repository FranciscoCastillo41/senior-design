import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../../src/Services/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      setUsername(currentUser.displayName || "");
    }
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userRef = doc(db, "users", user.uid);
      const dataToUpdate = {};

      if (username !== user.displayName) {
        dataToUpdate.displayName = username;
      }

      if (profileImage) {
        dataToUpdate.profileImageUrl = URL.createObjectURL(profileImage);
      }

      await updateDoc(userRef, dataToUpdate);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="containe min-h-screen p-5">
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                      username/
                    </span>
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={handleUsernameChange}
                      autoComplete="username"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="janesmith"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  About
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about yourself.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  {/* Display the selected profile image if available */}
                  {profileImage ? (
                    <img
                      src={URL.createObjectURL(profileImage)}
                      alt="Profile"
                      className="h-12 w-12 rounded-full"
                    />
                  ) : (
                    // Display default user icon if no profile image selected
                    <UserCircleIcon
                      className="h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                  )}
                  {/* Input field for selecting profile image */}
                  <input
                    type="file"
                    id="profileImage"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <label
                    htmlFor="profileImage"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer"
                  >
                    Change
                  </label>
                </div>
                <div className="pt-5">
                <button
                  type="submit"
                  className="rounded-md bg-blue-600 text-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-blue-700"
                >
                  Save Changes
                </button>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}


