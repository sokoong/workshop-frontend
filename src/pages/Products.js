import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Breadcrumb, Table } from "antd";

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
      render: (id) => <Link to={`/product/${id}`} className="btn btn-xs btn-info">View</Link>,
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
        const response = await fetch("http://localhost:9000/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        navigate("/login");
      }
    };
    fetchProducts();
  }, [navigate]);

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
