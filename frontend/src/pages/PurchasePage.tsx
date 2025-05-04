// filepath: c:\Private\git\haksik\frontend\src\pages\PurchasePage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PurchasePage.css'; // 구매 페이지 스타일
import { registerQueue } from '../services/queueService'; // 대기열 서비스 import

type MenuType = '일품' | '정식';

const PurchasePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState<MenuType | null>(null);
  const [isProcessing, setIsProcessing] = useState(false); // 처리 중 상태 추가
  const price = 4000; // 가격 설정

  const handleMenuSelect = (menu: MenuType) => {
    setSelectedMenu(menu);
  };

  const handlePayment = async () => {
    if (!selectedMenu || isProcessing) return;

    setIsProcessing(true); // 처리 시작
    alert(`${selectedMenu} ${price.toLocaleString()}원 결제를 진행합니다. (가정)`);

    try {
      // 1. 결제 성공 가정
      // TODO: 실제 결제 로직 구현

      // 2. 대기열 등록 요청 (사용자 토큰 필요 - 여기서는 임시로 'USER123' 사용)
      // 실제 구현 시에는 로그인 시 발급받은 토큰 사용
      const userToken = localStorage.getItem('accessToken') || 'USER123_FALLBACK';
      const qrData = await registerQueue(selectedMenu, userToken);

      // 3. QR 정보 저장 (localStorage 사용 예시)
      localStorage.setItem('userQrCode', JSON.stringify(qrData));
      console.log('QR 정보 저장:', qrData);

      // 4. 메인 페이지로 이동
      alert('식권 구매 및 대기열 등록 완료!');
      navigate('/main');

    } catch (error) {
      console.error('처리 중 오류 발생:', error);
      alert('식권 구매 또는 대기열 등록 중 오류가 발생했습니다.');
      setIsProcessing(false); // 오류 발생 시 처리 상태 해제
    }
    // 성공 시에는 페이지 이동하므로 isProcessing 해제 불필요
  };

  return (
    <div className="purchase-page">
      <div className="purchase-card">
        <h2>식권 구매</h2>

        {!selectedMenu ? (
          <div className="menu-selection">
            <p>구매하실 식권 종류를 선택하세요.</p>
            <button
              onClick={() => handleMenuSelect('일품')}
              className="menu-button"
            >
              일품 ({price.toLocaleString()}원)
            </button>
            <button
              onClick={() => handleMenuSelect('정식')}
              className="menu-button"
            >
              정식 ({price.toLocaleString()}원)
            </button>
          </div>
        ) : (
          <div className="payment-section">
            <h3>{selectedMenu}</h3>
            <p className="price-info">결제 금액: {price.toLocaleString()}원</p>
            <button
              onClick={handlePayment}
              className="payment-button"
              disabled={isProcessing} // 처리 중 비활성화
            >
              {isProcessing ? '처리 중...' : '결제하기'}
            </button>
            <button
              onClick={() => !isProcessing && setSelectedMenu(null)} // 처리 중 아닐 때만 취소 가능
              className="cancel-button"
              disabled={isProcessing}
            >
              취소
            </button>
          </div>
        )}
      </div>
      <button
        onClick={() => !isProcessing && navigate(-1)} // 처리 중 아닐 때만 뒤로가기 가능
        className="back-button"
        disabled={isProcessing}
      >
        뒤로가기
      </button>
    </div>
  );
};

export default PurchasePage;