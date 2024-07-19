
import React, { useState, useEffect } from "react";
import { FaBusAlt, FaHotel, FaCopy } from "react-icons/fa";
import { MdRestaurant } from "react-icons/md";
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import "./Landing.css";
import bgImage from "../components/styling/img/tour.jpg"

export const Landing = () => {
  const [data, setData] = useState(null);
  const [notification, setNotification] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "userCards", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };
    fetchData();
  }, [id]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setNotification("Number copied!");
      setTimeout(() => setNotification(null), 2000);
    });
  };

  if (!data) return <p>Loading...</p>;

  return (
    <div className="landing">
      <div className="image-container">
      <img
  src={data.imageUrl || bgImage}
  alt="Journey"
  className="journey-image"
  style={{
    width: '350px', // Adjust width as needed
    height: '350px', // Maintain aspect ratio
    display: 'block',
    margin: '0 auto'
  }}
/>

      </div>
      <p className="description">{data.description}</p>
      <div className="content">
        <div className="scrollable-section">
          <h3>Buses/Train/other mode</h3>
          <div className="scrollable-content">
            {data.buses.map((bus, index) => (
              <div key={index} className="details-entry">
                <FaBusAlt className="icon" />
                <div className="info">
                  <p><strong>From:</strong> {bus.from}</p>
                  <p><strong>To:</strong> {bus.to}</p>
                  <p><strong>Title:</strong> {bus.title}</p>
                  <p><strong>Phone:</strong> {bus.phone}</p>
                </div>
                <button onClick={() => copyToClipboard(bus.phone)}>
                  <FaCopy /> Copy
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="scrollable-section">
          <h3>Hotels</h3>
          <div className="scrollable-content">
            {data.hotels.map((hotel, index) => (
              <div key={index} className="details-entry">
                <FaHotel className="icon" />
                <div className="info">
                  <p><strong>Hotel Name:</strong> {hotel.hotelname}</p>
                  <p><strong>Location:</strong> {hotel.location}</p>
                  <p><strong>Phone:</strong> {hotel.phone}</p>
                </div>
                <button onClick={() => copyToClipboard(hotel.phone)}>
                  <FaCopy /> Copy
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="scrollable-section">
          <h3>Restaurants</h3>
          <div className="scrollable-content">
            {data.restaurants.map((restaurant, index) => (
              <div key={index} className="details-entry">
                <MdRestaurant className="icon" />
                <div className="info">
                  <p><strong>Restaurant Name:</strong> {restaurant.restaurantname}</p>
                  <p><strong>Location:</strong> {restaurant.location}</p>
                  <p><strong>Type:</strong> {restaurant.type}</p>
                  <p><strong>Phone:</strong> {restaurant.phone}</p>
                </div>
                <button onClick={() => copyToClipboard(restaurant.phone)}>
                  <FaCopy /> Copy
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {notification && <div className="notification">{notification}</div>}
    </div>
  );
};

