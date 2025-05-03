// src/services/authService.ts
export async function login(username: string, password: string): Promise<boolean> {
    // 실제로는 fetch/axios로 서버에 요청
    if (username === "test" && password === "1234") {
      return true;
    }
    return false;
  }
  