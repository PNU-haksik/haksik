// src/pages/LoginPage.tsx
import React from "react";
import LoginForm from "../components/LoginForm";
import { login } from "../services/authService";

const LoginPage: React.FC = () => {
  const handleLogin = async (username: string, password: string) => {
    const success = await login(username, password);
    if (success) {
      alert("로그인 성공!");
      // 페이지 이동 등 추가 처리
    } else {
      alert("로그인 실패!");
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
