import { Header, PageLoader } from "~/components/molecules";
import * as Styles from "../index.styled";
import colors from "~/styles/colors";
import { expenseApi } from "~/api";
import { useParams } from "react-router-dom";
import { Box, Flex } from "~/components/atoms";
import { IExpense } from "~/types";
import { formatTime } from "~/utils/date.utils";
import useApp from "~/hooks/useApp";
import { useRequestStates } from "~/hooks";
import { useEffect } from "react";
import ActionsCard from "../components/ActionsCard";
import CTAFooter from "~/components/shared/CTAFooter";

const FriendExpensesView = () => {
  const { user } = useApp();
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

  const { expenses = [], friend } = fetchFriendExpensesRequestState.data || {};

  let expensesNode;
  let headerNode;

  if (fetchFriendExpensesRequestState.pending) {
    expensesNode = <PageLoader />;
  } else if (fetchFriendExpensesRequestState.fulfilled) {
    expensesNode = (
      <Styles.ExpensesContainer mt="16px">
        {expenses.map((expense: IExpense) => {
          const isOwed = expense.paidBy === user?.id;
          const currentUserSplit = expense.splits.find(
            (split) => split.userId === user?.id
          );

          return (
            <Styles.Expense key={expense.id}>
              <Flex>
                <Styles.ExpenseDate>
                  <span style={{ fontSize: "14px" }}>
                    {formatTime(expense.createdAt, "MMMM")}
                  </span>
                  <span style={{ fontSize: "16px", display: "block" }}>
                    {formatTime(expense.createdAt, "Do")}
                  </span>
                </Styles.ExpenseDate>
                <Box ml="16px">
                  <Styles.ExpenseDescription>
                    {expense.description}
                  </Styles.ExpenseDescription>
                  <Styles.ExpensePaidBy mt="4px">
                    Rs. {expense.amount} paid by.
                  </Styles.ExpensePaidBy>
                </Box>
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
      <Styles.PageTitleContainer>
        <Styles.PageTitle>{friend.name}</Styles.PageTitle>
        <Styles.BalanceText mt="12px">
          You own {friend.name}{" "}
          <span style={{ color: colors.TEXT_POSITIVE_WEAK, fontWeight: 600 }}>
            Rs. 400
          </span>
        </Styles.BalanceText>
      </Styles.PageTitleContainer>
    );
  }

  return (
    <>
      <Header />
      <Styles.Root>
        <Styles.Container>
          <Flex>
            <Styles.LeftSection style={{ flex: 1 }}>
              {headerNode}
              {expensesNode}
            </Styles.LeftSection>
            <Styles.RightSection>
              <ActionsCard />
            </Styles.RightSection>
          </Flex>
        </Styles.Container>
      </Styles.Root>
      <CTAFooter currentFriend={friend} />
    </>
  );
};

export default FriendExpensesView;
