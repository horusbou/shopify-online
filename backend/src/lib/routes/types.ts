
export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  address: string;
  role: "vendor" | "customer" | "admin";
  session: Session
}
export interface Session {
  session_id: string;
  user: User;
  valid: boolean;
  userAgent: string
}

