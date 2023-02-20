import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Breadcrumb, Table } from "antd";
import api from "../services/api";

const Products = () => {
  const [products, setItems] = useState([]);
  const navigate = useNavigate();

  const columns = [
    {
      title: "Image",
      dataIndex: "thumbnail",
      render: (thumbnail) => <img src={thumbnail} className="w-10" />,
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Brand",
      dataIndex: "brand",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      align: "right",
      render: (price) => <span>{price.toLocaleString()}</span>,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      align: "right",
      render: (stock) => <span>{stock.toLocaleString()}</span>,
    },
    {
      title: "Action",
      dataIndex: "id",
      align: "center",
      render: (id) => (
        <Link to={`/product/${id}`} className="btn btn-xs btn-info">
          View
        </Link>
      ),
    },
  ];
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const response = await api.get("/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setItems(response.data);
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Breadcrumb className="mt-5 mb-5">
        <Breadcrumb.Item>Workshop</Breadcrumb.Item>
        <Breadcrumb.Item>Product</Breadcrumb.Item>
      </Breadcrumb>
      <div className="p-5 h-full bg-grey">
        <div className="table-responsive">
          <Table columns={columns} dataSource={products} rowKey="id" className="bg-white" />
        </div>
      </div>
      <a href="/product" className="absolute top-5 right-5 btn btn-primary">
        + Add
      </a>
    </>
  );
};

export default Products;
