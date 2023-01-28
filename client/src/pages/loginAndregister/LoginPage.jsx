import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { message } from "antd";
import axios from "axios";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const API_URL = "http://localhost:5000/";
  const API_URL = "https://kshpos.onrender.com/";
  const handleSubmit = async (value) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const res = await axios.post(`${API_URL}api/user/login`, value);
      dispatch({ type: "HIDE_LOADING" });
      message.success("User Login Successfully");
      localStorage.setItem("auth", JSON.stringify(res.data));
      navigate("/");
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      message.error("Something Wrong during login");
      console.log(error);
    }
  };

  //currently login user
  //   useEffect(() => {
  //     localStorage.getItem("auth");
  //     navigate("/");
  //   }, []);

  return (
    <div className="register">
      <div className="register-form">
        <h1>POS APP</h1>
        <h3>Login Page</h3>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="userId" label="User ID">
            <Input type="number" required />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input type="password" required />
          </Form.Item>
          {/* <Form.Item name="password" label="Password">
          <Input type="password" required />
        </Form.Item> */}

          <div className="d-flex justify-content-between">
            <p>
              If You dont have an Account{" "}
              <Link to="/register">Register Here !</Link>
            </p>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
