import { IGroup, IUser } from "~/types";
import * as Styles from "./index.styled";
import ChevronRight from "~/assets/icons/chevron-right.svg?react";

interface IExpenseCardProps {
  title: string;
  children: React.ReactNode;
}

const ExpensesCard = ({ title, children }: IExpenseCardProps) => {
  return (
    <Styles.Root>
      <Styles.TitleContainer>
        <Styles.Title>{title}</Styles.Title>
      </Styles.TitleContainer>
      <Styles.RowsContainer>{children}</Styles.RowsContainer>
    </Styles.Root>
  );
};

const GroupExpense = ({ group }: { group: IGroup }) => {
  return (
    <Styles.ExpenseRow>
      <Styles.ExpenseRowDisplayTitle>
        {group.name}
      </Styles.ExpenseRowDisplayTitle>
      <Styles.IconWrapper>
        <ChevronRight />
      </Styles.IconWrapper>
    </Styles.ExpenseRow>
  );
};

const IndividualExpense = ({ friend }: { friend: IUser }) => {
  return (
    <Styles.ExpenseRow>
      <Styles.ExpenseRowDisplayTitle>
        {friend.name}
      </Styles.ExpenseRowDisplayTitle>
      <Styles.IconWrapper>
        <ChevronRight />
      </Styles.IconWrapper>
    </Styles.ExpenseRow>
  );
};

ExpensesCard.IndividualExpense = IndividualExpense;
ExpensesCard.GroupExpense = GroupExpense;

export default ExpensesCard;
