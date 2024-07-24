import { Header, PageLoader } from "~/components/molecules";
import * as Styles from "./index.styled";
import colors from "~/styles/colors";
import { expenseApi } from "~/api";
import { useParams } from "react-router-dom";
import { Flex } from "~/components/atoms";
import { IExpense } from "~/types";
import { formatTime } from "~/utils/date.utils";
import useUser from "~/hooks/useUser";
import { useRequestStates } from "~/hooks";
import { useEffect } from "react";

const FriendExpensesView = () => {
  const { user } = useUser();
  const { friendId } = useParams();
  const [fetchFriendExpensesRequestState, fetchFriendExpensesRequestHandlers] =
    useRequestStates();

  const getFriendExpenses = async () => {
    if (!friendId) {
      return;
    }
    try {
      fetchFriendExpensesRequestHandlers.pending();
      const response = await expenseApi.fetchFriendExpenses(friendId);
      fetchFriendExpensesRequestHandlers.fulfilled(response);
    } catch (error) {
      fetchFriendExpensesRequestHandlers.rejected(error);
    }
  };

  useEffect(() => {
    getFriendExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let expensesNode;
  let headerNode;

  if (fetchFriendExpensesRequestState.pending) {
    expensesNode = <PageLoader />;
  } else if (fetchFriendExpensesRequestState.fulfilled) {
    const { expenses = [], friend } = fetchFriendExpensesRequestState.data;
    expensesNode = (
      <Styles.ExpensesContainer mt="32px">
        {expenses.map((expense: IExpense) => {
          const isOwed = expense.paidBy === user?.id;
          const currentUserSplit = expense.splits.find(
            (split) => split.userId === user?.id
          );

          return (
            <Styles.Expense key={expense.id}>
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
                {currentUserSplit?.amount}
              </Styles.ExpenseAmount>
            </Styles.Expense>
          );
        })}
      </Styles.ExpensesContainer>
    );

    headerNode = (
      <Styles.StickyHeader>
        <Styles.FriendNameTitle>{friend.name}</Styles.FriendNameTitle>
        <Styles.BalanceText mt="12px">
          You own {friend.name}{" "}
          <span style={{ color: colors.TEXT_POSITIVE_WEAK, fontWeight: 600 }}>
            Rs. 400
          </span>
        </Styles.BalanceText>
      </Styles.StickyHeader>
    );
  }

  return (
    <>
      <Header />
      <Styles.Root>
        <Styles.Container>
          {headerNode}
          {expensesNode}
        </Styles.Container>
        {/* <CTAFooter /> */}
      </Styles.Root>
    </>
  );
};

export default FriendExpensesView;
