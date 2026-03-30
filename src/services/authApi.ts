import type { AuthResponse, LoginRequest, RegisterRequest } from "../types/auth";

const BASE_URL = "http://localhost:3000";

export async function registerUser(data: RegisterRequest): Promise<AuthResponse> {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to register user.");
  }

  const result: AuthResponse = await response.json();
  return result;
}

export async function loginUser(data: LoginRequest): Promise<AuthResponse> {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to log in.");
  }

  const result: AuthResponse = await response.json();
  return result;
}