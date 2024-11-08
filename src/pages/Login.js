import React from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Submitting login form with values:", values); // Debugging form values

    try {
      // Make sure the URL is complete and correct
      const response = await axios.post("http://localhost:3000/api/user/login", values);
      console.log("Server response:", response); // Debugging server response

      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirecting to home page");
        localStorage.setItem("token", response.data.data); // Storing token
        navigate("/"); // Redirect to home page
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // Detailed error handling
      console.error("Error details:", error);

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
        <h1 className="card-title">Welcome Back</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input placeholder="Password" type="password" />
          </Form.Item>

          <Button className="primary-button my-2" htmlType="submit">
            Login
          </Button>

          <Link to="/register" className="anchor mt-2">
            Click here to Register
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Login;
