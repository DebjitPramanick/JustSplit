import Select from "react-select";
import { Box } from "~/components/atoms";
import { IGroup, IUser } from "~/types";

import * as SharedStyles from "../index.styled";

interface IProps {
  groups: IGroup[];
  friends: IUser[];
  selectedGroup: IGroup | null;
  selectedFriend: IUser | null;
  onSelectFriend: ({ friend }: { friend: IUser }) => void;
  onSelectGroup: ({ group }: { group: IGroup }) => void;
}

const SelectFriendsStep = ({
  groups,
  friends,
  selectedGroup,
  selectedFriend,
  onSelectFriend,
  onSelectGroup,
}: IProps) => {
  const options = [
    {
      label: "Friends",
      options: friends,
    },
    {
      label: "Groups",
      options: groups,
    },
  ];

  const handleSelect = (selected: IGroup | IUser) => {
    if ((selected as IUser).email) {
      onSelectFriend({ friend: selected as IUser });
    } else {
      onSelectGroup({ group: selected as IGroup });
    }
  };

  return (
    <Box>
      <SharedStyles.InputLabel>Select Friend or Group</SharedStyles.InputLabel>
      <Box mt="12px">
        <Select
          value={selectedFriend || selectedGroup}
          onChange={handleSelect}
          placeholder="Select friend or group"
          options={options}
          getOptionValue={(option) => option}
          getOptionLabel={(option) => option.name}
        />
      </Box>
    </Box>
  );
};

export default SelectFriendsStep;
