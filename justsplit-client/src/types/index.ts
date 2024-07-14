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

export type SplitType = "EQUAL" | "UNEQUAL" | "PERCENTAGE";

export interface IExpense {
  id: string;
  description: string;
  groupId?: string;
  amount: number;
  splitType: SplitType;
  paidBy: string;
  participants: string[];
  splits: ISplit[];
  createdAt: string;
  updatedAt: string;
}

export interface ISplit {
  userId: string;
  amount?: number;
  percentage?: number;
}
