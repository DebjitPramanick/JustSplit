import styled from "styled-components";
import { Box, Flex, Text } from "~/components/atoms";
import { PageContainer } from "~/components/layout";
import colors from "~/styles/colors";
import { mediaQueryMobile } from "~/styles/mixins";

export const Root = styled(Box)``;

export const Container = styled(PageContainer)`
  padding-top: 32px;
  position: relative;
  z-index: 1;
`;

export const PageTitleContainer = styled(Box)`
  background-color: ${colors.BG_SURFACE};
  padding: 16px;
  border-radius: 8px;
`;

export const LeftSection = styled(Box)``;

export const RightSection = styled(Box)`
  max-width: 368px;
  width: 100%;
  margin-left: 16px;
`;

export const PageTitle = styled(Text)`
  font-size: 28px;
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

export const ExpensesContainer = styled(Box).attrs({ as: "ul" })`
  background-color: ${colors.BG_SURFACE};
  padding: 16px;
  border-radius: 8px;
`;

export const Expense = styled(Flex).attrs({ as: "li" })`
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;

  &:nth-child(odd) {
    background-color: ${colors.BG_NEUTRAL_WEAKEST};
  }

  &:hover {
    background-color: ${colors.BG_NEUTRAL_WEAK};
    transition: background-color 300ms ease-in-out;
  }
`;

export const ExpenseDate = styled(Text)`
  color: ${colors.TEXT_NEUTRAL_WEAK};
  text-align: center;
`;

export const ExpenseDescription = styled(Text)``;

export const ExpensePaidBy = styled(Text)`
  font-size: 14px;
  color: ${colors.TEXT_NEUTRAL_WEAK};
`;

export const ExpenseAmount = styled(Text)`
  font-size: 18px;
`;
