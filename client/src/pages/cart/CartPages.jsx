import React, { useState, useEffect } from "react";
import LayoutDesign from "../../components/Loyout";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Button, Table, Modal, message, Input, Form, Select } from "antd";

const CartPages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const API_URL = "http://localhost:5000";
  const API_URL = "https://kshpos.onrender.com/";
  const { cartItems } = useSelector((state) => state.rootReducer);
  const [subTotal, setSubTotal] = useState(0);
  const [billPopup, setBillPopup] = useState(false);

  //handle increment function
  const handleIncrement = (record) => {
    dispatch({
      type: "UPDATE_CART",
      payload: { ...record, quantity: record.quantity + 1 },
    });
  };

  //handle Decrement function
  const handleDecrement = (record) => {
    if (record.quantity !== 1) {
      dispatch({
        type: "UPDATE_CART",
        payload: { ...record, quantity: record.quantity - 1 },
      });
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image, record) => (
        <img src={image} alt={record.name} height="60" width="60" />
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      key: "quantity",
      dataIndex: "_id",
      render: (id, record) => (
        <div className="quantityItem">
          <PlusCircleOutlined
            className="itemSize"
            style={{ cursor: "pointer" }}
            onClick={() => handleIncrement(record)}
          />
          <b>{record.quantity}</b>
          <MinusCircleOutlined
            className="itemSize"
            style={{ cursor: "pointer" }}
            onClick={() => handleDecrement(record)}
          />
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "_id",
      key: "action",
      render: (id, record) => (
        <DeleteOutlined
          className="deleteItem"
          style={{ cursor: "pointer" }}
          onClick={() =>
            dispatch({
              type: "DELETE_FROM_CART",
              payload: record,
            })
          }
        />
      ),
    },
  ];

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((item) => (temp = temp + item.price * item.quantity));
    setSubTotal(temp);
  }, [cartItems]);

  //handleSubmit
  const handleSubmit = async (value) => {
    try {
      const newObject = {
        ...value,
        cartItems,
        subTotal,
        tax: Number((subTotal / 100) * 5).toFixed(2),
        totalAmount: Number(
          Number(subTotal) + Number(((subTotal / 100) * 5).toFixed(2))
        ),
        userId: JSON.parse(localStorage.getItem("auth"))._id,
      };
      console.log("new obj", newObject);

      await axios
        .post(`${API_URL}api/addbills`, newObject)
        .then(() => navigate("/bills"));
    } catch (error) {
      message.error("Something wrong during Generate bills");
      console.log("error", error);
    }
  };

  return (
    <div>
      <LayoutDesign>
        <h1 className="f-h1">Cart Page</h1>
        <Table dataSource={cartItems} columns={columns} bordered />
        <div className="d-flex flex-column align-items-end">
          <hr />
          <h3>
            SUB TOTAL : $ <b>{subTotal}</b> Kyats /-
          </h3>
          <Button type="primary" onClick={() => setBillPopup(true)}>
            Create Invoice
          </Button>
        </div>
        <Modal
          title="Create Invoice"
          open={billPopup}
          onCancel={() => setBillPopup(false)}
          footer={false}
        >
          <Form layout="vertical" initialValues="Cash" onFinish={handleSubmit}>
            <Form.Item name="customerName" label="Customer Name">
              <Input required placeholder="username" />
            </Form.Item>
            <Form.Item name="customerNumber" label="Contact Number">
              <Input type="number" required placeholder="ph number" />
            </Form.Item>
            <Form.Item name="paymentMode" label="Payment Method">
              <Select>
                <Select.Option value="cash">Cash</Select.Option>
                <Select.Option value="card">Card</Select.Option>
              </Select>
            </Form.Item>
            <div className="bill-it">
              <h5>
                Sub Total: <b>{subTotal}</b>
              </h5>
              <h4>
                TAX
                <b>{((subTotal / 100) * 5).toFixed(2)}</b>
              </h4>
              <h3>
                GRAND TOTAL -{" "}
                <b>
                  {Number(subTotal) + Number(((subTotal / 100) * 5).toFixed(2))}
                </b>
              </h3>
            </div>

            <div className="d-flex justify-content-end">
              <Button type="primary" htmlType="submit">
                Generate Bill
              </Button>
            </div>
          </Form>
        </Modal>
      </LayoutDesign>
    </div>
  );
};

export default CartPages;
