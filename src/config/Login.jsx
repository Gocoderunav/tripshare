// import React from "react";
// import { auth, provider } from "../config/firebase";
// import { signInWithPopup } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import './login.css';
// import { FcGoogle } from "react-icons/fc";

// export const Login = () => {
//     const navigate = useNavigate();

//     const signInWithGoogle = async () => {
//         await signInWithPopup(auth, provider);
//         navigate("/");
//     }

//     return (
//         <div className="login-container">
            
//             <button className="google-signin-button" onClick={signInWithGoogle}>
            
//             <FcGoogle />{   } Sign in with Google
//             </button>
//         </div>
//     )
// }
import React from "react";
import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import './login.css';
import { FcGoogle } from "react-icons/fc"; // Importing the Google icon

export const Login = () => {
    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        await signInWithPopup(auth, provider);
        navigate("/");
    }

    return (
        <div className="login-container">
            <button className="google-signin-button" onClick={signInWithGoogle}>
                <FcGoogle className="google-icon" /> {/* Adding class to the icon */}
                Sign in with Google
            </button>
        </div>
    )
}
