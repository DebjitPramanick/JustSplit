import { Box, Flex, Text } from "~/components/atoms";
import { Tabs } from "~/components/molecules";
import { ISplit, IUser, SplitType } from "~/types";
import { SPLIT_TYPES } from "../../constants";
import useUser from "~/hooks/useUser";
import styled from "styled-components";

interface IProps {
  splits: ISplit[];
  splitType: SplitType;
  usersToSplit: IUser[];
  onChangeSplit: ({ split }: { split: ISplit }) => void;
  onChangeSplitType: (splitType: SplitType) => void;
}

const SelectSplitStep = ({
  splits,
  splitType,
  usersToSplit,
  onChangeSplit,
  onChangeSplitType,
}: IProps) => {
  const { user } = useUser();

  const handleChangeSplitType = (selectedSplitType: SplitType) => {
    onChangeSplitType(selectedSplitType);
  };

  return (
    <Box>
      <Tabs>
        <Tabs.Tab
          selected={splitType === SPLIT_TYPES.EQUAL}
          onChange={() => handleChangeSplitType(SPLIT_TYPES.EQUAL)}
        >
          Equal
        </Tabs.Tab>
        <Tabs.Tab
          selected={splitType === SPLIT_TYPES.UNEQUAL}
          onChange={() => handleChangeSplitType(SPLIT_TYPES.UNEQUAL)}
        >
          Unequal
        </Tabs.Tab>
        <Tabs.Tab
          selected={splitType === SPLIT_TYPES.PERCENTAGE}
          onChange={() => handleChangeSplitType(SPLIT_TYPES.PERCENTAGE)}
        >
          Percentage
        </Tabs.Tab>
      </Tabs>
      <Box mt="24px">
        {splits.map((split) => {
          const userDetails = usersToSplit.find(
            (_user) => _user.id === split.userId
          );
          if (!userDetails) {
            return null;
          }

          const userDisplayName =
            user.id === userDetails.id ? "You" : userDetails.name;

          return (
            <ParticipantsContainer>
              <Text>{userDisplayName}</Text>
              <Text>
                {split.amount ? `Rs. ${split.amount}` : `${split.percentage} %`}
              </Text>
            </ParticipantsContainer>
          );
        })}
      </Box>
    </Box>
  );
};

export default SelectSplitStep;

const ParticipantsContainer = styled(Flex)`
  justify-content: space-between;
  align-items: center;

  & + & {
    margin-top: 12px;
  }
`;
