import { Box, Input } from "~/components/atoms";

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
      <Input
        placeholder="Enter amount"
        value={amount}
        onChange={handleChangeAmount}
        type="number"
        min="0"
      />

      <Input
        placeholder="Enter description"
        value={description}
        onChange={handleChangeDescription}
      />
    </Box>
  );
};

export default SelectAmountStep;
