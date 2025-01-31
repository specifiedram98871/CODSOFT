import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLogInUserMutation, useLogUserMutation } from "../redux/userSlice";
import { setUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logUser] = useLogUserMutation();
  const [user2] = useLogInUserMutation();
  const user = useSelector((state) => state.user);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const logIn = async (e) => {
    e.preventDefault();
    // console.log(formData);
    setFormError("");
    setLoginError("");

    if (!formData.email || !formData.password) {
      setFormError("Both email and password are required.");
      return;
    }

    try {
      const response = await user2(formData).unwrap();
      if (response.success) {
        console.log("response",response);
        // console.log(response.message);
        dispatch(setUser(response.user));
        // console.log("user",user);
        navigate('/project');
      } else {
        setLoginError(response.message);
      }
    } catch (error) {
      console.log(error);
      setLoginError("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-gray-700">Login</h1>

        {/* Show Form Validation Error */}
        {formError && <p className="mb-4 text-sm text-red-500">{formError}</p>}

        {/* Show Login Error */}
        {loginError && (
          <p className="mb-4 text-sm text-red-500">{loginError}</p>
        )}

        <form onSubmit={logIn} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
