// (새 파일 생성 또는 기존 서비스 파일에 추가)

export interface QueueRegistrationResult {
  qrValue: string; // 실제 QR 생성에 사용될 데이터 (예: 고유 ID, 메뉴, 시간 등)
  expiresAt: string; // ISO 8601 형식의 만료 시간 문자열
}

export interface QueueInfo {
  count: number; // 현재 대기 인원
  estimatedWaitTime?: number; // 예상 대기 시간(분) - 선택 사항
}

// --- 대기열 상태 관리 (프론트엔드 임시) ---
let currentQueueCount = 0; // 현재 대기 인원 추적 변수
// -----------------------------------------

// 임시: 대기열 등록 API 호출 함수 (결제 성공 후 호출 가정)
export async function registerQueue(menu: string, token: string): Promise<QueueRegistrationResult> {
  console.log(`대기열 등록 요청: 메뉴=${menu}, 토큰=${token}`);
  // TODO: 실제 백엔드 API 호출 (/api/queue/register 등)
  // const response = await fetch('/api/queue/register', { method: 'POST', ... });
  // const data = await response.json();

  // --- 대기열 증가 로직 ---
  currentQueueCount++; // 대기 인원 1 증가
  console.log(`현재 대기 인원: ${currentQueueCount}`);
  // -----------------------

  // 임시 QR 데이터 반환
  const expires = new Date();
  expires.setHours(expires.getHours() + 2); // 2시간 후 만료

  return Promise.resolve({
    qrValue: `USER_TOKEN:${token}|MENU:${menu}|EXP:${expires.toISOString()}`,
    expiresAt: expires.toISOString(),
  });
}

// 임시: 대기열 정보 조회 API 호출 함수
export async function getQueueInfo(): Promise<QueueInfo> {
  console.log('대기열 정보 조회 요청');
  // TODO: 실제 백엔드 API 호출 (/api/queue/info 등)
  // const response = await fetch('/api/queue/info');
  // const data = await response.json();

  // --- 현재 대기 인원 반환 ---
  const count = currentQueueCount;
  return Promise.resolve({
    count: count,
    estimatedWaitTime: count > 0 ? Math.ceil(count * 0.5) : 0, // 대기 인원 * 0.5분 (예시)
  });
  // -------------------------
}