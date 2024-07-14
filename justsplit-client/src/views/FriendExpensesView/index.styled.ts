import styled from "styled-components";
import { Box, Flex, Text } from "~/components/atoms";
import { PageContainer } from "~/components/layout";
import colors from "~/styles/colors";
import { mediaQueryMobile, mediaQueryMobileOrTablet } from "~/styles/mixins";

export const Root = styled(Box)``;

export const Container = styled(PageContainer)`
  padding-top: 32px;
  position: relative;
  z-index: 1;
`;

export const StickyHeader = styled(Box)`
  position: sticky;
  top: 56px;
  background-color: ${colors.BG_NEUTRAL_WEAKEST};

  ${mediaQueryMobileOrTablet} {
    top: 48px;
  }
`;

export const FriendNameTitle = styled(Text)`
  font-size: 32px;
  color: ${colors.TEXT_NEUTRAL_NORMAL};
  font-weight: 600;

  ${mediaQueryMobile} {
    font-size: 20px;
  }
`;

export const BalanceText = styled(Text)`
  font-size: 16px;
  color: ${colors.TEXT_NEUTRAL_WEAK};

  ${mediaQueryMobile} {
    font-size: 14px;
  }
`;

export const ExpensesContainer = styled(Box).attrs({ as: "ul" })``;

export const Expense = styled(Flex).attrs({ as: "li" })`
  justify-content: space-between;
  align-items: center;
  padding: 16px 12px;
  border-radius: 8px;

  &:hover {
    background-color: ${colors.BG_NEUTRAL_WEAK};
    transition: background-color 300ms ease-in-out;
  }
`;

export const ExpenseDate = styled(Text)`
  color: ${colors.TEXT_NEUTRAL_WEAK};
`;

export const ExpenseDescription = styled(Text)``;

export const ExpenseAmount = styled(Text)`
  font-size: 20px;
  font-weight: 600;
`;

export const ExpensePaidBy = styled(Text)``;
