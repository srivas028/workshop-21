import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://reqres.in/api/users/");
      const list = await response.json();
      setUsers(list.data);
    }
    fetchData();
  }, []);

  const onLogout = () => {
    history.replace("/");
  };
  return (
    <div className="dashboard-top-container">
      <div className="dashboard-text-container">
        <h1>Welcome</h1>
        <button type="button" className="dashboard-button" onClick={onLogout}>
          Logout
        </button>
      </div>
      <div className="list-container">
        {users.length &&
          users.map((user) => {
            return (
              <div key={user.id}>
                <p>
                  <strong>{user.first_name}</strong>
                </p>
                <p>{user.email}</p>
                <img
                  key={user.avatar}
                  src={user.avatar}
                  alt={user.first_name}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Dashboard;
