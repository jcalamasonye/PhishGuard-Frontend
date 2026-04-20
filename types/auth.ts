
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}


export enum AuthStatus {
  AUTHENTICATED = 'authenticated',
  UNAUTHENTICATED = 'unauthenticated',
  LOADING = 'loading',
}


export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organizationId?: string;
  organizationName?: string;
  createdAt: string;
  updatedAt: string;
}


export interface AdminUser extends User {
  role: UserRole.ADMIN;
  organizationId: string;
  organizationName: string;
}


export interface TraineeUser extends User {
  role: UserRole.USER;
  department?: string;
  lastActiveAt?: string;
}


export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}


export interface UserSignupData {
  name: string;
  email: string;
  password: string;
  acceptedTerms: boolean;
}


export interface AdminSignupData extends UserSignupData {
  organizationName: string;
}


export interface PasswordResetRequest {
  email: string;
}


export interface PasswordResetData {
  token: string;
  password: string;
  confirmPassword: string;
}


export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}


export interface AuthError {
  field?: string;
  message: string;
}


export interface AuthContextState {
  user: User | null;
  status: AuthStatus;
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  signup: (data: UserSignupData | AdminSignupData) => Promise<AuthResponse>;
  resetPassword: (data: PasswordResetRequest) => Promise<AuthResponse>;
  updatePassword: (data: PasswordResetData) => Promise<AuthResponse>;
}


export interface FormErrors {
  [key: string]: string | undefined;
}