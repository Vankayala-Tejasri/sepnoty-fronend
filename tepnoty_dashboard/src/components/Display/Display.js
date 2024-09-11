import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Display.css"

function Display(){

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state

  // Fetch users from the API when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/auth/get_details');
        setUsers(response.data); 
        console.log((response.data.length));
        const data=response.data.length
        console.log("data length is",data);
        
         // Set the user data
        setLoading(false);        // Data fetched, stop loading
      } catch (error) {
        console.error('Error fetching the users:', error);
        setLoading(false);        // In case of error, stop loading
      }
    };

    fetchUsers();  // Trigger the data fetch
  }, []);  // Empty dependency array to run the effect only once


  return (
    <div>
      
      <table class="data_display_background">
        <thead>
          <tr>
            <th>Phone Number</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>UserId</th>
            <th>Email</th>
            
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.phoneNumber}</td>
              <td>{user.name}</td>
              <td>{user.gender}</td>
              <td>{new Date(user.dob).toLocaleDateString()}</td> {/* Format date */}
              <td>{user.user_id}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Total Users: {users.length}</h2>
    </div>
  );
};
export default Display