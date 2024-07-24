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

const GroupExpensesView = () => {
  const { user } = useUser();
  const { groupId } = useParams();
  const [fetchGroupExpensesRequestState, fetchGroupExpensesRequestHandlers] =
    useRequestStates();

  const getGroupExpenses = async () => {
    if (!groupId) {
      return;
    }
    try {
      fetchGroupExpensesRequestHandlers.pending();
      const response = await expenseApi.fetchGroupExpenses(groupId);
      fetchGroupExpensesRequestHandlers.fulfilled(response);
    } catch (error) {
      fetchGroupExpensesRequestHandlers.rejected(error);
    }
  };

  useEffect(() => {
    getGroupExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let expensesNode;
  let headerNode;

  if (fetchGroupExpensesRequestState.pending) {
    expensesNode = <PageLoader />;
  } else if (fetchGroupExpensesRequestState.fulfilled) {
    const { expenses = [], group } = fetchGroupExpensesRequestState.data;
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
        <Styles.FriendNameTitle>{group.name}</Styles.FriendNameTitle>
        <Styles.BalanceText mt="12px">
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

export default GroupExpensesView;
