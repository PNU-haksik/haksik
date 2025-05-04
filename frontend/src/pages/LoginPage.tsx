import React from "react";
import { useNavigate, Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { login, LoginResult } from "../services/authService";
import "./LoginPage.css";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = async (username: string, password: string) => {
    try {
      const { token }: LoginResult = await login(username, password);
      localStorage.setItem("accessToken", token);
      alert("로그인 성공!");
      navigate("/dashboard");
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>로그인</h2>
        <LoginForm onLogin={handleLogin} />
        <div className="login-footer">
          <span>계정이 없으신가요? </span>
          <Link to="/register">회원가입</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;