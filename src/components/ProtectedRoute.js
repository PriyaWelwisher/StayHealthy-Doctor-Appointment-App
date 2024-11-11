import React, { useEffect, useCallback } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "../redux/userSlice";
import { hideLoading, showLoading } from "../redux/alertSlice";
import { useSelector } from "react-redux";

function ProtectedRoute(props) {
  const user = useSelector((state) => state.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Memoized getUser function to avoid re-creating on every render
  const getUser = useCallback(async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/get-user-info-by-id",
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        dispatch(setUser(response.data.data));
      } else {
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoading());
      localStorage.clear();
      navigate("/login");
    }
  }, [dispatch, navigate]);

  // Include getUser in the dependency array to fix the warning
  useEffect(() => {
    if (!user && localStorage.getItem("token")) {
      getUser();
    }
  }, [user, getUser]); // Now includes getUser as a dependency

  // If the user is authenticated, render the protected route
  if (user || localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
