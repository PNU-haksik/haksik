import React from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import { register } from "../services/authService";
import "./RegisterPage.css";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = async (u: string, p: string) => {
    try {
      const { message } = await register(u, p);
      alert(message);
      navigate("/login");
    } catch (e) {
      alert((e as Error).message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>회원가입</h2>
        <RegisterForm onRegister={handleRegister} />
      </div>
    </div>
  );
};

export default RegisterPage;