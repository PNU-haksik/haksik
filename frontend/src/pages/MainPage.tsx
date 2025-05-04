// filepath: c:\Private\git\haksik\frontend\src\pages\MainPage.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/MainPage.css'; // CSS 경로 확인
import { getQueueInfo, QueueInfo } from '../services/queueService'; // 대기열 서비스 import
import qrImage from '../assets/QR_PNU_onestop.png'; // 임시 QR 이미지 import

// localStorage에서 가져올 QR 코드 데이터 타입
interface StoredQrCodeData {
  qrValue: string;
  expiresAt: string;
}

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [storedQrCode, setStoredQrCode] = useState<StoredQrCodeData | null>(null);
  const [queueInfo, setQueueInfo] = useState<QueueInfo | null>(null);
  const [isLoadingQr, setIsLoadingQr] = useState(true);
  const [isLoadingQueue, setIsLoadingQueue] = useState(true);
  const [errorQueue, setErrorQueue] = useState<string | null>(null);

  // 대기열 정보 가져오는 함수 (useCallback으로 메모이제이션)
  const fetchQueueData = useCallback(async () => {
    setIsLoadingQueue(true);
    setErrorQueue(null);
    try {
      const data = await getQueueInfo();
      setQueueInfo(data);
    } catch (err) {
      console.error('대기열 정보 로드 실패:', err);
      setErrorQueue('대기열 정보를 불러오는 데 실패했습니다.');
      setQueueInfo(null); // 오류 시 정보 초기화
    } finally {
      setIsLoadingQueue(false);
    }
  }, []); // 종속성 없음

  // 컴포넌트 마운트 시 실행
  useEffect(() => {
    // 로그인 상태 확인
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return; // 로그인 안되어 있으면 더 이상 진행 안 함
    }

    // 1. QR 코드 정보 로드 (localStorage)
    const qrDataString = localStorage.getItem('userQrCode');
    if (qrDataString) {
      try {
        const qrData: StoredQrCodeData = JSON.parse(qrDataString);
        // 만료 시간 체크 (선택 사항)
        if (new Date(qrData.expiresAt) > new Date()) {
          setStoredQrCode(qrData);
        } else {
          console.log('저장된 QR 코드가 만료되었습니다.');
          localStorage.removeItem('userQrCode'); // 만료된 QR 코드 삭제
        }
      } catch (e) {
        console.error('QR 코드 파싱 오류:', e);
        localStorage.removeItem('userQrCode'); // 잘못된 데이터 삭제
      }
    }
    setIsLoadingQr(false);

    // 2. 초기 대기열 정보 로드
    fetchQueueData();

    // 3. 10초마다 대기열 정보 자동 새로고침 설정
    const intervalId = setInterval(fetchQueueData, 10000); // 10초

    // 컴포넌트 언마운트 시 인터벌 정리
    return () => {
      clearInterval(intervalId);
    };
  }, [navigate, fetchQueueData]); // fetchQueueData를 종속성에 추가

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userQrCode'); // 로그아웃 시 QR 코드도 삭제
    alert('로그아웃되었습니다.');
    navigate('/login');
  };

  // 수동 새로고침 핸들러
  const handleRefreshQueue = () => {
    if (!isLoadingQueue) { // 로딩 중이 아닐 때만 실행
      fetchQueueData();
    }
  };

  if (isLoadingQr) { // QR 로딩 중 표시 (선택 사항)
    return <div className="main-page loading">사용자 정보 로딩 중...</div>;
  }

  return (
    <div className="main-page">
      {/* QR 코드 섹션 */}
      <div className="qr-section">
        <h2>내 식권 QR 코드</h2>
        {storedQrCode ? (
          <div className="qr-code-display">
            {/* 임시 이미지 사용 */}
            <img src={qrImage} alt="식권 QR 코드" className="qr-image" />
            {/* 실제 구현 시: <QRCode value={storedQrCode.qrValue} size={128} /> */}
            <p className="qr-details qr-menu-name"> {/* qr-menu-name 클래스 추가 */}
              메뉴: {storedQrCode.qrValue.split('|').find(part => part.startsWith('MENU:'))?.split(':')[1] || '알 수 없음'}
            </p>
            <p className="qr-details">만료: {new Date(storedQrCode.expiresAt).toLocaleString()}</p>
          </div>
        ) : (
          <p className="no-qr-code">사용 가능한 식권이 없습니다.</p>
        )}
      </div>

      {/* 대기열 정보 섹션 */}
      <div className="queue-section">
        <h2>실시간 대기 현황</h2>
        {isLoadingQueue && <p>대기열 정보 로딩 중...</p>}
        {errorQueue && <p className="error-message">{errorQueue}</p>}
        {queueInfo !== null && !isLoadingQueue && !errorQueue && (
          <div className="queue-info">
            <p>현재 대기 인원: <strong>{queueInfo.count}명</strong></p>
            {queueInfo.estimatedWaitTime !== undefined && (
              <p>예상 대기 시간: 약 {queueInfo.estimatedWaitTime}분</p>
            )}
          </div>
        )}
        <button
          onClick={handleRefreshQueue}
          className="refresh-button"
          disabled={isLoadingQueue} // 로딩 중 비활성화
        >
          {isLoadingQueue ? '새로고침 중...' : '새로고침'}
        </button>
      </div>

      {/* 네비게이션 및 로그아웃 버튼 */}
      <nav className="main-nav">
        <Link to="/purchase" className="nav-button">
          식권 구매
        </Link>
        <Link to="/menu" className="nav-button">
          식단표 보기
        </Link>
      </nav>
      <button onClick={handleLogout} className="logout-button">
        로그아웃
      </button>
    </div>
  );
};

export default MainPage;