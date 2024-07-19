import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "../config/firebase";
import { collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FaTrashAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './profile.css';
import imgBg from "./styling/img/tour.jpg";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export const Profile = ({ searchTerm }) => {
  const [user] = useAuthState(auth);
  const [userCards, setUserCards] = useState([]);
  const navigate = useNavigate(); // Use useNavigate

  useEffect(() => {
    const fetchUserCards = async () => {
      if (user) {
        try {
          const q = query(collection(db, "userCards"), where("userId", "==", user.uid));
          const querySnapshot = await getDocs(q);
          const cardsData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setUserCards(cardsData);
        } catch (error) {
          console.error("Error fetching user cards: ", error);
        }
      }
    };

    fetchUserCards();
  }, [user]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      try {
        await deleteDoc(doc(db, "userCards", id));
        setUserCards(userCards.filter(card => card.id !== id)); // Update UI after deletion
        toast.success("Card deleted successfully!"); // Show success toast
      } catch (error) {
        console.error("Error deleting card: ", error);
        toast.error("Error deleting card."); // Show error toast
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="profile-container">
        {user && (
          <>
            <div className="profile-header">
              <img
                src={user.photoURL || imgBg}
                alt="User Profile"
                className="profile-image"
              />
              <p>{user.displayName}</p>
            </div>
            <div className="card-container">
              {userCards
                .filter(card => card.description.toLowerCase().includes(searchTerm.toLowerCase()))
                .map(card => (
                  <Card key={card.id} style={{ width: '18rem', position: 'relative' }}>
                    <Card.Img
                      variant="top"
                      src={card.imageUrl || imgBg} // Use default image if card.imageUrl is empty
                      alt="Uploaded"
                      className="card-img-top"
                    />
                    {user && user.uid === card.userId && (
                      <FaTrashAlt
                        className="delete-icon"
                        onClick={() => handleDelete(card.id)}
                      />
                    )}
                    <Card.Body>
                      <Card.Text>
                        {card.description.length > 60 ? card.description.substring(0, 60) + '...' : card.description}
                      </Card.Text>
                      <Button 
                        variant="primary" 
                        onClick={() => navigate(`/landing/${card.id}`)} // Navigate to Landing page with card ID
                      >
                        Go to Details
                      </Button>
                      <Card.Title className="card-title">@{card.username}</Card.Title>
                    </Card.Body>
                  </Card>
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};
