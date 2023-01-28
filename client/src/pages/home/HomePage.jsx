import React, { useState, useEffect } from "react";
import LayoutDesign from "../../components/Loyout";
import axios from "axios";
import { Col, Row } from "antd";
import ProductList from "../../components/ProductList";
import { useDispatch } from "react-redux";

export const HomePage = () => {
  const dispatch = useDispatch();
  // const API_URL = "http://localhost:5000/";
  const API_URL = "https://kshpos.onrender.com/";
  const [productsData, setProductsData] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("skincare");

  const categories = [
    {
      name: "Skincare",
      category: "skincare",
      imageUrl: "./images/skincare.jpg",
    },
    {
      name: "Make-up",
      category: "makeup",
      imageUrl: "./images/makeup.jpg",
    },
    {
      name: "Lipstick",
      category: "lipstick",
      imageUrl: "./images/lipstick.jpg",
    },
    {
      name: "Hair & Body",
      category: "hairandbody",
      imageUrl: "./images/hairbody.jpg",
    },
  ];

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
  }, [dispatch]);
  return (
    <div>
      <LayoutDesign>
        <div className="d-flex gap-4 cateTitle">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`d-flex category ${
                selectedCategory === category.category ? `category-active` : ""
              }`}
              onClick={() => setSelectedCategory(category.category)}
            >
              <h4>{category.name}</h4>
              <img
                src={category.imageUrl}
                alt={category.name}
                height="40"
                width="60"
              />
            </div>
          ))}
        </div>
        <Row>
          {productsData
            .filter((i) => i.category === selectedCategory)
            .map((item, index) => (
              <Col xs={24} lg={6} md={12} sm={6} key={item.id}>
                <ProductList item={item} />
              </Col>
            ))}
        </Row>
      </LayoutDesign>
    </div>
  );
};
