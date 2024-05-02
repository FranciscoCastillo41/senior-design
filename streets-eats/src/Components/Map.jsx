import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../src/Services/firebase";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import firebase from 'firebase/compat/app';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import 'firebase/compat/firestore';

const MapContainer = () => {
  const apiKey = "AIzaSyDOE0uE8kfSvfbKTedyVilTdGQREbctsEk";
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [savedMarkers, setSavedMarkers] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        navigate('/signin');
      }
    });

    return unsubscribe;
  }, [navigate]);

  const mapOptions = {
    center: { lat: 32.7767, lng: -96.7970 },
    zoom: 12,
  };

  const handleMapClick = async (event) => {
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    setSavedMarkers((prevSavedMarkers) => [...prevSavedMarkers, newMarker]);

    // Update coordinates in Firestore if user is logged in
    if (user) {
      const userDocRef = doc(db, `users/${user.uid}`);
      try {
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          const updatedCoordinates = [...userData.coordinates, newMarker];
          await updateDoc(userDocRef, { coordinates: updatedCoordinates });
        }
      } catch (error) {
        console.error("Error updating coordinates:", error);
      }
    }
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={{ height: "100%", width: "100%" }}
          options={mapOptions}
          onClick={handleMapClick}
        >
          {markers.map((marker, index) => (
            <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapContainer;
