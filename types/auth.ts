/**
 * User roles in the system
 */
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

/**
 * Authentication status
 */
export enum AuthStatus {
  AUTHENTICATED = 'authenticated',
  UNAUTHENTICATED = 'unauthenticated',
  LOADING = 'loading',
}

/**
 * Base user interface
 */
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

/**
 * Admin user with additional fields
 */
export interface AdminUser extends User {
  role: UserRole.ADMIN;
  organizationId: string;
  organizationName: string;
}

/**
 * Regular user (trainee)
 */
export interface TraineeUser extends User {
  role: UserRole.USER;
  department?: string;
  lastActiveAt?: string;
}

/**
 * Login credentials
 */
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * User signup data
 */
export interface UserSignupData {
  name: string;
  email: string;
  password: string;
  acceptedTerms: boolean;
}

/**
 * Admin/Organization signup data
 */
export interface AdminSignupData extends UserSignupData {
  organizationName: string;
}

/**
 * Password reset request
 */
export interface PasswordResetRequest {
  email: string;
}

/**
 * Password reset data
 */
export interface PasswordResetData {
  token: string;
  password: string;
  confirmPassword: string;
}

/**
 * Auth API response
 */
export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

/**
 * Auth error response
 */
export interface AuthError {
  field?: string;
  message: string;
}

/**
 * Auth context state
 */
export interface AuthContextState {
  user: User | null;
  status: AuthStatus;
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  signup: (data: UserSignupData | AdminSignupData) => Promise<AuthResponse>;
  resetPassword: (data: PasswordResetRequest) => Promise<AuthResponse>;
  updatePassword: (data: PasswordResetData) => Promise<AuthResponse>;
}

/**
 * Form validation errors
 */
export interface FormErrors {
  [key: string]: string | undefined;
}