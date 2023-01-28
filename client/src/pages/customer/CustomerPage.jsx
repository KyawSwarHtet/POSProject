import React, { useState, useEffect } from "react";
import LayoutDesign from "../../components/Loyout";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Table } from "antd";

const CustomerPage = () => {
  const [billsData, setBillsData] = useState([]);
  const dispatch = useDispatch();
  // const API_URL = "http://localhost:5000/";
  const API_URL = "https://kshpos.onrender.com/";
  const getAllBills = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const { data } = await axios.get(`${API_URL}api/getbills`);
      setBillsData(data);
      dispatch({ type: "HIDE_LOADING" });
      console.log(data);
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      console.log(error);
    }
  };
  //useEffect
  useEffect(() => {
    getAllBills();
    //eslint-disable-next-line
  }, []);

  const columns = [
    { title: "ID ", dataIndex: "_id" },
    {
      title: "Cutomer Name",
      dataIndex: "customerName",
    },
    { title: "Contact No", dataIndex: "customerNumber" },
  ];
  return (
    <div>
      <LayoutDesign>
        <h1 className="f-h1">Customer Page</h1>
        <Table
          columns={columns}
          dataSource={billsData}
          bordered
          pagination={false}
        />
      </LayoutDesign>
    </div>
  );
};

export default CustomerPage;
