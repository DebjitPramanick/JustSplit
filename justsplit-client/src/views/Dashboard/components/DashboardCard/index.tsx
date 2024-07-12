import { IGroup, IUser } from "~/types";
import * as Styles from "./index.styled";
import ChevronRight from "~/assets/icons/chevron-right.svg?react";

interface IDashboardCardProps {
  title: string;
  children: React.ReactNode;
}

const DashboardCard = ({ title, children }: IDashboardCardProps) => {
  return (
    <Styles.Root>
      <Styles.TitleContainer>
        <Styles.Title>{title}</Styles.Title>
      </Styles.TitleContainer>
      <Styles.RowsContainer>{children}</Styles.RowsContainer>
    </Styles.Root>
  );
};

const GroupsRow = ({ group }: { group: IGroup }) => {
  return (
    <Styles.Row to={`/expenses/group/${group.id}`}>
      <Styles.RowDisplayTitle>{group.name}</Styles.RowDisplayTitle>
      <Styles.IconWrapper>
        <ChevronRight />
      </Styles.IconWrapper>
    </Styles.Row>
  );
};

const FriendsRow = ({ friend }: { friend: IUser }) => {
  return (
    <Styles.Row to={`/expenses/friend/${friend.id}`}>
      <Styles.RowDisplayTitle>{friend.name}</Styles.RowDisplayTitle>
      <Styles.IconWrapper>
        <ChevronRight />
      </Styles.IconWrapper>
    </Styles.Row>
  );
};

DashboardCard.FriendsRow = FriendsRow;
DashboardCard.GroupsRow = GroupsRow;

export default DashboardCard;
