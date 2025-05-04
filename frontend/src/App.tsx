// filepath: c:\Private\git\haksik\frontend\src\App.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import PurchasePage from "./pages/PurchasePage"; // 실제 PurchasePage import

// 임시 페이지 컴포넌트 (MenuPage만 남김)
const MenuPage: React.FC = () => <div style={{ padding: '2rem' }}>식단표 페이지 (구현 예정)</div>;

const App: React.FC = () => (
  <>
    <Header />
    <BrowserRouter>
      <Routes>
        {/* 기본 경로는 로그인 페이지로 */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 인증 관련 페이지 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* 로그인 후 메인 페이지 */}
        <Route path="/main" element={<MainPage />} />

        {/* 추가 기능 페이지 */}
        <Route path="/purchase" element={<PurchasePage />} /> {/* 실제 컴포넌트 사용 */}
        <Route path="/menu" element={<MenuPage />} />

        {/* 정의되지 않은 경로는 메인으로 리다이렉트 (또는 404 페이지) */}
        <Route path="*" element={<Navigate to="/main" replace />} />
      </Routes>
    </BrowserRouter>
  </>
);

export default App;