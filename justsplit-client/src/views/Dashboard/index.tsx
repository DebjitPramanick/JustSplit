import { friendApi, groupApi } from "~/api";
import { Header } from "~/components/molecules";
import useApp from "~/hooks/useApp";
import { IGroup, IUser } from "~/types";
import * as Styles from "./index.styled";
import DashboardCard from "./components/DashboardCard";
import CTAFooter from "~/components/shared/CTAFooter";
import { useRequestStates } from "~/hooks";
import { useEffect } from "react";

const DashboardView = () => {
  const { user } = useApp();

  const [fetchUserFriendsRequestState, fetchUserFriendsRequestHandlers] =
    useRequestStates();
  const [fetchUserGroupsRequestState, fetchUserGroupsRequestHandlers] =
    useRequestStates();

  const getUserFriends = async () => {
    fetchUserFriendsRequestHandlers.pending();
    try {
      const response = await friendApi.fetchUserFriends();
      fetchUserFriendsRequestHandlers.fulfilled(response);
    } catch (error) {
      fetchUserFriendsRequestHandlers.rejected(error);
    }
  };

  const getUserGroups = async () => {
    fetchUserGroupsRequestHandlers.pending();
    try {
      const response = await groupApi.fetchUserGroups(user.id);
      fetchUserGroupsRequestHandlers.fulfilled(response);
    } catch (error) {
      fetchUserGroupsRequestHandlers.rejected(error);
    }
  };

  const handleAddExpense = () => {};

  useEffect(() => {
    getUserFriends();
    getUserGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let friendsNode;
  let groupsNode;

  if (fetchUserFriendsRequestState.fulfilled) {
    const userFriends = fetchUserFriendsRequestState.data;
    friendsNode = (
      <DashboardCard title="Friends">
        {userFriends.map((friend: IUser) => (
          <DashboardCard.FriendsRow
            key={friend.id}
            friend={friend}
          ></DashboardCard.FriendsRow>
        ))}
      </DashboardCard>
    );
  }

  if (fetchUserGroupsRequestState.fulfilled) {
    const userGroups = fetchUserGroupsRequestState.data;
    groupsNode = (
      <DashboardCard title="Groups">
        {userGroups.map((group: IGroup) => (
          <DashboardCard.GroupsRow
            key={group.id}
            group={group}
          ></DashboardCard.GroupsRow>
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
        <CTAFooter
          friends={fetchUserFriendsRequestState.data}
          groups={fetchUserGroupsRequestState.data}
        />
      </Styles.Root>
    </>
  );
};

export default DashboardView;
