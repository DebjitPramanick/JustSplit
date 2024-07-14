import { Header, PageLoader } from "~/components/molecules";
import * as Styles from "./index.styled";
import colors from "~/styles/colors";
import { useExpenseApi } from "~/api";
import { useParams } from "react-router-dom";
import { Flex } from "~/components/atoms";
import { IExpense } from "~/types";
import { formatTime } from "~/utils/date.utils";
import useUser from "~/hooks/useUser";

const FriendExpensesView = () => {
  const { user } = useUser();
  const { friendId } = useParams();
  const { getFriendExpensesQuery } = useExpenseApi({ friendId });
  let expensesNode;

  if (getFriendExpensesQuery.isLoading) {
    expensesNode = <PageLoader />;
  } else if (getFriendExpensesQuery.isSuccess) {
    expensesNode = (
      <Styles.ExpensesContainer mt="32px">
        {getFriendExpensesQuery.data.map((expense: IExpense) => {
          const isOwed = expense.paidBy === user?.id;
          return (
            <Styles.Expense>
              <Flex>
                <Styles.ExpenseDate>
                  {formatTime(expense.createdAt, "Do MMMM, YYYY")}
                </Styles.ExpenseDate>
                <Styles.ExpenseDescription ml="12px">
                  {expense.description}
                </Styles.ExpenseDescription>
              </Flex>
              <Styles.ExpenseAmount
                color={
                  isOwed ? colors.TEXT_POSITIVE_WEAK : colors.TEXT_NEGATIVE_WEAK
                }
              >
                {isOwed ? "+" : "-"}
                {expense.amount}
              </Styles.ExpenseAmount>
            </Styles.Expense>
          );
        })}
      </Styles.ExpensesContainer>
    );
  }

  return (
    <>
      <Header />
      <Styles.Root>
        <Styles.Container>
          <Styles.StickyHeader>
            <Styles.FriendNameTitle>Debjit Pramanick</Styles.FriendNameTitle>
            <Styles.BalanceText mt="12px">
              You own Debjit{" "}
              <span
                style={{ color: colors.TEXT_POSITIVE_WEAK, fontWeight: 600 }}
              >
                Rs. 400
              </span>
            </Styles.BalanceText>
          </Styles.StickyHeader>
          {expensesNode}
        </Styles.Container>
        {/* <CTAFooter /> */}
      </Styles.Root>
    </>
  );
};

export default FriendExpensesView;
