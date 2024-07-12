import { useFriendApi, useGroupApi } from "~/api";
import { Header } from "~/components/molecules";
import useUser from "~/hooks/useUser";
import { IGroup, IUser } from "~/types";
import * as Styles from "./index.styled";
import DashboardCard from "./components/DashboardCard";
import CTAFooter from "./components/CTAFooter";

const DashboardView = () => {
  const { user } = useUser();
  const { getUserFriendsQuery } = useFriendApi({
    userId: user?.id || "",
  });
  const { getUserGroupsQuery, createGroupMutation } = useGroupApi({
    userId: user?.id || "",
  });

  const handleAddExpense = () => {};

  let friendsNode;
  let groupsNode;

  if (getUserFriendsQuery.isSuccess) {
    const userFriends = getUserFriendsQuery.data;
    friendsNode = (
      <DashboardCard title="Friends">
        {userFriends.map((friend: IUser) => (
          <DashboardCard.FriendsRow friend={friend}></DashboardCard.FriendsRow>
        ))}
      </DashboardCard>
    );
  }

  if (getUserGroupsQuery.isSuccess) {
    const userGroups = getUserGroupsQuery.data;
    groupsNode = (
      <DashboardCard title="Groups">
        {userGroups.map((group: IGroup) => (
          <DashboardCard.GroupsRow group={group}></DashboardCard.GroupsRow>
        ))}
      </DashboardCard>
    );
  }

  return (
    <>
      <Header />
      <Styles.Root>
        <Styles.PageTitleBackground />
        <Styles.Container>
          <Styles.PageTitle>Hello, {user?.name}!</Styles.PageTitle>
          <Styles.PageDescription mt="8px">
            Welcome to JustSplit.
          </Styles.PageDescription>
          <Styles.CardsContainer mt="32px">
            {friendsNode}
            {groupsNode}
          </Styles.CardsContainer>
        </Styles.Container>
        <CTAFooter />
      </Styles.Root>
    </>
  );
};

export default DashboardView;
