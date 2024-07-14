import styled from "styled-components";
import { Box, Flex, Text } from "~/components/atoms";

import { mediaQueryMobileOrTablet } from "~/styles/mixins";
import CloseIconComponent from "~/assets/icons/close.svg?react";
import colors from "~/styles/colors";

export const ModalBackDrop = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  ${mediaQueryMobileOrTablet} {
    align-items: flex-end;
  }
`;

export const Modal = styled(Box)`
  background-color: ${colors.BG_SURFACE};
  z-index: 100;
  box-shadow: 0px 8px 24px -4px rgba(34, 34, 34, 0.08),
    0px 8px 8px 2px rgba(34, 34, 34, 0.08);
  border-radius: 8px;
  width: 600px;

  ${mediaQueryMobileOrTablet} {
    width: 100vw;
    border-radius: 8px 8px 0 0;
    max-width: unset;
  }
`;

export const ModalHeader = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  padding: 28px 24px 20px;

  ${mediaQueryMobileOrTablet} {
    padding: 16px 16px 12px;
  }
`;

export const ModalHeaderTitle = styled(Text)`
  font-size: 20px;
  font-weight: 600;
`;

export const ModalHeaderCloseIcon = styled(CloseIconComponent)`
  cursor: pointer;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  color: ${colors.ICON_NEUTRAL_NORMAL};
`;

export const ModalBody = styled(Box)`
  padding: 24px;
  border-top: 1px solid ${colors.BG_NEUTRAL_WEAKER};

  ${mediaQueryMobileOrTablet} {
    padding: 16px;
  }
`;

export const ModalFooter = styled(Box)`
  padding: 24px;
  border-top: 1px solid ${colors.BG_NEUTRAL_WEAK};

  ${mediaQueryMobileOrTablet} {
    padding: 16px;
  }
`;
