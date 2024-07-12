import styled from "styled-components";
import { Box, Flex, Text } from "~/components/atoms";
import colors from "~/styles/colors";
import { mediaQueryMobileOrTablet } from "~/styles/mixins";

export const Root = styled(Box)`
  height: 56px;
  padding: 16px;

  ${mediaQueryMobileOrTablet} {
    height: 48px;
  }
`;

export const HeaderRoot = styled(Box)`
  height: 56px;
  box-shadow: 0 0 10px grey;
  background: ${colors.BG_SURFACE};
  border-bottom: 1px solid #e9e9e9;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;

  ${mediaQueryMobileOrTablet} {
    height: 48px;
  }
`;

export const Container = styled(Flex)`
  max-width: 1248px;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0 24px;

  ${mediaQueryMobileOrTablet} {
    padding: 0 20px;
  }
`;

export const HeaderBranding = styled(Text)`
  width: 100%;
  text-align: left;
  font-size: 24px;
  font-weight: bold;
  color: inherit;
  top: 0;
`;
