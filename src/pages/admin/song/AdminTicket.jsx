import React, { useEffect, useState } from "react";
import "../../css/AdminCustomer.css";
import AdminSidebar from "../../../components/AdminSidebar";
import { getTicketsApi } from "../../../apis/Api";

const AdminTicket = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    getTicketsApi()
      .then((res) => {
        setSongs(res.data.data);
      })
      .catch((err) => {});
  }, []);

  const filteredSongs = songs.filter((song) =>
    song.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSongs.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const sortedSongs = [...filteredSongs].sort((a, b) => {
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
            <h1>Tickets</h1>
            <div className="header-actions">
              <input
                type="text"
                placeholder="Search by ticket number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
              />
              {/* <button className="btn-add" onClick={handleAddClick}>
                Add
              </button> */}
            </div>
          </div>
        </header>
        <div className="table-wrapper">
          <table className="customer-table">
            <thead>
              <tr>
                <th onClick={() => requestSort("_id")}>ID</th>
                <th onClick={() => requestSort("name")}>Name</th>
                <th onClick={() => requestSort("licenseNumber")}>
                  License Number
                </th>
                <th onClick={() => requestSort("reason")}>Reason</th>
                <th onClick={() => requestSort("amount")}>Amount</th>
                <th onClick={() => requestSort("issuedBy")}>Issued By</th>
                <th>status</th>
              </tr>
            </thead>
            <tbody>
              {sortedSongs
                .slice(indexOfFirstItem, indexOfLastItem)
                .map((ticket) => (
                  <tr key={ticket.id}>
                    <td>{ticket.id}</td>
                    <td>{ticket.fullName}</td>
                    <td>{ticket.licenseNumber}</td>
                    <td>{ticket.reason}</td>
                    <td>{ticket.amount}</td>
                    <td>{ticket.issuedBy}</td>
                    <td>
                      {" "}
                      {ticket.status == "DISPUTED" ? (
                        <span class="badge bg-danger">{ticket.status}</span>
                      ) : ticket.status == "PAID" ? (
                        <span class="badge bg-success">{ticket.status}</span>
                      ) : ticket.status == "PENDING" ? (
                        <span class="badge bg-warning">{ticket.status}</span>
                      ) : (
                        <span class="badge bg-info">{ticket.status}</span>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          {Array.from(
            { length: Math.ceil(filteredSongs.length / itemsPerPage) },
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

export default AdminTicket;
