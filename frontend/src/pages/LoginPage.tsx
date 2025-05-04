// filepath: c:\Private\git\haksik\frontend\src\pages\LoginPage.tsx
import React from "react";
import { useNavigate, Link } from "react-router-dom"; // Link import 확인
import LoginForm from "../components/LoginForm";
import { login, LoginResult } from "../services/authService";
import "./LoginPage.css"; // CSS import 확인

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
        {/* --- 이 부분이 회원가입 링크 영역입니다 --- */}
        <div className="login-footer">
          <span>계정이 없으신가요? </span>
          <Link to="/register">회원가입</Link> {/* 이 Link 태그가 있는지 확인 */}
        </div>
        {/* --- 여기까지 --- */}
      </div>
    </div>
  );
};

export default LoginPage;