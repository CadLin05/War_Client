export interface RegisterRequest {
  username: string;
  password: string;
  password2: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  token?: string;
  userId?: number;
}

//creating an interface to check if logged in
export interface AuthState{
  loggedIn: boolean;
}