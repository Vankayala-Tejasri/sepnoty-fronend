import React, { useState, useRef } from "react";
import "./Dashboard.css";
import Logo from "../assets/Logo.png";

function Dashboard(){

    
        const [sidebarOpen, setSidebarOpen] = useState(true);
      
        const toggleSidebar = () => {
          setSidebarOpen(!sidebarOpen);
        }; 

    return(
        <div className="app">
        {/* Top Bar */}
        <header className="top-bar">
          <div className="logo"><img src={Logo} alt="Logo" /></div>
          <div className="profile"><i class="fa-solid fa-user"></i></div>
        </header>
  
        {/* Main Content */}
        <div className="container">
          {/* Sidebar */}
          <nav className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
            <button className="toggle-btn" onClick={toggleSidebar}>
              {sidebarOpen ? (
                <i className="fas fa-times"></i> // X icon for close
              ) : (
                <i className="fas fa-bars"></i>  // Hamburger icon for open
              )}
            </button>
            <ul>
              <li>Feedback</li>
              <li>Rating</li>
              
            </ul>
          </nav>
  
          {/* Center Content */}
          <main className="main-content">
            
          </main>
        </div>
      </div>
    )

}
export default Dashboard