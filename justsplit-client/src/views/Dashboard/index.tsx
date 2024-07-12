import { useGroupApi } from "~/api";
import { Header, PageLoader } from "~/components/molecules";
import useUser from "~/hooks/useUser";
import { IGroup } from "~/types";
import * as Styles from "./index.styled";
import ExpensesCard from "./components/ExpensesCard";
import CTAFooter from "./components/CTAFooter";

const DashboardView = () => {
  const { user } = useUser();
  const { getUserGroupsQuery, createGroupMutation } = useGroupApi({
    userId: user?.id || "",
  });

  const handleAddExpense = () => {};

  let nodeToRender;

  if (getUserGroupsQuery.isLoading) {
    nodeToRender = <PageLoader />;
  } else {
    const userGroups = getUserGroupsQuery.data;
    nodeToRender = (
      <Styles.Root>
        <Styles.PageTitleBackground />
        <Styles.Container>
          <Styles.PageTitle>Hello, {user?.name}!</Styles.PageTitle>
          <Styles.PageDescription mt="8px">
            Welcome to JustSplit.
          </Styles.PageDescription>
          <Styles.CardsContainer mt="32px">
            <ExpensesCard title={"Groups"}>
              {userGroups.map((group: IGroup) => (
                <ExpensesCard.GroupExpense
                  group={group}
                ></ExpensesCard.GroupExpense>
              ))}
            </ExpensesCard>
            <ExpensesCard title={"Friends"}>
              {userGroups.map((group: IGroup) => (
                <ExpensesCard.GroupExpense
                  group={group}
                ></ExpensesCard.GroupExpense>
              ))}
            </ExpensesCard>
            <ExpensesCard title={"Balance Sheet"}>
              {userGroups.map((group: IGroup) => (
                <ExpensesCard.GroupExpense
                  group={group}
                ></ExpensesCard.GroupExpense>
              ))}
            </ExpensesCard>
          </Styles.CardsContainer>
        </Styles.Container>
        <CTAFooter />
      </Styles.Root>
    );
  }
  return (
    <>
      <Header />
      <Styles.Root>{nodeToRender}</Styles.Root>
    </>
  );
};

export default DashboardView;
