export async function login(username: string, password: string): Promise<boolean> {
    // 실제로는 서버에 요청해야 함. 여기선 예시로 성공 처리
    if (username === "test" && password === "1234") {
      return true;
    }
    return false;
  }
  