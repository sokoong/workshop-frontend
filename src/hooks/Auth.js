import { useState, useEffect } from "react";
import { notification } from "antd";

function Auth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:9000/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch user data");
          }
        })
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const login = async (values) => {
    const response = await fetch("http://localhost:9000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      setUser(data);
      return true;
    } else {
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
