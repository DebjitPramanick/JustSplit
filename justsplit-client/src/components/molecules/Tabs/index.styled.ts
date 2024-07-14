import styled, { css } from "styled-components";
import { Flex, Text } from "~/components/atoms";
import colors from "~/styles/colors";
import { mediaQueryMobileOrTablet } from "~/styles/mixins";

export const Root = styled(Flex)`
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  border: 1px solid ${colors.BORDER_NEUTRAL_WEAK};

  ${mediaQueryMobileOrTablet} {
    width: 100%;
  }
`;

export const Tab = styled(Flex)<{ selected: boolean }>`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 14px;
  cursor: pointer;

  ${({ selected }) =>
    selected
      ? css`
          background-color: ${colors.BG_ACCENT_WEAKEST};

          ${Text} {
            color: ${colors.TEXT_ACCENT_NORMAL};
          }
        `
      : null}

  & + & {
    border-left: 1px solid ${colors.BORDER_NEUTRAL_WEAK};
  }

  ${mediaQueryMobileOrTablet} {
    min-width: unset;
    flex: 1;
    padding: 10px;
  }
`;

export const TabLabel = styled(Text)`
  font-weight: 400;
  color: ${colors.TEXT_NEUTRAL_WEAK};
  text-align: center;
`;
