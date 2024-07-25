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
import useApp from "~/hooks/useApp";
import { getSplits } from "./utils";
import { expenseApi, userApi } from "~/api";
import { useRequestStates } from "~/hooks";

interface IProps {
  isOpen: boolean;
  onCloseModal: () => void;
  currentFriend?: IUser;
  currentGroup?: IGroup;
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
  currentFriend,
  currentGroup,
}: IProps) => {
  const { user, friends, groups } = useApp();
  const [currentState, setCurrentState] = useImmer(initialState);
  const [addExpenseRequestState, addExpenseRequestHandlers] =
    useRequestStates();
  const [fetchUsersOfGroupRequestState, fetchUsersOfGroupRequestHandlers] =
    useRequestStates();

  const handleCloseModal = () => {
    setCurrentState(initialState);
    onCloseModal();
  };

  const getUsersOfSelectedGroup = async () => {
    fetchUsersOfGroupRequestHandlers.pending();
    try {
      const response = await userApi.fetchUsersByGroupId(
        currentState.selectedGroup!.id
      );
      setCurrentState((draft) => {
        draft.usersToSplitExpense = response;
      });
      fetchUsersOfGroupRequestHandlers.fulfilled(response);
    } catch (error) {
      fetchUsersOfGroupRequestHandlers.rejected(error);
    }
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
      draft.usersToSplitExpense = [user, friend];
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

  const handleChangeAmountPaidBy = (paidBy: IUser) => {
    setCurrentState((draft) => {
      draft.amountPaidBy = paidBy;
    });
  };

  const handleClickAddBtn = async () => {
    const payload: Partial<IExpense> = {
      amount: currentState.amount,
      description: currentState.expenseDescription,
      splitType: currentState.splitType,
      splits: currentState.expenseSplits,
      paidBy: currentState.amountPaidBy?.id,
    };

    payload.participants = currentState.usersToSplitExpense.map(
      (_user) => _user.id
    );

    if (currentState.selectedGroup) {
      payload.groupId = currentState.selectedGroup.id;
    }

    try {
      addExpenseRequestHandlers.pending();
      const response = await expenseApi.addExpense({
        payload,
      });
      setCurrentState((draft) => {
        draft.currentStepIndex += 1;
      });
      addExpenseRequestHandlers.fulfilled(response);
    } catch (error) {
      addExpenseRequestHandlers.rejected(error);
    }
  };

  useEffect(() => {
    if (currentFriend || currentGroup) {
      setCurrentState((draft) => {
        const skipFirstStep = !!currentFriend || !!currentGroup;
        if (currentFriend) {
          draft.selectedFriend = currentFriend;
          draft.usersToSplitExpense = [user, currentFriend];
        } else if (currentGroup) {
          draft.selectedGroup = currentGroup;
        }
        draft.currentStepIndex = skipFirstStep ? 1 : 0;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFriend, currentGroup]);

  useEffect(() => {
    setCurrentState((draft) => {
      draft.amountPaidBy = user;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentState.selectedGroup) {
      getUsersOfSelectedGroup();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentState.selectedGroup]);

  useEffect(() => {
    if (currentState.selectedGroup || currentState.selectedFriend) {
      const splits = getSplits({
        amount: currentState.amount,
        splitType: currentState.splitType,
        users: currentState.usersToSplitExpense,
      });

      setCurrentState((draft) => {
        draft.expenseSplits = splits;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentState.amount]);

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
    const isNextStepBtnDisabled = !currentState.amount;
    const isPrevStepBtnDisabled = !!currentFriend || !!currentGroup;

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
        <Button
          text="Go Back"
          outlined
          onClick={handleClickPrevStepBtn}
          disabled={isPrevStepBtnDisabled}
        />
        <Button
          text="Next"
          ml="12px"
          onClick={handleClickNextStepBtn}
          disabled={isNextStepBtnDisabled}
        />
      </Flex>
    );
  } else if (currentStep === ADD_EXPENSE_STEPS.SELECT_SPLIT_STEP) {
    stepView = (
      <SelectSplitStep
        splitType={currentState.splitType}
        splits={currentState.expenseSplits}
        amountPaidBy={currentState.amountPaidBy}
        usersToSplit={currentState.usersToSplitExpense}
        onChangeSplit={handleChangeSplit}
        onChangeSplitType={handleChangeSplitType}
        onChangeAmountPaidBy={handleChangeAmountPaidBy}
      />
    );
    actionButtonNodes = (
      <Flex alignItems="center" justifyContent="space-between">
        <Button
          text="Go Back"
          outlined
          onClick={handleClickPrevStepBtn}
          disabled={addExpenseRequestState.pending}
        />
        <Button
          text="Add"
          ml="12px"
          onClick={handleClickAddBtn}
          loading={addExpenseRequestState.pending}
          disabled={addExpenseRequestState.pending}
        />
      </Flex>
    );
  } else {
    stepView = <SplitSuccessStep />;
    actionButtonNodes = (
      <Flex alignItems="center" justifyContent="flex-end">
        <Button text="Dismiss" onClick={handleCloseModal} />
      </Flex>
    );
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
