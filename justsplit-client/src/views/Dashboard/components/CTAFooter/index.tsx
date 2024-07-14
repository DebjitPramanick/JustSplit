import { Button } from "~/components/atoms";
import * as Styles from "./index.styled";
import { useImmer } from "use-immer";
import { AddExpenseModal } from "./components/AddExpenseModal";
import { IGroup, IUser } from "~/types";

interface IProps {
  groups: IGroup[];
  friends: IUser[];
}

const CTAFooter = ({ groups, friends }: IProps) => {
  const [actionStates, setActionStates] = useImmer({
    isAddExpenseModalOpen: false,
  });

  const handleOpenAddExpenseModal = () => {
    setActionStates((draft) => {
      draft.isAddExpenseModalOpen = true;
    });
  };

  const handleCloseAddExpenseModal = () => {
    setActionStates((draft) => {
      draft.isAddExpenseModalOpen = false;
    });
  };

  return (
    <>
      <Styles.Root>
        <Styles.Container>
          <Button
            text="Split Expense"
            display="block"
            ml="auto"
            onClick={handleOpenAddExpenseModal}
          />
        </Styles.Container>
      </Styles.Root>
      <AddExpenseModal
        isOpen={actionStates.isAddExpenseModalOpen}
        onCloseModal={handleCloseAddExpenseModal}
        groups={groups}
        friends={friends}
      />
    </>
  );
};

export default CTAFooter;
