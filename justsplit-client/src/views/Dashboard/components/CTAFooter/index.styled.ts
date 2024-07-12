import styled from "styled-components";

import { Box } from "~/components/atoms";
import { PageContainer } from "~/components/layout";
import colors from "~/styles/colors";

import { mediaQueryMobileOrTablet } from "~/styles/mixins";

export const Root = styled(Box)`
  background-color: ${colors.BG_SURFACE};
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1;
  border-top: 1px solid ${colors.BORDER_NEUTRAL_WEAK};
`;

export const Container = styled(PageContainer)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  padding-bottom: 16px;

  ${mediaQueryMobileOrTablet} {
    flex-direction: column;
    align-items: flex-start;
    padding-top: 8px;
    padding-bottom: 8px;
  }
`;
