

import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './styling/navbar.css';
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export const Navbar = ({ setSearchTerm }) => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const signUserOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="header">
      <div className="nav-bar">
        <nav className="navigation">
          <div className="line">
            <input 
              type="text" id="search-bar"
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term
              placeholder="...type Place"
            />
            <div className="nav-buttons">
              <Link to="/"><button className="btn">Home</button></Link>
              {!user ? (
                <Link to="/login"><button className="btn">Login</button></Link>
              ) : (
                <>
                  <Link to="/profile"><button className="btn">Profile</button></Link>
                  <Link to="/create"><button className="btn">Create</button></Link>
                  <button className="btn" onClick={signUserOut}>Log out</button>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};


