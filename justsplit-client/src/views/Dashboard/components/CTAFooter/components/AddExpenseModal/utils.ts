import { ISplit, IUser, SplitType } from "~/types";
import { SPLIT_TYPES } from "./constants";

export const getSplits = ({
  amount = 0,
  users,
  splitType = SPLIT_TYPES.EQUAL,
}: {
  amount?: number;
  users: IUser[];
  splitType: SplitType;
}) => {
  const expenseSplits: ISplit[] = [];

  if (splitType === SPLIT_TYPES.EQUAL || splitType === SPLIT_TYPES.UNEQUAL) {
    const splitAmount = amount / users.length;
    users.forEach((user) => {
      expenseSplits.push({
        userId: user.id,
        amount: splitAmount,
      });
    });
  } else if (splitType === SPLIT_TYPES.PERCENTAGE) {
    users.forEach((user) => {
      expenseSplits.push({
        userId: user.id,
        percentage: 50,
      });
    });
  }

  return expenseSplits;
};
