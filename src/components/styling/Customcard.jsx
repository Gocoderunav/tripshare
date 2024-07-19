// import React, { useEffect, useState } from "react";
// import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
// import { db } from "../../config/firebase";
// import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import { FaTrashAlt } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
// import './card.css'; // Ensure you have a CSS file for styling
// import imgBg from "../styling/img/tour.jpg"; // Default image
// import { auth } from "../../config/firebase";
// import { useAuthState } from "react-firebase-hooks/auth";

// export const Customcard = ({ searchTerm }) => { // Accept searchTerm as a prop
//   const [userCards, setUserCards] = useState([]);
//   const [user] = useAuthState(auth); // Get current logged-in user
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserCards = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "userCards"));
//         const cardsData = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setUserCards(cardsData);
//       } catch (error) {
//         console.error("Error fetching user cards: ", error);
//       }
//     };

//     fetchUserCards();
//   }, []);

//   const handleCardClick = (id) => {
//     navigate(`/landing/${id}`); // Navigate to Landing page with user ID
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this card?")) {
//       try {
//         await deleteDoc(doc(db, "userCards", id));
//         setUserCards(userCards.filter(card => card.id !== id)); // Update UI after deletion
//         toast.success("Card deleted successfully!"); // Show success toast
//       } catch (error) {
//         console.error("Error deleting card: ", error);
//         toast.error("Error deleting card."); // Show error toast
//       }
//     }
//   };

//   const filteredCards = userCards.filter(card =>
//     card.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <>
//       <ToastContainer />
//       <div className="card-container">
//         {filteredCards.map(card => (
//           <Card key={card.id} style={{ width: '18rem', position: 'relative' }}>
//             <Card.Img
//               variant="top"
//               src={card.imageUrl || imgBg} // Use default image if card.imageUrl is empty
//               alt="Uploaded"
//               className="card-img-top"
//             />
//             {user && user.uid === card.userId && (
//               <FaTrashAlt
//                 className="delete-icon"
//                 onClick={() => handleDelete(card.id)}
//               />
//             )}
//             <Card.Body>
//               <Card.Text>
//                 {card.description.length > 60 ? card.description.substring(0, 60) + '...' : card.description}
//               </Card.Text>
//               <Button variant="primary" onClick={() => handleCardClick(card.id)}>Go to Details</Button>
//               <Card.Title className="card-title">@{card.username}</Card.Title>
//             </Card.Body>
//           </Card>
//         ))}
//       </div>
//     </>
//   );
// };

import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { db } from "../../config/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import './card.css'; // Ensure you have a CSS file for styling
import imgBg from "../styling/img/tour.jpg"; // Default image
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const Customcard = ({ searchTerm }) => { // Accept searchTerm as a prop
  const [userCards, setUserCards] = useState([]);
  const [user] = useAuthState(auth); // Get current logged-in user
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserCards = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "userCards"));
        const cardsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserCards(cardsData);
      } catch (error) {
        console.error("Error fetching user cards: ", error);
      }
    };

    fetchUserCards();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/landing/${id}`); // Navigate to Landing page with user ID
  };

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

  const filteredCards = userCards.filter(card =>
    card.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <ToastContainer />
      <div className="card-container">
        {filteredCards.map(card => (
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
              <Button variant="primary" onClick={() => handleCardClick(card.id)}>Go to Details</Button>
              <Card.Title className="card-title">@{card.username}</Card.Title>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
};

