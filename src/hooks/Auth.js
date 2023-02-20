import { useState, useEffect } from "react";
import { notification } from "antd";
import api from "../services/api";

function Auth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api
        .get("/user", { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const login = async (values) => {
    try {
      const response = await api.post("/login", values);
      const data = response.data;
      localStorage.setItem("token", data.token);
      setUser(data);
      return true;
    } catch (error) {
      const data = error.response.data;
      notification.warning({
        message: data.message,
        description: "The entered username or password is invalid.",
        placement: "bottomRight",
      });
      throw new Error(data.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return { user, login, logout };
}

export default Auth;
