export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  token: string;
  createdAt: string;
  updatedAt: string;
}

export interface IGroup {
  id: string;
  name: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}
