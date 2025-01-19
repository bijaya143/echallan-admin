import React, { useEffect, useState } from "react";
import "../../css/AdminDashboard.css";
import AdminSidebar from "../../../components/AdminSidebar";
import {
  getCustomersApi,
  getDisputesApi,
  getTicketsApi,
} from "../../../apis/Api";

const AdminDashboard = () => {
  const [ticketsCount, setTicketsCount] = useState(0);
  const [disputesCount, setDisputesCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [ticketsResponse, customersResponse, disputesResponse] =
          await Promise.all([
            getTicketsApi(),
            getCustomersApi(),
            getDisputesApi(1),
          ]);
        setTicketsCount(ticketsResponse.data.meta.total);
        setDisputesCount(disputesResponse.data.meta.total);
        setUsersCount(customersResponse.data.meta.total);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(
          "An error occurred while fetching data. Please try again later."
        );
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="dashboard">
      <AdminSidebar />
      <div className="dashboard-content">
        <header className="header">
          <h1>Dashboard</h1>
        </header>
        {error && <p className="error-message">{error}</p>}
        <div className="dashboard-cards-container">
          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <h3>Total Users</h3>
              <span className="dashboard-card-icon">👤</span>
            </div>
            <p className="dashboard-card-value">{usersCount}</p>
          </div>
          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <h3>Tickets</h3>
              <span className="dashboard-card-icon">📄</span>
            </div>
            <p className="dashboard-card-value">{ticketsCount}</p>
          </div>
          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <h3>Disputes</h3>
              <span className="dashboard-card-icon">⚠️</span>
            </div>
            <p className="dashboard-card-value">{disputesCount}</p>
          </div>
          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <h3>Road Traffic</h3>
              <span className="dashboard-card-icon">🚦</span>
            </div>
            <p className="dashboard-card-value">{disputesCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
