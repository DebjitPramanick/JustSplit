import { Button } from "~/components/atoms";
import * as Styles from "./index.styled";
import { useImmer } from "use-immer";
import { AddExpenseModal } from "./components/AddExpenseModal";
import { IGroup, IUser } from "~/types";

interface IProps {
  currentFriend?: IUser;
  currentGroup?: IGroup;
}

const CTAFooter = ({ currentFriend, currentGroup }: IProps) => {
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
          <Styles.ActionButtonsContainer>
            <Button text="Add Expense" onClick={handleOpenAddExpenseModal} />
            <Button
              text="Settle Up"
              ml="12px"
              onClick={handleOpenAddExpenseModal}
            />
          </Styles.ActionButtonsContainer>
        </Styles.Container>
      </Styles.Root>
      <AddExpenseModal
        isOpen={actionStates.isAddExpenseModalOpen}
        onCloseModal={handleCloseAddExpenseModal}
        currentFriend={currentFriend}
        currentGroup={currentGroup}
      />
    </>
  );
};

export default CTAFooter;
