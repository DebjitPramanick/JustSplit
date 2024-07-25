import { Button, Flex } from "~/components/atoms";
import * as Styles from "./index.styled";

const ActionsCard = ({
  onSettleNowButtonClick,
  onAddExpenseButtonClick,
}: any) => {
  return (
    <Styles.Root>
      <Flex alignItems="center">
        <Button
          text="Add Expense"
          outlined
          flex="1"
          onClick={onAddExpenseButtonClick}
        />
        <Button
          text="Settle Now"
          flex="1"
          ml="12px"
          onClick={onSettleNowButtonClick}
        />
      </Flex>
    </Styles.Root>
  );
};

export default ActionsCard;
