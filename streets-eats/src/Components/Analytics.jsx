import React, { useState, useEffect } from "react";
import { db, auth } from "../Services/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

const Analytics = () => {
  const [postCount, setPostCount] = useState(0);
  const [coordinateCount, setCoordinateCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [savedCoordinates, setSavedCoordinates] = useState([]);
  const [savedEvents, setSavedEvents] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user) return;

        // Query posts collection for posts with user's ID
        const q = query(
          collection(db, "posts"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);

        // Set post count to the number of documents returned by the query
        setPostCount(querySnapshot.size);

        // Fetch user document for other analytics data if needed
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        const userData = userDocSnap.data();
        setCoordinateCount(userData.coordinates.length);
        setEventCount(userData.saved_events.length);

        // Set saved coordinates
        setSavedCoordinates(userData.coordinates);

        // Set saved events
        setSavedEvents(userData.saved_events);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, [user]);

  // Function to handle saving events
  const handleSaveEvent = async (event) => {
    try {
      if (!user) {
        // Handle the case where user is not logged in
        console.error("You need to be logged in to save events.");
        return;
      }

      // Get reference to the user document
      const userDocRef = doc(db, "users", user.uid);

      // Update user document to add event to saved_events array
      await updateDoc(userDocRef, {
        saved_events: arrayUnion(event),
      });

      // Success message
      console.log("Event saved successfully!");
    } catch (error) {
      console.error("Error saving event:", error.message);
    }
  };

  return (
    <div className="containe min-h-screen p-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Number of Posts</h2>
          <p className="text-gray-700 text-lg">{postCount}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            Number of Saved Coordinates
          </h2>
          <p className="text-gray-700 text-lg">{coordinateCount}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Number of Saved Events</h2>
          <p className="text-gray-700 text-lg">{eventCount}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 col-span-3">
          <h2 className="text-xl font-semibold mb-4">Saved Coordinates</h2>
          <ul className="text-gray-700 text-lg">
            {savedCoordinates.map((coordinate, index) => (
              <li
                key={index}
              >{`Lat: ${coordinate.lat}, Lng: ${coordinate.lng}`}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 col-span-3">
          <h2 className="text-xl font-semibold mb-4">Saved Events</h2>
          <ul className="text-gray-700 text-lg">
            {savedEvents.map((event, index) => (
              <li key={index}>{/* Render event details here */}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Analytics;


