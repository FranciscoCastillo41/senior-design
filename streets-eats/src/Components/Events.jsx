import { useState, useEffect } from 'react';
import { db, auth } from "../Services/firebase";
import { collection, addDoc, doc, getDocs, getDoc, query, where, updateDoc, arrayUnion } from "firebase/firestore";
import { Link } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const clientId = 'NDA3NDM5ODZ8MTcxMjExNzA1Mi45MDc2Nzg';
  const clientSecret = '614e350ad10adff00febf0d26693417b86ee57f92abf4740926e79ab859649c6';
  const location = 'Dallas'; // You can replace this with the desired location

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Convert location to URI format
        const encodedLocation = encodeURIComponent(location);
        const response = await fetch(
          `https://api.seatgeek.com/2/events?client_id=${clientId}&client_secret=${clientSecret}&venue.city=${encodedLocation}`
        );
        const data = await response.json();
        setEvents(data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [location]); 
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);
  // Include location in dependency array to trigger fetch when location changes

  const handleSaveEvent = async (event) => {
    try {
      if (!user) {
        // Handle the case where user is not logged in
        setError("You need to be logged in to save events.");
        return;
      }
      
      // Get reference to the user document
      const userDocRef = doc(db, "users", user.uid);

      // Update user document to add event to saved_events array
      await updateDoc(userDocRef, {
        saved_events: arrayUnion(event)
      });

      // Success message
      console.log("Event saved successfully!");
    } catch (error) {
      console.error("Error saving event:", error.message);
      setError("Error saving event. Please try again later.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-base font-semibold leading-8 text-gray-900">SeatGeek Events in {location}</h2>
      <ul>
        {events.map(event => (
          <li key={event.id} className="border-b border-gray-200 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">{event.title}</h3>
                <p className="text-gray-600">{event.datetime_local}</p>
                {event.venue && (
                  <p className="text-gray-600">{event.venue.name}, {event.venue.address}, {event.venue.city}</p>
                )}
              </div>
              {event.performers && event.performers.length > 0 && event.performers[0].image && (
                <img src={event.performers[0].image} alt={event.performers[0].name} className="w-16 h-16 object-cover rounded-full" />
              )}
            </div>
            {event.venue && event.venue.image && (
              <img src={event.venue.image} alt={event.venue.name} className="mt-4 w-full object-cover" />
            )}
            <div className="mt-4 flex justify-end">
              <button 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => handleSaveEvent(event)}
              >
                Save Event
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;










// 614e350ad10adff00febf0d26693417b86ee57f92abf4740926e79ab859649c6
// Client ID: NDA3NDM5ODZ8MTcxMjExNzA1Mi45MDc2Nzg