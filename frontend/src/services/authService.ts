export interface LoginResult {
  token: string;
  // 필요한 추가 필드가 있다면 여기에…
}

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function login(
  username: string,
  password: string
): Promise<LoginResult> {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    // 상태 코드별 에러 처리 추가 가능
    throw new Error("로그인에 실패했습니다.");
  }
  return res.json();
}

export interface RegisterResult {
  message: string;
}

export async function register(
  username: string,
  password: string
): Promise<RegisterResult> {
  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    throw new Error("회원가입에 실패했습니다.");
  }
  return res.json();
}