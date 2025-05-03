import React from "react";
import LoginForm from "../components/LoginForm";
import { login } from "../services/authService";

const LoginPage: React.FC = () => {
  const handleLogin = async (username: string, password: string) => {
    const success = await login(username, password);
    if (success) {
      alert("로그인 성공!");
      // 이동 또는 상태 변경
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
