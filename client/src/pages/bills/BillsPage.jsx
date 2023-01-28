import React, { useState, useEffect, useRef } from "react";
import LayoutDesign from "../../components/Loyout";
import { useReactToPrint } from "react-to-print";
import { useDispatch } from "react-redux";
import axios from "axios";
import { EyeOutlined } from "@ant-design/icons";
import { Table, Modal, Button } from "antd";
import "./invoice.css";

const BillsPage = () => {
  const dispatch = useDispatch();
  // const API_URL = "http://localhost:5000/";
  const API_URL = "https://kshpos.onrender.com/";

  //for modal box
  const componentRef = useRef();
  const [billsData, setBillsData] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const getAllBills = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const { data } = await axios.get(`${API_URL}api/getbills`);
      setBillsData(data);
      dispatch({
        type: "HIDE_LOADING",
      });
      console.log(data);
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBills();
    //eslint-disable-next-line
  }, []);

  //print function
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  //able data
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
    },
    {
      title: "Contact Number",
      dataIndex: "customerNumber",
    },
    {
      title: "Total Ammount",
      dataIndex: "totalAmount",
    },
    {
      title: "Sub Total",
      dataIndex: "subTotal",
    },
    {
      title: "Tax",
      dataIndex: "tax",
    },
    {
      title: "Payment Mode",
      dataIndex: "paymentMode",
    },

    {
      title: "Actions",
      dataIndex: "_id",

      render: (id, record) => (
        <div>
          <EyeOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSelectedBill(record);
              setPopupModal(true);
            }}
          />
        </div>
      ),
    },
  ];

  console.log("get bill data", billsData);
  console.log("selected bills", selectedBill);

  return (
    <div>
      <LayoutDesign>
        <div className="d-flex justify-content-between">
          <h1 className="f-h1">Invoice List</h1>
        </div>

        <Table columns={columns} dataSource={billsData} bordered />
        {popupModal && (
          <Modal
            width={500}
            pagination={false}
            title="Invoice Details"
            open={popupModal}
            onCancel={() => {
              setPopupModal(false);
            }}
            footer={false}
          >
            {/* ============ invoice modal start ==============  */}
            <div id="invoice-POS" ref={componentRef}>
              <center id="top">
                <div className="logo" />
                <div className="info">
                  <h2>Ultra-B KSH POS</h2>
                  <p>
                    {" "}
                    Contact : 09796262712 | Mahabawga Street,Hlaedan, Yangon
                  </p>
                </div>
                {/*End Info*/}
              </center>
              {/*End InvoiceTop*/}
              <div id="mid">
                <div className="mt-2">
                  <p>
                    Customer Name : <b>{selectedBill.customerName}</b>
                    <br />
                    Phone No : <b>{selectedBill.customerNumber}</b>
                    <br />
                    Date :<b>{selectedBill.date.toString().substring(0, 10)}</b>
                    <br />
                  </p>
                  <hr style={{ margin: "5px" }} />
                </div>
              </div>
              {/*End Invoice Mid*/}
              <div id="bot">
                <div id="table">
                  <table>
                    <tbody>
                      <tr className="tabletitle">
                        <td className="item">
                          <h6>Item</h6>
                        </td>
                        <td className="Hours">
                          <h6>Qty</h6>
                        </td>
                        <td className="Rate">
                          <h6>Price</h6>
                        </td>
                        <td className="Rate">
                          <h6>Total</h6>
                        </td>
                      </tr>
                      {selectedBill.cartItems.map((item) => (
                        <>
                          <tr className="service">
                            <td className="tableitem">
                              <p className="itemtext mgtop1rem">{item.name}</p>
                            </td>
                            <td className="tableitem">
                              <p className="itemtext mgtop1rem">
                                {item.quantity}
                              </p>
                            </td>
                            <td className="tableitem">
                              <p className="itemtext mgtop1rem">{item.price}</p>
                            </td>
                            <td className="tableitem">
                              <p className="itemtext mgtop1rem">
                                {item.quantity * item.price}
                              </p>
                            </td>
                          </tr>
                        </>
                      ))}

                      <tr className="tabletitle">
                        <td />
                        <td />
                        <td className="Rate">
                          <h6 className="mgtop">Tax</h6>
                        </td>
                        <td className="payment">
                          <h6 className="mgtop">${selectedBill.tax}</h6>
                        </td>
                      </tr>
                      <tr className="tabletitle">
                        <td />
                        <td />
                        <td className="Rate">
                          <h6>Grand Total</h6>
                        </td>
                        <td className="payment">
                          <p>
                            <h6>${selectedBill.totalAmount}</h6>
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/*End Table*/}
                <div id="legalcopy">
                  <p className="legal">
                    <strong>Thank you for your order!</strong> 10% GST
                    application on total amount.Please note that this is non
                    refundable amount for any assistance please write email
                    <b> kyawswarhtet101094@gmail.com</b>
                  </p>
                </div>
              </div>
              {/*End InvoiceBot*/}
            </div>
            {/*End Invoice*/}
            <div className="d-flex justify-content-end mt-3">
              <Button type="primary" onClick={handlePrint}>
                Print
              </Button>
            </div>
            {/* ============ invoice modal ends ==============  */}
          </Modal>
        )}
      </LayoutDesign>
    </div>
  );
};

export default BillsPage;
