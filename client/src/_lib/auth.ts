import { AUTH_ENDPOINT, AUTH_REFRESH_ENDPOINT, AUTH_VERIFY_ENDPOINT } from "./endpoint";

type Token = {
  access?: string;
  refresh?: string;
}
export async function fetchToken(email: string, password: string): Promise<Token | null> {
  const res = await fetch(AUTH_ENDPOINT, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const token = await res.json();
  return token["access"] ? token : null;
}

export async function refreshToken(refresh: string): Promise<Token | null> {
  const res = await fetch(AUTH_REFRESH_ENDPOINT, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });
  const token = await res.json();
  return token["access"] ? token : null;
}

export async function verifyToken(token: string): Promise<boolean> {
  const res = await fetch(AUTH_VERIFY_ENDPOINT, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });
  const status = await res.json();
  return status["detail"] ? false : true;
}