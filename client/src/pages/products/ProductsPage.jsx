import React, { useState, useEffect } from "react";
import LayoutDesign from "../../components/Loyout";
import { useDispatch } from "react-redux";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Table, Modal, Form, Input, Select, message } from "antd";

const ProductsPage = () => {
  const dispatch = useDispatch();
  // const API_URL = "http://localhost:5000/";
  const API_URL = "https://kshpos.onrender.com/";
  const [productsData, setProductsData] = useState([]);
  //for modal box
  const [popupModal, setPopupModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const getAllProducts = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const { data } = await axios.get(`${API_URL}api/products/getproducts/`);
      setProductsData(data);
      dispatch({
        type: "HIDE_LOADING",
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  //handle delete
  const handleDelete = async (record) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      await axios.delete(`${API_URL}api/products/deleteproducts`, {
        itemId: record._id,
      });
      message.success("Product Deleted Successfully");
      getAllProducts();
      dispatch({ type: "HIDE_LOADING" });
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      message.error("Something Wrong during product deleting");
      console.log(error);
    }
  };

  //able data
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
      render: (price, record) => <p>{record.price} Kyats</p>,
    },
    {
      title: "Actions",
      dataIndex: "_id",
      key: "action",
      render: (id, record) => (
        <div>
          <EditOutlined
            className="editItem"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setEditItem(record);
              setPopupModal(true);
            }}
          />
          <DeleteOutlined
            className="deleteItem"
            style={{ cursor: "pointer" }}
            onClick={() => handleDelete(record)}
          />
        </div>
      ),
    },
  ];

  //handle form submit
  const handleSubmit = async (value) => {
    if (editItem === null) {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const res = await axios.post(
          `${API_URL}api/products/addproducts`,
          value
        );
        message.success("Product Added Successfully");
        getAllProducts();
        setPopupModal(false);
        dispatch({ type: "HIDE_LOADING" });
        console.log(value);
      } catch (error) {
        setPopupModal(false);
        dispatch({ type: "HIDE_LOADING" });
        message.error("Something Wrong during product Adding");
        console.log(error);
      }
    } else {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        await axios.put(`${API_URL}api/products/editproducts`, {
          ...value,
          itemId: editItem._id,
        });
        message.success("Product Updated Successfully");
        getAllProducts();
        setPopupModal(false);
        dispatch({ type: "HIDE_LOADING" });
        console.log(value);
      } catch (error) {
        setPopupModal(false);
        dispatch({ type: "HIDE_LOADING" });
        message.error("Something Wrong during product update");
        console.log(error);
      }
    }
  };

  return (
    <div>
      <LayoutDesign>
        <div className="d-flex justify-content-between">
          <h1 className="f-h1">Product List</h1>
          <Button type="primary" onClick={() => setPopupModal(true)}>
            Add Item
          </Button>
        </div>

        <Table dataSource={productsData} columns={columns} bordered />
        {popupModal && (
          <Modal
            title={`${editItem !== null ? "Edit Product" : "Add New Product"}`}
            open={popupModal}
            onCancel={() => {
              setEditItem(null);
              setPopupModal(false);
            }}
            footer={false}
          >
            <Form
              layout="vertical"
              initialValues={editItem}
              onFinish={handleSubmit}
            >
              <Form.Item name="name" label="Name">
                <Input required />
              </Form.Item>
              <Form.Item name="price" label="Price">
                <Input type="number" required />
              </Form.Item>
              <Form.Item name="image" label="Image URL">
                <Input required />
              </Form.Item>
              <Form.Item name="category" label="Category">
                <Select>
                  <Select.Option value="skincare">Skincare</Select.Option>
                  <Select.Option value="makeup">Make-up</Select.Option>
                  <Select.Option value="lipstick">Lipstick</Select.Option>
                  <Select.Option value="hairandbody">Hair & Body</Select.Option>
                </Select>
              </Form.Item>
              <div className="d-flex justify-content-end">
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </div>
            </Form>
          </Modal>
        )}
      </LayoutDesign>
    </div>
  );
};

export default ProductsPage;
