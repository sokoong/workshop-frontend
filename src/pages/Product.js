import React, { useState, useEffect } from "react";
import { Form, Input, InputNumber, Button, Select, Breadcrumb, notification } from "antd";
import { useParams } from "react-router-dom";
import api from "../services/api";

const Product = () => {
  const [prod, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const { TextArea } = Input;
  const { Option } = Select;
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/product/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (!isNaN(id)) {
      fetchProduct();
    }
  }, [id]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await api.put(`/product/${id}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      notification.info({
        message: "Form submitted",
        description: "The form has been successfully submitted",
        placement: "bottomRight",
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Breadcrumb className="mt-5 mb-5">
        <Breadcrumb.Item>Workshop</Breadcrumb.Item>
        <Breadcrumb.Item href="/">Product</Breadcrumb.Item>
        <Breadcrumb.Item>{prod ? prod.title : "Add new"}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="p-5 h-full bg-grey">
        <Form onFinish={onFinish} name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }} initialValues={prod} autoComplete="off">
          <Form.Item label="Product name" name="title" rules={[{ required: true, message: "Please enter a product name" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Brand" name="brand">
            <Select>
              <Option value="Apple">Apple</Option>
              <Option value="Samsung">Samsung</Option>
              <Option value="Xiaomi">Xiaomi</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Option value="smartphones">Smartphones</Option>
              <Option value="laptops">Laptops</Option>
              <Option value="accessories">Accessories</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true, message: "Please enter a price" }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item label="Stock" name="stock" rules={[{ required: true, message: "Please enter a stock" }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item label="Thumbnail" name="thumbnail">
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="button" className="btn btn-primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Product;
