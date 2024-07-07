import styled from "styled-components";
import { Box, Flex, Text } from "~/components/atoms";
import colors from "~/styles/colors";
import TwoWavyLines from "~/assets/vectors/two-wavy-lines.svg?react";
import { fadeIn, slideUp } from "~/styles/animations";
import { mediaQueryMobileOrTablet } from "~/styles/mixins";

export const LeftSection = styled(Flex)`
  padding: 24px;
  flex: 1;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const RightSection = styled(Flex)`
  width: 600px;
  max-width: 600px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.BG_ACCENT_NORMAL};
  position: relative;

  ${mediaQueryMobileOrTablet} {
    display: none;
  }
`;

export const HeaderBranding = styled(Text)`
  width: 100%;
  text-align: left;
  font-size: 24px;
  font-weight: bold;
  padding: 16px 24px;
  position: absolute;
  color: inherit;
  background-color: ${colors.BG_SURFACE};
  top: 0;
`;

export const AuthFormContainer = styled(Box)`
  width: 440px;
  max-width: 440px;
  border-radius: 8px;

  ${mediaQueryMobileOrTablet} {
    margin-top: 60px;
  }
`;

export const FormTitle = styled(Text)`
  font-size: 24px;
  font-weight: bolder;
  color: ${colors.TEXT_NEUTRAL_STRONG};
`;

export const AuthForm = styled(Box).attrs({ as: "form" })``;

export const InputLabel = styled(Text).attrs({ as: "label" })`
  font-size: 16px;
  color: ${colors.TEXT_NEUTRAL_WEAK};
`;

export const TextLink = styled(Text).attrs({ as: "a" })`
  font-size: 14px;
  font-weight: bold;
  text-decoration: none;
  color: ${colors.TEXT_ACCENT_NORMAL};
`;

export const RightSideVector = styled(TwoWavyLines)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`;

export const RightSideText = styled(Text)`
  text-align: left;
  font-size: 46px;
  font-weight: bold;
  color: ${colors.TEXT_INVERTED};
  ${fadeIn(300)};
  ${slideUp(300, "100px")};
`;
