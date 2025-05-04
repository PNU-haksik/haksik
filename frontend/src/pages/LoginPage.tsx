import React from "react";
import { useNavigate, Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { login, LoginResult } from "../services/authService";
import "./LoginPage.css";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = async (username: string, password: string) => {
    // --- 디버깅용 admin 계정 처리 ---
    if (username === "admin") {
      console.log("디버깅 모드: 'admin' 계정으로 로그인합니다.");
      // 실제 API 호출 없이 더미 토큰 설정 (선택 사항)
      localStorage.setItem("accessToken", "DEBUG_ADMIN_TOKEN");
      alert("로그인 성공! (디버그 모드)");
      navigate("/main"); // 메인 페이지로 이동
      return; // API 호출 방지
    }
    // --- 여기까지 ---

    try {
      const { token }: LoginResult = await login(username, password);
      localStorage.setItem("accessToken", token);
      alert("로그인 성공!");
      navigate("/main");      // 메인 페이지로 이동
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