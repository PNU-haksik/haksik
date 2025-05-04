// filepath: c:\Private\git\haksik\frontend\src\pages\MainPage.tsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MainPage.css'; // 메인 페이지 스타일

// 임시 QR 코드 데이터 타입 (실제 구현 시 백엔드 응답에 맞게 수정)
interface QrCodeData {
  qrValue: string; // QR 코드로 변환될 값 (예: 토큰, 사용자 ID, 만료 시간 등 포함)
  expiresAt: string; // 만료 시간 문자열
}

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [qrCode, setQrCode] = useState<QrCodeData | null>(null); // 식권 QR 코드 상태
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: 페이지 로드 시 사용자의 유효한 식권 QR 코드가 있는지 확인하는 API 호출
    // 예시: fetchUserQrCode().then(data => setQrCode(data)).finally(() => setIsLoading(false));
    // 임시로 로딩 상태만 해제
    setIsLoading(false);

    // 로그인 상태 확인 (예: 토큰 유무)
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    alert('로그아웃되었습니다.');
    navigate('/login');
  };

  if (isLoading) {
    return <div className="main-page loading">로딩 중...</div>;
  }

  return (
    <div className="main-page">
      <div className="qr-section">
        <h2>내 식권 QR 코드</h2>
        {qrCode ? (
          <div className="qr-code-display">
            {/* TODO: qrCode.qrValue를 사용하여 실제 QR 코드 라이브러리(예: qrcode.react)로 렌더링 */}
            <p>QR 코드 값: {qrCode.qrValue}</p>
            <p>만료 시간: {new Date(qrCode.expiresAt).toLocaleString()}</p>
          </div>
        ) : (
          <p className="no-qr-code">사용 가능한 식권이 없습니다.</p>
        )}
      </div>

      <nav className="main-nav">
        <Link to="/purchase" className="nav-button">
          식권 구매
        </Link>
        <Link to="/menu" className="nav-button">
          식단표 보기
        </Link>
        {/* 필요에 따라 추가 메뉴 버튼 */}
      </nav>

      <button onClick={handleLogout} className="logout-button">
        로그아웃
      </button>
    </div>
  );
};

export default MainPage;