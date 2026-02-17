export interface UserView {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface User extends UserView {
  id: number;
}

export interface UserLoginView {
  email: string;
  password: string;
}
