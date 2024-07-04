import styled from "styled-components";
import { Box, Flex, Text } from "~/components/atoms";
import colors from "~/styles/colors";

export const LeftSection = styled(Flex)`
  padding: 16px;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const RightSection = styled(Box)`
  width: 600px;
  max-width: 600px;
  background-color: ${colors.BG_ACCENT_NORMAL};
`;

export const AuthFormContainer = styled(Box)`
  width: 540px;
  max-width: 540px;
  padding: 32px;
  border-radius: 8px;
  border: 1px solid ${colors.BORDER_NEUTRAL_WEAK};
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
