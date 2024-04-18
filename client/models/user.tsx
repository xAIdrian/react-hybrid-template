export interface User {
  username: string;
  name: string;
  email: string;
  image: string;
  customerId: string;
  priceId: string;
  createdAt: string;
  hasAccess: boolean;
}

export interface UserResponse {
  username: string;
  name: string;
  email: string;
  image: string;
  customerId: string;
  priceId: string;
  hasAccess: boolean;
  createdAt: string;
  access_token: string;
}

export interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
