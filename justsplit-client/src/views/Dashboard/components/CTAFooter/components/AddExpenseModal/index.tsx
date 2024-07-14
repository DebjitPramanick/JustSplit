import { useImmer } from "use-immer";
import * as Styles from "./index.styled";
import { Button, Flex } from "~/components/atoms";
import {
  ADD_EXPENSE_STEPS,
  ADD_EXPENSE_STEPS_SEQUENCE,
  SPLIT_TYPES,
} from "./constants";
import SelectFriendsStep from "./components/SelectFriendsStep";
import SelectAmountStep from "./components/SelectAmountStep";
import SelectSplitStep from "./components/SelectSplitStep";
import SplitSuccessStep from "./components/SplitSuccessStep";
import { IExpense, IGroup, ISplit, IUser, SplitType } from "~/types";
import { useEffect } from "react";
import useUser from "~/hooks/useUser";
import { getSplits } from "./utils";
import { useExpenseApi } from "~/api";

interface IProps {
  isOpen: boolean;
  groups: IGroup[];
  friends: IUser[];
  onCloseModal: () => void;
}

const initialState: {
  currentStepIndex: number;
  selectedGroup: IGroup | null;
  selectedFriend: IUser | null;
  amount: number;
  expenseDescription: string;
  splitType: SplitType;
  usersToSplitExpense: IUser[];
  expenseSplits: ISplit[];
  amountPaidBy: IUser | null;
} = {
  currentStepIndex: 0,
  selectedGroup: null,
  selectedFriend: null,
  amount: 0,
  expenseDescription: "",
  splitType: SPLIT_TYPES.EQUAL,
  usersToSplitExpense: [],
  expenseSplits: [],
  amountPaidBy: null,
};

export const AddExpenseModal = ({
  isOpen,
  onCloseModal,
  groups,
  friends,
}: IProps) => {
  const { user } = useUser();
  const { addExpenseMutation } = useExpenseApi();
  const [currentState, setCurrentState] = useImmer(initialState);

  const handleCloseModal = () => {
    setCurrentState(initialState);
    onCloseModal();
  };

  const handleClickNextStepBtn = () => {
    setCurrentState((draft) => {
      draft.currentStepIndex += 1;
    });
  };

  const handleClickPrevStepBtn = () => {
    setCurrentState((draft) => {
      draft.currentStepIndex -= 1;
    });
  };

  const handleSelectGroup = ({ group }: { group: IGroup }) => {
    setCurrentState((draft) => {
      draft.selectedGroup = group;
    });
  };

  const handleSelectFriend = ({ friend }: { friend: IUser }) => {
    setCurrentState((draft) => {
      draft.selectedFriend = friend;
    });
  };

  const handleChangeAmount = (value: number) => {
    setCurrentState((draft) => {
      draft.amount = value;
    });
  };

  const handleChangeDescription = (value: string) => {
    setCurrentState((draft) => {
      draft.expenseDescription = value;
    });
  };

  const handleChangeSplit = ({ split }: { split: ISplit }) => {
    setCurrentState((draft) => {
      const indexToUpdateSplit = draft.expenseSplits.findIndex(
        (_split) => _split.userId === split.userId
      );
      draft.expenseSplits[indexToUpdateSplit] = {
        ...split,
      };
    });
  };

  const handleChangeSplitType = (splitType: SplitType) => {
    setCurrentState((draft) => {
      draft.splitType = splitType;
    });
  };

  const handleClickAddBtn = () => {
    const payload: Partial<IExpense> = {
      amount: currentState.amount,
      description: currentState.expenseDescription,
      splitType: currentState.splitType,
      splits: currentState.expenseSplits,
      paidBy: currentState.amountPaidBy?.id,
    };

    payload.participants = currentState.usersToSplitExpense
      .filter((_user) => _user.id !== user.id)
      .map((_user) => _user.id);

    if (currentState.selectedGroup) {
      payload.groupId = currentState.selectedGroup.id;
    }

    addExpenseMutation.mutate({
      payload,
    });

    setCurrentState((draft) => {
      draft.currentStepIndex += 1;
    });
  };

  useEffect(() => {
    setCurrentState((draft) => {
      draft.amountPaidBy = user;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentState.selectedFriend) {
      const usersToSplitTheExpense = [user, currentState.selectedFriend];

      const splits = getSplits({
        amount: currentState.amount,
        splitType: currentState.splitType,
        users: usersToSplitTheExpense,
      });

      setCurrentState((draft) => {
        draft.expenseSplits = splits;
        draft.usersToSplitExpense = usersToSplitTheExpense;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentState.amount,
    currentState.selectedFriend,
    currentState.selectedGroup,
  ]);

  const currentStep = ADD_EXPENSE_STEPS_SEQUENCE[currentState.currentStepIndex];

  let stepView;
  let actionButtonNodes;

  if (!isOpen) {
    return null;
  }

  if (currentStep === ADD_EXPENSE_STEPS.SELECT_FRIENDS_STEP) {
    stepView = (
      <SelectFriendsStep
        onSelectFriend={handleSelectFriend}
        onSelectGroup={handleSelectGroup}
        selectedGroup={currentState.selectedGroup}
        selectedFriend={currentState.selectedFriend}
        groups={groups}
        friends={friends}
      />
    );
    const isNextStepBtnDisabled =
      !currentState.selectedFriend && !currentState.selectedGroup;
    actionButtonNodes = (
      <Flex alignItems="center" justifyContent="flex-end">
        <Button text="Cancel" outlined onClick={handleCloseModal} />
        <Button
          text="Next"
          ml="12px"
          onClick={handleClickNextStepBtn}
          disabled={isNextStepBtnDisabled}
        />
      </Flex>
    );
  } else if (currentStep === ADD_EXPENSE_STEPS.SPLIT_AMOUNT_STEP) {
    stepView = (
      <SelectAmountStep
        amount={currentState.amount}
        description={currentState.expenseDescription}
        onChangeAmount={handleChangeAmount}
        onChangeDescription={handleChangeDescription}
      />
    );
    actionButtonNodes = (
      <Flex alignItems="center" justifyContent="space-between">
        <Button text="Go Back" outlined onClick={handleClickPrevStepBtn} />
        <Button text="Next" ml="12px" onClick={handleClickNextStepBtn} />
      </Flex>
    );
  } else if (currentStep === ADD_EXPENSE_STEPS.SELECT_SPLIT_STEP) {
    stepView = (
      <SelectSplitStep
        splitType={currentState.splitType}
        splits={currentState.expenseSplits}
        usersToSplit={currentState.usersToSplitExpense}
        onChangeSplit={handleChangeSplit}
        onChangeSplitType={handleChangeSplitType}
      />
    );
    actionButtonNodes = (
      <Flex alignItems="center" justifyContent="space-between">
        <Button
          text="Go Back"
          outlined
          onClick={handleClickPrevStepBtn}
          disabled={addExpenseMutation.isLoading}
        />
        <Button
          text="Add"
          ml="12px"
          onClick={handleClickAddBtn}
          loading={addExpenseMutation.isLoading}
          disabled={addExpenseMutation.isLoading}
        />
      </Flex>
    );
  } else {
    stepView = <SplitSuccessStep />;
  }

  return (
    <Styles.ModalBackDrop>
      <Styles.Modal>
        <Styles.ModalHeader>
          <Flex alignItems="center" justifyContent="space-between" width="100%">
            <Styles.ModalHeaderTitle>Split Expense</Styles.ModalHeaderTitle>
          </Flex>
        </Styles.ModalHeader>
        <Styles.ModalBody>{stepView}</Styles.ModalBody>
        <Styles.ModalFooter>{actionButtonNodes}</Styles.ModalFooter>
      </Styles.Modal>
    </Styles.ModalBackDrop>
  );
};
