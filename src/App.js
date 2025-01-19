
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./utils/ProtectedRoutes";
import Login from "./pages/authentication/Login";
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";
import AdminCustomer from "./pages/admin/customer/AdminCustomer";
import AdminTicket from "./pages/admin/ticket/AdminTicket";
import AdminDispute from "./pages/admin/dispute/AdminDispute";

function App() {
  return (
    <Router>
    <Navbar />
    <ToastContainer />
      <Routes>
      <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <AdminCustomer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/tickets"
          element={
            <ProtectedRoute>
              <AdminTicket />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/disputes"
          element={
            <ProtectedRoute>
              <AdminDispute />
            </ProtectedRoute>
          }
        />
        </Routes>
    </Router>
  );
}

export default App;
