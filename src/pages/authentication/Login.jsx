import React, { useState } from "react";
import { toast } from "react-toastify";
import { loginUserApi } from "../../apis/Api";
import { Navigate, useNavigate } from "react-router-dom";
const Login = () => {
  const authUser = JSON.parse(localStorage.getItem("user"));

  // Navigate
  const navigate = useNavigate();

  // States
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // Error States
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Handle Error States
  const validate = () => {
    let isValid = true;
    if (!phone.trim()) {
      setPhoneError("Please enter phone.");
      isValid = false;
    }
    if (!password.trim()) {
      setPasswordError("Please enter password.");
      isValid = false;
    }
    return isValid;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const data = { phone, password };
      const res = await loginUserApi(data);

      if (res.data?.success === false) {
        toast.error(res.data?.message);
      } else {
        toast.success("Login Successful");
        localStorage.setItem("token", res.data?.token?.accessToken);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
      }
    } catch (err) {
      toast.error(
        err?.response?.status === 401 ? "Unauthorized" : "An error occurred"
      );
    }
  };

  return (
    <>
      {authUser ? (
        <Navigate to="/" />
      ) : (
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-4 p-4">
              <h1 className="mt-2">Welcome to Admin Panel</h1>
              <h2 className="mt-2 mb-4">Sign In To Continue.</h2>
              <form className="mt-3" onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    type="phone"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    placeholder="Enter Phone"
                  />
                  {phoneError && (
                    <small className="text text-danger">{phoneError}</small>
                  )}
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Enter Password"
                  />
                  {passwordError && (
                    <small className="text text-danger">{passwordError}</small>
                  )}
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-secondary w-50">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
