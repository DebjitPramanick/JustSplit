import styled from "styled-components";
import { Box, Flex, Text } from "~/components/atoms";
import colors from "~/styles/colors";
import { ellipsis, mediaQueryMobileOrTablet } from "~/styles/mixins";

export const Root = styled(Box)`
  min-height: 300px;

  background: ${colors.BG_SURFACE};
  border: 1px solid ${colors.BORDER_NEUTRAL_WEAKEST};
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    transition: box-shadow 300ms ease-in-out;
    box-shadow: 0px 0px 24px -4px rgba(34, 34, 34, 0.08),
      0px 8px 8px 2px rgba(34, 34, 34, 0.08);
  }
`;

export const TitleContainer = styled(Box)`
  background-color: ${colors.BG_NEUTRAL_WEAKER};
  padding: 8px 16px;
  border-bottom: 1px solid ${colors.BORDER_NEUTRAL_WEAK};
  border-radius: 8px 8px 0 0;
`;

export const Title = styled(Text)`
  font-size: 18px;
  font-weight: 600;
`;

export const RowsContainer = styled(Box)``;

export const ExpenseRow = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;

  &:hover {
    transition: background-color 300ms ease-in-out;
    background-color: ${colors.BG_NEUTRAL_WEAKEST};
  }
`;

export const ExpenseRowDisplayTitle = styled(Text)`
  font-size: 16px;
  max-width: 200px;
  ${ellipsis};

  ${mediaQueryMobileOrTablet} {
    font-size: 14px;
  }
`;

export const IconWrapper = styled(Box)`
  width: 24px;
  height: 24px;
  flex-shrink: 0;

  > svg {
    width: 100%;
    height: 100%;
  }
`;
