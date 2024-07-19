

// import React, { useState, createContext } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import './App.css';
// import { Navbar } from "./components/Navbar";
// import { Home } from "./components/Home";
// import { Profile } from "./components/Profile";
// import { Create } from "./components/Create";
// import { Login } from "./config/Login";
// import { Landing } from "./pages/Landing";

// export const ThemeContext = createContext(null);

// function App() {
//   const [theme, setTheme] = useState("light");
//   const [searchTerm, setSearchTerm] = useState(""); // New state for search term

//   const toggleTheme = () => {
//     setTheme((curr) => (curr === "light" ? "dark" : "light"));
//   };

//   return (
//     <ThemeContext.Provider value={{ toggleTheme }}>
//       <div className="App" id={theme}>
//         <Router>
//           <Navbar setSearchTerm={setSearchTerm} /> {/* Pass setSearchTerm to Navbar */}
//           <div className="content">
//             <Routes>
//               <Route path="/" element={<Home searchTerm={searchTerm} />} /> {/* Pass searchTerm to Home */}
//               <Route path="/profile" element={<Profile searchTerm={searchTerm} />} /> {/* Pass searchTerm to Profile */}
//               <Route path="/create" element={<Create />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/landing/:id" element={<Landing />} />
//             </Routes>
//           </div>
//         </Router>
//       </div>
//     </ThemeContext.Provider>
//   );
// }

// export default App;


import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { Profile } from "./components/Profile";
import { Create } from "./components/Create";
import { Login } from "./config/Login";
import { Landing } from "./pages/Landing";
import { Footer } from "./components/Footer";// Import the Footer component

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("light");
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      <div className="App" id={theme}>
        <Router>
          <Navbar setSearchTerm={setSearchTerm} /> {/* Pass setSearchTerm to Navbar */}
          <div className="content">
            <Routes>
              <Route path="/" element={<Home searchTerm={searchTerm} />} /> {/* Pass searchTerm to Home */}
              <Route path="/profile" element={<Profile searchTerm={searchTerm} />} /> {/* Pass searchTerm to Profile */}
              <Route path="/create" element={<Create />} />
              <Route path="/login" element={<Login />} />
              <Route path="/landing/:id" element={<Landing />} />
            </Routes>
          </div>
          <Footer /> {/* Add Footer here */}
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
