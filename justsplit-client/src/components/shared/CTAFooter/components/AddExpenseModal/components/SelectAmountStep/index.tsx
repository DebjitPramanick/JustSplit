import { Box, Input } from "~/components/atoms";

import * as SharedStyles from "../index.styled";

interface IProps {
  amount: number;
  description: string;
  onChangeAmount: (value: number) => void;
  onChangeDescription: (value: string) => void;
}

const SelectAmountStep = ({
  amount,
  description,
  onChangeAmount,
  onChangeDescription,
}: IProps) => {
  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    onChangeAmount(value);
  };

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChangeDescription(value);
  };

  return (
    <Box>
      <Box>
        <SharedStyles.InputLabel>Amount</SharedStyles.InputLabel>
        <Input
          placeholder="Enter amount"
          value={amount}
          onChange={handleChangeAmount}
          type="number"
          min="0"
          mt="12px"
        />
      </Box>
      <Box mt="24px">
        <SharedStyles.InputLabel>Description</SharedStyles.InputLabel>
        <Input
          placeholder="Enter description"
          value={description}
          onChange={handleChangeDescription}
          mt="12px"
        />
      </Box>
    </Box>
  );
};

export default SelectAmountStep;
