import React, { useEffect, useState } from "react";
import "../../css/AdminCustomer.css";
import AdminSidebar from "../../../components/AdminSidebar";
import { getDisputesApi } from "../../../apis/Api";

const AdminDispute = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getDisputesApi()
      .then((res) => {
        setCustomers(res.data.data);
      })
      .catch((err) => {});
  }, []);

  const filteredCustomers = customers.filter((customer) =>
    customer.ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCustomers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="customer-table-container">
      <AdminSidebar />
      <div className="customer-table-content">
        <header className="header">
          <div className="header-top">
            <h1>Disputes</h1>
            <div className="header-actions">
              <input
                type="text"
                placeholder="Search by ticket number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
              />
            </div>
          </div>
        </header>
        <div className="table-wrapper">
          <table className="customer-table">
            <thead>
              <tr>
                <th onClick={() => requestSort("id")}>ID</th>
                <th onClick={() => requestSort("user")}>User</th>
                <th onClick={() => requestSort("ticket")}>Ticket Number</th>
                <th onClick={() => requestSort("reason")}>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedCustomers
                .slice(indexOfFirstItem, indexOfLastItem)
                .map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>{customer.user.phone || ""}</td>
                    <td>{customer.ticket.id}</td>
                    <td>{customer.reason}</td>
                    <td>
                      {" "}
                      {customer.status == "APPROVED" ? (
                        <span class="badge bg-success">{customer.status}</span>
                      ) : customer.status == "PENDING" ? (
                        <span class="badge bg-warning">{customer.status}</span>
                      ) : customer.status == "CANCELED" ? (
                        <span class="badge bg-danger">{customer.status}</span>
                      ) : (
                        <span class="badge bg-info">{customer.status}</span>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          {Array.from(
            { length: Math.ceil(filteredCustomers.length / itemsPerPage) },
            (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`pagination-button ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDispute;
