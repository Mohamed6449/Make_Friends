export type User = {
  id: string ;
  email: string;
  userName: string;
  token: string;
  imageUrl?: string;
};
export type UserLogin = {
  email: string;
  password: string;
};
export type UserRegister = {
  email: string;
  userName: string;
  password: string;
};
