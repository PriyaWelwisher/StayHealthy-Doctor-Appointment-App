import React from "react";
import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertSlice.js";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate ,Link } from "react-router-dom";
function Register() {
  const dispatch = useDispatch();
  // const {loading} = useSelector(state => state.alerts);
  // console.log(loading)
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("http://localhost:3000/api/user/register", values);
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirecting to login page");
        localStorage.setItem("token", response.data.data); // Storing token
        navigate("/login"); // Redirect to home page
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      // Detailed error handling
      toast.error("Something went wrong");

      if (error.response) {
        // If the server returned an error
        toast.error(error.response.data.message || "Server error occurred.");
      } else if (error.request) {
        // If the request was made but no response was received
        toast.error("No response from server. Check server connection.");
      } else {
        // Other errors
        toast.error("Error occurred. Please try again.");
      }
    }
  };

  
    

  return (
    <div className="authentication">
      <div className="authentication-form card p-4">
        <h1 className="card-title">Nice to Meet U</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter your name" }]}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter your email" }]}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password" }]}>
            <Input placeholder="Password" type="password" />
          </Form.Item>

          <Button className="primary-button my-2" htmlType="submit">
            REGISTER
          </Button>

          <Link to="/login" className="anchor mt-2">Click here to login</Link>
        </Form>
      </div>
    </div>
  );
}

export default Register;
